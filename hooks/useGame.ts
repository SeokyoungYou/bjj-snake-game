import { useState, useRef, useEffect } from "react";
import {
  Position,
  Direction,
  BeltRank,
  GameState,
  SpecialItem,
  ObstaclePosition,
} from "@/types/game";
import { BELTS, SPECIAL_ITEMS } from "@/constants/game-constants";
import { calculateBeltProgress } from "@/lib/score-calculator";
import { useGridSize } from "./useGridSize";
import { useScrollLock } from "./useScrollLock";
import { gameSounds } from "@/lib/sounds";
import {
  getInitialGameState,
  checkCollision,
  findSafeSpot,
  isValidPosition,
  calculateGameSpeed,
  INITIAL_SPEED,
  SPEED_INCREASE_PER_BELT,
  COMBO_TIME_LEFT,
} from "@/lib/game-utils";

export const useGame = (selectedBeltIndex: number) => {
  const { gridSize } = useGridSize();
  const [gameState, setGameState] = useState<GameState>(
    getInitialGameState(selectedBeltIndex, gridSize)
  );
  const [isRunning, setIsRunning] = useState(false);
  const [lastMoveTime, setLastMoveTime] = useState(Date.now());
  const lastMoveTimeRef = useRef(Date.now());
  const [promotionMessage, setPromotionMessage] = useState<string | null>(null);
  const { lock: lockScroll, unlock: unlockScroll } = useScrollLock();

  const gameStateRef = useRef(gameState);
  const isRunningRef = useRef(isRunning);
  const directionRef = useRef<Direction>("RIGHT");
  const nextDirectionRef = useRef<Direction>("RIGHT");
  const gameLoopRef = useRef<number | null>(null);

  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

  useEffect(() => {
    lastMoveTimeRef.current = lastMoveTime;
  }, [lastMoveTime]);

  useEffect(() => {
    gameSounds.init();
  }, []);

  const startGame = async () => {
    if (isRunningRef.current) return;

    await gameSounds.init();
    gameSounds.start();

    stopGame();
    setGameState(getInitialGameState(selectedBeltIndex, gridSize));
    directionRef.current = "RIGHT";
    nextDirectionRef.current = "RIGHT";
    generateObstacles();
    lockScroll();

    setIsRunning(true);
    isRunningRef.current = true;

    const gameSpeed = calculateGameSpeed(selectedBeltIndex);
    let lastUpdateTime = 0;

    const gameLoop = (timestamp: number) => {
      if (!isRunningRef.current) return;

      const deltaTime = timestamp - lastUpdateTime;
      if (deltaTime >= gameSpeed) {
        update();
        lastUpdateTime = timestamp;
      }

      gameLoopRef.current = requestAnimationFrame(gameLoop);
    };

    gameLoopRef.current = requestAnimationFrame(gameLoop);
  };

  const stopGame = () => {
    if (gameLoopRef.current !== null) {
      cancelAnimationFrame(gameLoopRef.current);
      gameLoopRef.current = null;
    }
    setIsRunning(false);
    isRunningRef.current = false;
    unlockScroll();
  };

  const handleGameOver = () => {
    gameSounds.gameOver();
    stopGame();
    setGameState((prev) => ({ ...prev, isGameOver: true }));
    unlockScroll();
  };

  const update = () => {
    const { snake, foods, obstacles, activeSpecialEffect } =
      gameStateRef.current;
    const head = { ...snake[0] };
    const direction = nextDirectionRef.current;
    const currentTime = Date.now();
    const timeDiff = currentTime - lastMoveTimeRef.current;

    if (timeDiff > 5000) {
      setGameState((prev) => ({
        ...prev,
        combo: 0,
        comboTimeLeft: 0,
        comboMessage: "",
      }));
    } else if (gameStateRef.current.combo > 0) {
      setGameState((prev) => ({
        ...prev,
        comboTimeLeft: Math.max(
          0,
          COMBO_TIME_LEFT - Math.floor(timeDiff / 1000)
        ),
      }));
    }

    switch (direction) {
      case "UP":
        head.y -= 1;
        break;
      case "DOWN":
        head.y += 1;
        break;
      case "LEFT":
        head.x -= 1;
        break;
      case "RIGHT":
        head.x += 1;
        break;
    }

    directionRef.current = nextDirectionRef.current;

    if (checkCollision(head, snake, obstacles, gridSize, activeSpecialEffect)) {
      if (activeSpecialEffect === "Escape") {
        const safeSpot = findSafeSpot(snake, obstacles, gridSize);
        if (safeSpot) {
          head.x = safeSpot.x;
          head.y = safeSpot.y;
        } else {
          handleGameOver();
          return;
        }
      } else {
        handleGameOver();
        return;
      }
    }

    const newSnake = [head, ...snake];
    let ate = false;
    let points = 0;

    const newFoods = foods.filter((food) => {
      if (head.x === food.x && head.y === food.y) {
        ate = true;
        points = 1;
        return false;
      }
      return true;
    });

    if (ate) {
      const currentTime = Date.now();
      lastMoveTimeRef.current = currentTime;
      setLastMoveTime(currentTime);

      gameSounds.eat();

      setGameState((prev) => {
        const newCombo = prev.combo + 1;
        return {
          ...prev,
          combo: newCombo,
          comboMessage: newCombo > 1 ? `Combo x${newCombo}` : "",
          comboTimeLeft: COMBO_TIME_LEFT,
          foods: newFoods,
          snake: newSnake,
          direction: directionRef.current,
        };
      });

      const currentBeltIndex = Object.values(BeltRank).indexOf(
        gameStateRef.current.beltProgress.rank
      );
      const targetFoodCount = 2 * Math.pow(2, currentBeltIndex);

      if (newFoods.length < targetFoodCount) {
        let newFood: Position | null = null;
        let validPosition = false;
        let attempts = 0;
        const maxAttempts = 50;

        while (!validPosition && attempts < maxAttempts) {
          attempts++;
          newFood = {
            x: Math.floor(Math.random() * gridSize.width),
            y: Math.floor(Math.random() * gridSize.height),
          };

          validPosition = isValidPosition(
            newFood,
            newSnake,
            newFoods,
            obstacles,
            gameStateRef.current.specialFood,
            gridSize
          );
        }

        if (newFood && validPosition) {
          newFoods.push(newFood);
        }
      }

      if (
        gameStateRef.current.combo > 0 &&
        gameStateRef.current.combo % 5 === 0
      ) {
        spawnSpecialItem();
      }
    } else {
      setGameState((prev) => ({
        ...prev,
        snake: newSnake,
        direction: directionRef.current,
      }));
    }

    if (
      gameStateRef.current.specialFood &&
      head.x === gameStateRef.current.specialFood.position.x &&
      head.y === gameStateRef.current.specialFood.position.y
    ) {
      gameSounds.specialItem();
      activateSpecialEffect(gameStateRef.current.specialFood.type);
      setGameState((prev) => ({ ...prev, specialFood: null }));
    }

    if (!ate) {
      newSnake.pop();
    } else {
      updateScore(points);
    }
  };

  const spawnSpecialItem = () => {
    const { snake, foods, obstacles, specialFood } = gameStateRef.current;
    if (specialFood) return;

    let newItem: SpecialItem | null = null;
    let validPosition = false;

    while (!validPosition) {
      const position = {
        x: Math.floor(Math.random() * gridSize.width),
        y: Math.floor(Math.random() * gridSize.height),
      };

      const type =
        SPECIAL_ITEMS[Math.floor(Math.random() * SPECIAL_ITEMS.length)];
      newItem = { position, type };
      validPosition = isValidPosition(
        position,
        snake,
        foods,
        obstacles,
        specialFood,
        gridSize
      );
    }

    if (newItem) {
      setGameState((prev) => ({ ...prev, specialFood: newItem }));
    }
  };

  const activateSpecialEffect = (skillName: string) => {
    setGameState((prev) => ({ ...prev, activeSpecialEffect: skillName }));
    setTimeout(() => {
      setGameState((prev) => ({ ...prev, activeSpecialEffect: null }));
    }, 10000);
  };

  const updateScore = (points: number) => {
    setGameState((prev) => {
      const multiplier = prev.activeSpecialEffect ? 2 : 1;
      const newScore = prev.score + points * multiplier;
      const { rank, degree } = calculateBeltProgress(
        newScore,
        prev.beltProgress.rank
      );

      if (rank !== prev.beltProgress.rank) {
        gameSounds.promotion();
        generateObstacles();
      }

      return {
        ...prev,
        score: newScore,
        beltProgress: { rank, degree },
      };
    });
  };

  const generateObstacles = () => {
    const obstacleCount =
      Object.values(BeltRank).indexOf(BELTS[selectedBeltIndex].rank) * 3;
    const newObstacles: ObstaclePosition[] = [];
    const safetyZone = [];

    for (
      let x = Math.floor(gridSize.width / 6);
      x < Math.floor(gridSize.width / 2);
      x++
    ) {
      for (
        let y = Math.floor(gridSize.height / 3);
        y < Math.floor((gridSize.height * 2) / 3);
        y++
      ) {
        safetyZone.push({ x, y });
      }
    }

    for (let i = 0; i < obstacleCount; i++) {
      let obstacle: ObstaclePosition | null = null;
      let validPosition = false;
      let attempts = 0;
      const maxAttempts = 50;

      while (!validPosition && attempts < maxAttempts) {
        attempts++;
        const position = {
          x: Math.floor(Math.random() * gridSize.width),
          y: Math.floor(Math.random() * gridSize.height),
        };

        obstacle = { position, type: "wall" };
        validPosition = true;

        for (const safePos of safetyZone) {
          if (position.x === safePos.x && position.y === safePos.y) {
            validPosition = false;
            break;
          }
        }

        if (!validPosition) continue;

        validPosition = isValidPosition(
          position,
          gameStateRef.current.snake,
          gameStateRef.current.foods,
          newObstacles,
          gameStateRef.current.specialFood,
          gridSize
        );
      }

      if (obstacle && validPosition) {
        newObstacles.push(obstacle);
      }
    }

    setGameState((prev) => ({ ...prev, obstacles: newObstacles }));
  };

  return {
    gameState,
    isRunning,
    startGame,
    stopGame,
    handleGameOver,
    directionRef,
    nextDirectionRef,
    promotionMessage,
  };
};
