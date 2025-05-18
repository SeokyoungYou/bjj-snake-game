import { useMemo } from "react";
import { useViewportSize } from "./useViewportSize";

interface GridSize {
  width: number;
  height: number;
}

interface UseGridSizeReturn {
  cellSize: number;
  gridSize: GridSize;
}

// 기본 게임 보드 설정값
const DEFAULT_CELL_SIZE = 20;
const DEFAULT_GRID_WIDTH = 30;
const DEFAULT_GRID_HEIGHT = 20;

export const useGridSize = (): UseGridSizeReturn => {
  const { cellSize, gridSize } = useMemo(() => {
    return {
      cellSize: Math.min(DEFAULT_CELL_SIZE, 15),
      gridSize: {
        width: Math.min(DEFAULT_GRID_WIDTH, 20),
        height: Math.max(DEFAULT_GRID_HEIGHT, 25),
      },
    };
  }, []);

  return { cellSize, gridSize };
};
