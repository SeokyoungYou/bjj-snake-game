import { useState, useRef, useEffect } from "react";
import {
  Position,
  Direction,
  BeltRank,
  GameState,
  SpecialItem,
  ObstaclePosition,
} from "@/types/game";
import { BELTS, SPECIAL_ITEMS } from "@/lib/game-constants";
import { calculateBeltProgress } from "@/lib/score-calculator";

// Game constants
const CELL_SIZE = 20;
const GRID_WIDTH = 30;
const GRID_HEIGHT = 20;
const INITIAL_SPEED = 150;
const SPEED_INCREASE_PER_BELT = 20;

const getInitialGameState = (selectedBeltIndex: number): GameState => ({
  snake: [
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 },
  ],
  food: { x: 15, y: 10 },
  specialFood: null,
  obstacles: [],
  direction: "RIGHT",
  isGameOver: false,
  score: 0,
  beltProgress: {
    rank: BELTS[selectedBeltIndex].rank,
    degree: 0,
  },
  activeSpecialEffect: null,
});

export const useGame = (selectedBeltIndex: number) => {
  const [gameState, setGameState] = useState<GameState>(
    getInitialGameState(selectedBeltIndex)
  );
  const [combo, setCombo] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [lastMoveTime, setLastMoveTime] = useState(0);

  const gameStateRef = useRef(gameState);
  const comboRef = useRef(combo);
  const isRunningRef = useRef(isRunning);
  const directionRef = useRef<Direction>("RIGHT");
  const nextDirectionRef = useRef<Direction>("RIGHT");
  const gameLoopRef = useRef<number | null>(null);

  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

  useEffect(() => {
    comboRef.current = combo;
  }, [combo]);

  useEffect(() => {
    isRunningRef.current = isRunning;
  }, [isRunning]);

  const startGame = () => {
    if (isRunningRef.current) return;

    stopGame();
    setGameState(getInitialGameState(selectedBeltIndex));
    directionRef.current = "RIGHT";
    nextDirectionRef.current = "RIGHT";
    generateObstacles();

    setIsRunning(true);
    isRunningRef.current = true;

    const gameSpeed =
      INITIAL_SPEED -
      Object.values(BeltRank).indexOf(BELTS[selectedBeltIndex].rank) *
        SPEED_INCREASE_PER_BELT;
    let lastUpdateTime = 0;

    const gameLoop = (timestamp: number) => {
      if (!isRunningRef.current) return;

      const deltaTime = timestamp - lastUpdateTime;
      if (deltaTime > gameSpeed) {
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
  };

  const handleGameOver = () => {
    stopGame();
    setGameState((prev) => ({ ...prev, isGameOver: true }));
  };

  const update = () => {
    const { snake, food, obstacles, activeSpecialEffect } =
      gameStateRef.current;
    const head = { ...snake[0] };
    const direction = nextDirectionRef.current;

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

    if (checkCollision(head)) {
      if (activeSpecialEffect === "Escape") {
        const safeSpot = findSafeSpot();
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

    if (food && head.x === food.x && head.y === food.y) {
      ate = true;
      points = 1;
      setCombo((prev) => prev + 1);
      spawnFood();

      if (comboRef.current > 0 && comboRef.current % 5 === 0) {
        spawnSpecialItem();
      }
    }

    if (
      gameStateRef.current.specialFood &&
      head.x === gameStateRef.current.specialFood.position.x &&
      head.y === gameStateRef.current.specialFood.position.y
    ) {
      activateSpecialEffect(gameStateRef.current.specialFood.type);
      setGameState((prev) => ({ ...prev, specialFood: null }));
    }

    if (!ate) {
      newSnake.pop();
    } else {
      updateScore(points);
    }

    const currentTime = Date.now();
    if (currentTime - lastMoveTime > 3000) {
      setCombo(0);
    }
    setLastMoveTime(currentTime);

    setGameState((prev) => ({
      ...prev,
      snake: newSnake,
      direction: directionRef.current,
    }));
  };

  const checkCollision = (head: Position): boolean => {
    const { snake, obstacles } = gameStateRef.current;

    if (
      head.x < 0 ||
      head.x >= GRID_WIDTH ||
      head.y < 0 ||
      head.y >= GRID_HEIGHT
    ) {
      return true;
    }

    for (let i = 1; i < snake.length; i++) {
      if (head.x === snake[i].x && head.y === snake[i].y) {
        return true;
      }
    }

    if (gameStateRef.current.activeSpecialEffect !== "Defense") {
      for (let i = 0; i < obstacles.length; i++) {
        if (
          head.x === obstacles[i].position.x &&
          head.y === obstacles[i].position.y
        ) {
          return true;
        }
      }
    }

    return false;
  };

  const spawnFood = () => {
    const { snake, obstacles, specialFood } = gameStateRef.current;
    let newFood: Position | null = null;
    let validPosition = false;

    while (!validPosition) {
      newFood = {
        x: Math.floor(Math.random() * GRID_WIDTH),
        y: Math.floor(Math.random() * GRID_HEIGHT),
      };

      validPosition = true;

      for (let i = 0; i < snake.length; i++) {
        if (newFood.x === snake[i].x && newFood.y === snake[i].y) {
          validPosition = false;
          break;
        }
      }

      for (let i = 0; i < obstacles.length; i++) {
        if (
          newFood.x === obstacles[i].position.x &&
          newFood.y === obstacles[i].position.y
        ) {
          validPosition = false;
          break;
        }
      }

      if (
        specialFood &&
        newFood.x === specialFood.position.x &&
        newFood.y === specialFood.position.y
      ) {
        validPosition = false;
      }
    }

    if (newFood) {
      setGameState((prev) => ({ ...prev, food: newFood }));
    }
  };

  const spawnSpecialItem = () => {
    const { snake, food, obstacles, specialFood } = gameStateRef.current;
    if (specialFood) return;

    let newItem: SpecialItem | null = null;
    let validPosition = false;

    while (!validPosition) {
      const position = {
        x: Math.floor(Math.random() * GRID_WIDTH),
        y: Math.floor(Math.random() * GRID_HEIGHT),
      };

      const type =
        SPECIAL_ITEMS[Math.floor(Math.random() * SPECIAL_ITEMS.length)];
      newItem = { position, type };
      validPosition = true;

      for (let i = 0; i < snake.length; i++) {
        if (position.x === snake[i].x && position.y === snake[i].y) {
          validPosition = false;
          break;
        }
      }

      if (food && position.x === food.x && position.y === food.y) {
        validPosition = false;
      }

      for (let i = 0; i < obstacles.length; i++) {
        if (
          position.x === obstacles[i].position.x &&
          position.y === obstacles[i].position.y
        ) {
          validPosition = false;
          break;
        }
      }
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
      const newScore = prev.score + points;
      const { rank, degree } = calculateBeltProgress(
        newScore,
        prev.beltProgress.rank
      );

      if (rank !== prev.beltProgress.rank) {
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

    for (let x = 5; x < 15; x++) {
      for (let y = 8; y < 13; y++) {
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
          x: Math.floor(Math.random() * GRID_WIDTH),
          y: Math.floor(Math.random() * GRID_HEIGHT),
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

        if (
          gameStateRef.current.food &&
          position.x === gameStateRef.current.food.x &&
          position.y === gameStateRef.current.food.y
        ) {
          validPosition = false;
          continue;
        }

        if (
          gameStateRef.current.specialFood &&
          position.x === gameStateRef.current.specialFood.position.x &&
          position.y === gameStateRef.current.specialFood.position.y
        ) {
          validPosition = false;
          continue;
        }

        for (let j = 0; j < newObstacles.length; j++) {
          if (
            position.x === newObstacles[j].position.x &&
            position.y === newObstacles[j].position.y
          ) {
            validPosition = false;
            break;
          }
        }
      }

      if (obstacle && validPosition) {
        newObstacles.push(obstacle);
      }
    }

    setGameState((prev) => ({ ...prev, obstacles: newObstacles }));
  };

  const findSafeSpot = (): Position | null => {
    const { snake, obstacles } = gameStateRef.current;
    const safeSpots: Position[] = [];

    for (let x = 0; x < GRID_WIDTH; x++) {
      for (let y = 0; y < GRID_HEIGHT; y++) {
        let isSafe = true;

        for (let i = 0; i < snake.length; i++) {
          if (x === snake[i].x && y === snake[i].y) {
            isSafe = false;
            break;
          }
        }

        for (let i = 0; i < obstacles.length; i++) {
          if (x === obstacles[i].position.x && y === obstacles[i].position.y) {
            isSafe = false;
            break;
          }
        }

        if (isSafe) {
          safeSpots.push({ x, y });
        }
      }
    }

    return safeSpots.length > 0
      ? safeSpots[Math.floor(Math.random() * safeSpots.length)]
      : null;
  };

  return {
    gameState,
    combo,
    isRunning,
    startGame,
    stopGame,
    handleGameOver,
    directionRef,
    nextDirectionRef,
  };
};
