export enum BeltRank {
  WHITE = "white",
  BLUE = "blue",
  PURPLE = "purple",
  BROWN = "brown",
  BLACK = "black",
}

export interface Position {
  x: number;
  y: number;
}

export interface BeltProgress {
  rank: BeltRank;
  degree: number; // 0-4
}

export type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";
export enum ControlButtonDirection {
  ArrowUp = "ArrowUp",
  ArrowDown = "ArrowDown",
  ArrowLeft = "ArrowLeft",
  ArrowRight = "ArrowRight",
}
export interface SpecialItem {
  position: Position;
  type: string;
}

export interface ObstaclePosition {
  position: Position;
  type: string;
}

export interface GameState {
  snake: Position[];
  foods: Position[];
  specialFood: SpecialItem | null;
  obstacles: ObstaclePosition[];
  direction: Direction;
  isGameOver: boolean;
  score: number;
  beltProgress: BeltProgress;
  activeSpecialEffect: string | null;
  combo: number;
  comboTimeLeft: number;
  comboMessage: string;
}

export interface GameOverModalProps {
  score: number;
  highScore: number;
  belt: string;
  degree: number;
  onRestart: () => void;
}

export type BeltType = "white" | "blue" | "purple" | "brown" | "black";

export interface BeltProgressBarProps {
  currentBelt: number;
  currentDegree: number;
}
