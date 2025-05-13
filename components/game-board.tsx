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
import { useBeltColors } from "@/hooks/use-belt-colors";
import GameControls from "./game-controls";
import { useViewportSize } from "@/hooks/useViewportSize";
import { useGridSize } from "@/hooks/useGridSize";
import Obstacle from "./objects/Obstacle";
import Boss from "./objects/Boss";
import Snake from "./objects/Snake";
import Food from "./objects/Food";
import SpecialFood from "./objects/SpecialFood";
import SpecialEffect from "./objects/SpecialEffect";
import BeltProgressBar from "./belt-progress-bar";

interface GameBoardProps {
  snake: Position[];
  food: Position | null;
  specialFood: SpecialItem | null;
  obstacles: ObstaclePosition[];
  boss: any | null;
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
  currentBeltIndex: number;
  currentDegree: number;
}

const GameBoard: React.FC<GameBoardProps> = ({
  snake,
  food,
  specialFood,
  obstacles,
  boss,
  beltProgress,
  activeSpecialEffect,
  score,
  combo,
  onGameStart,
  onGameStop,
  isRunning,
  snakeColor,
  currentBeltIndex,
  currentDegree,
}) => {
  const { cellSize, gridSize, isMobile } = useGridSize();
  const gameBoardRef = React.useRef<HTMLDivElement>(null);
  const {
    backgroundColor,
    gridColor,
    snakeHeadColor,
    snakeBodyColor,
    eyeColor,
  } = useBeltColors(beltProgress);

  const adjustedCellSize = cellSize;
  const adjustedWidth = gridSize.width * cellSize;
  const adjustedHeight = gridSize.height * cellSize;

  const scrollToGameBoard = () => {
    window.scrollTo({
      top: (gameBoardRef.current?.offsetTop ?? 0) - 10,
      behavior: "smooth",
    });
  };

  const handleGameStart = () => {
    onGameStart();
    scrollToGameBoard();
  };

  const handlePlayAgain = () => {
    onGameStart();
    scrollToGameBoard();
  };

  return (
    <div className="flex flex-col gap-4 pb-32 justify-center items-center">
      <div
        ref={gameBoardRef}
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

        {/* Obstacles */}
        {obstacles.map((obstacle, index) => (
          <Obstacle
            key={`obstacle-${index}`}
            obstacle={obstacle}
            cellSize={adjustedCellSize}
          />
        ))}

        {/* Boss */}
        {boss && <Boss boss={boss} cellSize={adjustedCellSize} />}

        {/* Snake */}
        <Snake
          snake={snake}
          cellSize={adjustedCellSize}
          snakeHeadColor={snakeHeadColor}
          snakeBodyColor={snakeBodyColor}
          eyeColor={eyeColor}
        />

        {/* Food */}
        {food && <Food food={food} cellSize={adjustedCellSize} />}

        {/* Special food */}
        {specialFood && (
          <SpecialFood specialFood={specialFood} cellSize={adjustedCellSize} />
        )}

        {/* Special effect */}
        {activeSpecialEffect && (
          <SpecialEffect activeSpecialEffect={activeSpecialEffect} />
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
      <div className="flex flex-col gap-3 w-full">
        {isRunning ? (
          <div className=" w-full max-w-xl">
            <BeltProgressBar
              currentBelt={currentBeltIndex}
              currentDegree={currentDegree}
            />
          </div>
        ) : (
          <button
            className={cn(
              "px-6 py-3 rounded-xl text-white font-semibold shadow-lg transition",
              isRunning
                ? "bg-red-500 hover:bg-red-600"
                : "bg-indigo-600 hover:bg-indigo-700"
            )}
            onClick={isRunning ? onGameStop : handleGameStart}
          >
            {isRunning ? "Stop" : "Start"}
          </button>
        )}

        {/* 모바일 컨트롤 - 게임 실행 중일 때만 표시 */}
        {isRunning && (
          <div className="md:hidden">
            <GameControls onPlayAgain={handleGameStart} />
          </div>
        )}
      </div>
    </div>
  );
};

export default GameBoard;
