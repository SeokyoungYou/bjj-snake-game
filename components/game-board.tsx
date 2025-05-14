"use client";

import React from "react";
import { GameState } from "@/types/game";
import { cn } from "@/lib/utils";
import { useBeltColors } from "@/hooks/use-belt-colors";
import GameControls from "./game-controls";
import { useGridSize } from "@/hooks/useGridSize";
import Obstacle from "./objects/Obstacle";
import Snake from "./objects/Snake";
import Food from "./objects/Food";
import SpecialFood from "./objects/SpecialFood";
import SpecialEffect from "./objects/SpecialEffect";
import BeltProgressBar from "./belt-progress-bar";
import { Square } from "lucide-react";

interface GameBoardProps {
  gameState: GameState;
  combo: number;
  onGameStart: () => void;
  onGameStop: () => void;
  isRunning: boolean;
}

const GameBoard: React.FC<GameBoardProps> = ({
  gameState,
  combo,
  onGameStart,
  onGameStop,
  isRunning,
}) => {
  const { cellSize, gridSize, isMobile } = useGridSize();
  const gameBoardRef = React.useRef<HTMLDivElement>(null);
  const { backgroundColor, gridColor } = useBeltColors(gameState.beltProgress);

  const adjustedCellSize = cellSize;
  const adjustedWidth = gridSize.width * cellSize;
  const adjustedHeight = gridSize.height * cellSize;

  const scrollToGameBoard = () => {
    window.scrollTo({
      top: (gameBoardRef.current?.offsetTop ?? 0) - 40,
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
                "px-6 py-3 rounded-xl text-white font-semibold shadow-lg absolute  transition animate-in fade-in-0 duration-300 mb-10 w-1/2",

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
            <Square className="w-5 h-5" />
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

        {combo > 1 && (
          <div className="absolute top-0 left-0 z-50">
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
        <div className=" w-full max-w-xl">
          <BeltProgressBar beltProgress={gameState.beltProgress} />
        </div>

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
