import {
  Position,
  Direction,
  BeltRank,
  GameState,
  SpecialItem,
  ObstaclePosition,
} from "@/types/game";
import { BELTS } from "@/constants/game-constants";

// 게임 상수
export const INITIAL_SPEED = 200;
export const SPEED_INCREASE_PER_BELT = 30;
export const COMBO_TIME_LEFT = 5;

// 초기 게임 상태 생성
export const getInitialGameState = (
  selectedBeltIndex: number,
  gridSize: { width: number; height: number }
): GameState => {
  const initialFoods = [];
  const foodCount = 2 * Math.pow(2, selectedBeltIndex);

  for (let i = 0; i < foodCount; i++) {
    let validPosition = false;
    let newFood: Position | null = null;
    let attempts = 0;
    const maxAttempts = 50;

    while (!validPosition && attempts < maxAttempts) {
      attempts++;
      newFood = {
        x: Math.floor(Math.random() * gridSize.width),
        y: Math.floor(Math.random() * gridSize.height),
      };

      validPosition = true;

      for (let j = 0; j < initialFoods.length; j++) {
        if (
          newFood.x === initialFoods[j].x &&
          newFood.y === initialFoods[j].y
        ) {
          validPosition = false;
          break;
        }
      }
    }

    if (newFood && validPosition) {
      initialFoods.push(newFood);
    }
  }

  return {
    snake: [
      { x: Math.floor(gridSize.width / 2), y: Math.floor(gridSize.height / 2) },
      {
        x: Math.floor(gridSize.width / 2) - 1,
        y: Math.floor(gridSize.height / 2),
      },
      {
        x: Math.floor(gridSize.width / 2) - 2,
        y: Math.floor(gridSize.height / 2),
      },
    ],
    foods: initialFoods,
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
    combo: 0,
    comboTimeLeft: 0,
    comboMessage: "",
  };
};

// 충돌 체크
export const checkCollision = (
  head: Position,
  snake: Position[],
  obstacles: ObstaclePosition[],
  gridSize: { width: number; height: number },
  activeSpecialEffect: string | null
): boolean => {
  if (
    head.x < 0 ||
    head.x >= gridSize.width ||
    head.y < 0 ||
    head.y >= gridSize.height
  ) {
    return true;
  }

  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      return true;
    }
  }

  if (activeSpecialEffect !== "Defense") {
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

// 안전한 위치 찾기
export const findSafeSpot = (
  snake: Position[],
  obstacles: ObstaclePosition[],
  gridSize: { width: number; height: number }
): Position | null => {
  const safeSpots: Position[] = [];

  for (let x = 0; x < gridSize.width; x++) {
    for (let y = 0; y < gridSize.height; y++) {
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

// 새로운 위치가 유효한지 확인
export const isValidPosition = (
  position: Position,
  snake: Position[],
  foods: Position[],
  obstacles: ObstaclePosition[],
  specialFood: SpecialItem | null,
  gridSize: { width: number; height: number }
): boolean => {
  // 그리드 범위 체크
  if (
    position.x < 0 ||
    position.x >= gridSize.width ||
    position.y < 0 ||
    position.y >= gridSize.height
  ) {
    return false;
  }

  // 뱀과 겹치는지 확인
  for (let i = 0; i < snake.length; i++) {
    if (position.x === snake[i].x && position.y === snake[i].y) {
      return false;
    }
  }

  // 음식과 겹치는지 확인
  for (let i = 0; i < foods.length; i++) {
    if (position.x === foods[i].x && position.y === foods[i].y) {
      return false;
    }
  }

  // 장애물과 겹치는지 확인
  for (let i = 0; i < obstacles.length; i++) {
    if (
      position.x === obstacles[i].position.x &&
      position.y === obstacles[i].position.y
    ) {
      return false;
    }
  }

  // 특수 음식과 겹치는지 확인
  if (
    specialFood &&
    position.x === specialFood.position.x &&
    position.y === specialFood.position.y
  ) {
    return false;
  }

  return true;
};

// 게임 속도 계산
export const calculateGameSpeed = (selectedBeltIndex: number): number => {
  return (
    INITIAL_SPEED -
    Object.values(BeltRank).indexOf(BELTS[selectedBeltIndex].rank) *
      SPEED_INCREASE_PER_BELT
  );
};
