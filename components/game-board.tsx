"use client";

import React from "react";
import { GameState } from "@/types/game";
import { cn } from "@/lib/utils";
import { useBeltColors } from "@/hooks/use-belt-colors";
import GameControls from "./controls/game-controls";
import { useGridSize } from "@/hooks/useGridSize";
import Obstacle from "./objects/Obstacle";
import Snake from "./objects/Snake";
import Food from "./objects/Food";
import SpecialFood from "./objects/SpecialFood";
import SpecialEffect from "./objects/SpecialEffect";
import BeltProgressBar from "./belt-progress-bar";
import { RefreshCcw, RefreshCw, RotateCcw, Square, Undo } from "lucide-react";

interface GameBoardProps {
  gameState: GameState;
  onGameStart: () => void;
  onGameStop: () => void;
  isRunning: boolean;
  gameBoardRef: React.RefObject<HTMLDivElement | null>;
  scrollToGameBoard: () => void;
}

const GameBoard: React.FC<GameBoardProps> = ({
  gameState,
  onGameStart,
  onGameStop,
  isRunning,
  gameBoardRef,
  scrollToGameBoard,
}) => {
  const { cellSize, gridSize, isMobile } = useGridSize();
  const { backgroundColor, gridColor } = useBeltColors(gameState.beltProgress);

  const adjustedCellSize = cellSize;
  const adjustedWidth = gridSize.width * cellSize;
  const adjustedHeight = gridSize.height * cellSize;

  const handleGameStart = () => {
    onGameStart();
    scrollToGameBoard();
  };

  return (
    <div className="flex flex-col gap-4 pb-32 justify-center items-center">
      <div
        ref={gameBoardRef}
        className={cn(
          "game-board relative overflow-visible  border-1 border-gray-300 shadow-xl bg-white r",
          { "special-effect-glow": gameState.activeSpecialEffect }
        )}
        style={{
          width: adjustedWidth,
          height: adjustedHeight,
          backgroundColor: backgroundColor,
          position: "relative",
        }}
      >
        {/* Grid lines */}
        <div className="grid-lines absolute inset-0 z-0 flex items-end justify-center">
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
          {!isRunning && (
            <button
              className={cn(
                "px-6 py-3 z-50 rounded-xl text-white font-semibold shadow-lg absolute  transition animate-in fade-in-0 duration-300 mb-10 w-1/2",

                "bg-indigo-600 hover:bg-indigo-700"
              )}
              onClick={handleGameStart}
            >
              Start
            </button>
          )}
        </div>

        {isRunning && (
          <button
            className={cn(
              "px-3 py-3 rounded-xl text-white font-semibold shadow-lg absolute  transition animate-in fade-in-0 duration-300 w-fit -bottom-32 right-0",
              "bg-red-500 hover:bg-red-600"
            )}
            onClick={onGameStop}
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        )}

        {/* Obstacles */}
        {gameState.obstacles.map((obstacle, index) => (
          <Obstacle
            key={`obstacle-${index}`}
            obstacle={obstacle}
            cellSize={adjustedCellSize}
          />
        ))}

        {/* Snake */}
        <Snake
          snake={gameState.snake}
          cellSize={adjustedCellSize}
          beltProgress={gameState.beltProgress}
        />

        {/* Food */}
        {gameState.foods.map((food, index) => (
          <Food key={`food-${index}`} food={food} cellSize={adjustedCellSize} />
        ))}

        {/* Special food */}
        {gameState.specialFood && (
          <SpecialFood
            specialFood={gameState.specialFood}
            cellSize={adjustedCellSize}
          />
        )}

        {/* Special effect */}
        {gameState.activeSpecialEffect && (
          <SpecialEffect activeSpecialEffect={gameState.activeSpecialEffect} />
        )}

        {/* Score and combo display */}
        <div className="absolute -top-8 right-0 z-50">
          <div className="backdrop-blur bg-black/20 px-2 py-0.5 rounded-xl shadow">
            <span className="text-white font-bold text-sm">
              Score: {gameState.score}
            </span>
          </div>
        </div>

        <div className="absolute -top-8 left-0 z-50 py-0.5 ">
          {gameState.combo > 1 ? (
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-indigo-400">
                {gameState.comboMessage}
              </span>

              <span className="text-neutral-400 text-xs">
                {gameState.comboTimeLeft}s Left
              </span>
            </div>
          ) : (
            <span className="text-neutral-400 text-sm">No Combo</span>
          )}
        </div>
      </div>

      {/* Game control buttons */}
      <div className="flex flex-col gap-3 w-full">
        <div className=" w-full max-w-xl">
          <BeltProgressBar beltProgress={gameState.beltProgress} />
        </div>

        {/* 모바일 컨트롤 - 게임 실행 중일 때만 표시 */}
        {isRunning && (
          <div className="md:hidden">
            <GameControls />
          </div>
        )}
      </div>
    </div>
  );
};

export default GameBoard;
