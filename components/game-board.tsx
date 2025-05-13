"use client";

import React from "react";
import {
  Position,
  BeltProgress,
  BeltRank,
  SpecialItem,
  ObstaclePosition,
} from "@/types/game";
import { cn } from "@/lib/utils";
import { BELTS, SPECIAL_ITEMS } from "@/lib/game-constants";
import { useBeltColors } from "@/hooks/use-belt-colors";
import GameControls from "./game-controls";
import { useViewportSize } from "@/hooks/useViewportSize";

interface GameBoardProps {
  snake: Position[];
  food: Position | null;
  specialFood: SpecialItem | null;
  obstacles: ObstaclePosition[];
  boss: any | null;
  gridSize: { width: number; height: number };
  cellSize: number;
  beltProgress: BeltProgress;
  activeSpecialEffect: string | null;
  score: number;
  combo: number;
  onGameStart: () => void;
  onGameStop: () => void;
  isRunning: boolean;
  snakeColor: {
    snake: string;
    background: string;
  };
}

const GameBoard: React.FC<GameBoardProps> = ({
  snake,
  food,
  specialFood,
  obstacles,
  boss,
  gridSize,
  cellSize,
  beltProgress,
  activeSpecialEffect,
  score,
  combo,
  onGameStart,
  onGameStop,
  isRunning,
  snakeColor,
}) => {
  const { isMobile } = useViewportSize();
  const {
    backgroundColor,
    gridColor,
    snakeHeadColor,
    snakeBodyColor,
    eyeColor,
  } = useBeltColors(beltProgress);

  // 모바일에서 셀 크기 조정
  const adjustedCellSize = isMobile ? Math.min(cellSize, 15) : cellSize;
  const adjustedWidth = gridSize.width * adjustedCellSize;
  const adjustedHeight = gridSize.height * adjustedCellSize;

  return (
    <div className="flex flex-col gap-4 pb-32">
      <div
        className={cn(
          "game-board relative overflow-hidden rounded-2xl border-2 border-gray-300 shadow-xl bg-white",
          { "special-effect-glow": activeSpecialEffect }
        )}
        style={{
          width: adjustedWidth,
          height: adjustedHeight,
          backgroundColor: backgroundColor,
          position: "relative",
        }}
      >
        {/* Grid lines */}
        <div className="grid-lines absolute inset-0 z-0">
          {Array.from({ length: gridSize.width + 1 }).map((_, i) => (
            <div
              key={`v-line-${i}`}
              style={{
                position: "absolute",
                left: i * adjustedCellSize,
                top: 0,
                width: "0.5px",
                height: "100%",
                backgroundColor: gridColor,
              }}
            />
          ))}

          {Array.from({ length: gridSize.height + 1 }).map((_, i) => (
            <div
              key={`h-line-${i}`}
              style={{
                position: "absolute",
                top: i * adjustedCellSize,
                left: 0,
                width: "100%",
                height: "0.5px",
                backgroundColor: gridColor,
              }}
            />
          ))}
        </div>

        {/* Obstacles rendering */}
        {obstacles.map((obstacle, index) => (
          <div
            key={`obstacle-${index}`}
            className="absolute bg-gray-600 rounded-sm z-10"
            style={{
              width: adjustedCellSize,
              height: adjustedCellSize,
              left: obstacle.position.x * adjustedCellSize,
              top: obstacle.position.y * adjustedCellSize,
            }}
          />
        ))}

        {/* Boss rendering */}
        {boss && (
          <div
            className="absolute bg-fuchsia-600 z-20 rounded-md"
            style={{
              width: adjustedCellSize,
              height: adjustedCellSize,
              left: boss.position.x * adjustedCellSize,
              top: boss.position.y * adjustedCellSize,
            }}
          >
            {/* Boss face */}
            <div className="flex flex-col items-center justify-center h-full w-full">
              <div className="flex gap-1 mt-1">
                <div className="w-1 h-1 bg-black rounded-full" />
                <div className="w-1 h-1 bg-black rounded-full" />
              </div>
              <div className="w-3 h-1 bg-black rounded-full mt-2" />
            </div>
          </div>
        )}

        {/* Snake rendering */}
        {snake.map((segment, index) => (
          <div
            key={`snake-${index}`}
            style={{
              position: "absolute",
              width: adjustedCellSize,
              height: adjustedCellSize,
              left: segment.x * adjustedCellSize,
              top: segment.y * adjustedCellSize,
              backgroundColor: index === 0 ? snakeHeadColor : snakeBodyColor,
              borderRadius: index === 0 ? "4px" : "2px",
              zIndex: 30,
            }}
          >
            {/* Eyes for snake head */}
            {index === 0 && (
              <div className="w-full h-full relative">
                <div
                  className="absolute top-1 left-1 w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: eyeColor }}
                />
                <div
                  className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: eyeColor }}
                />
              </div>
            )}
          </div>
        ))}

        {/* Food rendering */}
        {food && (
          <div
            className="absolute bg-red-500 rounded-full z-20"
            style={{
              width: adjustedCellSize * 0.7,
              height: adjustedCellSize * 0.7,
              left: food.x * adjustedCellSize + adjustedCellSize * 0.15,
              top: food.y * adjustedCellSize + adjustedCellSize * 0.15,
            }}
          />
        )}

        {/* Special food rendering */}
        {specialFood && (
          <div
            className="absolute bg-cyan-400 rounded-full z-20 animate-pulse"
            style={{
              width: adjustedCellSize * 0.8,
              height: adjustedCellSize * 0.8,
              left:
                specialFood.position.x * adjustedCellSize +
                adjustedCellSize * 0.1,
              top:
                specialFood.position.y * adjustedCellSize +
                adjustedCellSize * 0.1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span className="text-xs font-bold text-black">
              {specialFood.type.charAt(0)}
            </span>
          </div>
        )}

        {/* Special effect indicator */}
        {activeSpecialEffect && (
          <div
            className="absolute inset-0 border-4 border-cyan-400 z-40 pointer-events-none"
            style={{
              boxShadow: "0 0 10px 2px rgba(0, 255, 255, 0.5) inset",
            }}
          >
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 px-3 py-1 rounded-full">
              <span className="text-cyan-400 font-bold">
                {activeSpecialEffect}
              </span>
            </div>
          </div>
        )}

        {/* Score and combo display */}
        <div className="absolute top-3 right-3 z-50">
          <div className="backdrop-blur bg-black/40 px-3 py-1 rounded-xl shadow">
            <span className="text-white font-bold text-base">
              Score: {score}
            </span>
          </div>
        </div>

        {combo > 1 && (
          <div className="absolute top-3 left-3 z-50">
            <div className="backdrop-blur bg-yellow-400/80 px-3 py-1 rounded-xl shadow">
              <span className="text-white font-bold text-base">
                Combo: {combo}x
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Game control buttons */}
      <div className="flex flex-col gap-3">
        <button
          className={cn(
            "px-6 py-3 rounded-xl text-white font-semibold shadow-lg transition",
            isRunning
              ? "bg-red-500 hover:bg-red-600"
              : "bg-blue-600 hover:bg-blue-700"
          )}
          onClick={isRunning ? onGameStop : onGameStart}
        >
          {isRunning ? "Stop" : "Start"}
        </button>

        <div className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 rounded-xl text-sm shadow-lg">
          <span className="text-lg">⬅️⬆️⬇️➡️</span>
          <span className={cn(isMobile ? "hidden" : "block")}>
            Use arrow keys to move the snake!
          </span>
          <span className={cn(isMobile ? "block" : "hidden")}>
            Use the buttons below to move the snake!
          </span>
        </div>

        {/* 모바일 컨트롤 - 모바일에서만 표시 */}
        <div className="md:hidden">
          <GameControls />
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
