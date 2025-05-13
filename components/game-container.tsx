"use client";

import { useState } from "react";
import GameBoard from "./game-board";
import { BELTS } from "@/lib/game-constants";
import { calculateBeltProgress } from "@/lib/score-calculator";
import ModalBeltSelection from "./ModalBeltSelection";
import { useGame } from "@/hooks/useGame";
import { useKeyboardControls } from "@/hooks/useKeyboardControls";
import BeltProgressBar from "./belt-progress-bar";
import { cn } from "@/lib/utils";
import { useViewportSize } from "@/hooks/useViewportSize";

export default function GameContainer() {
  const [selectedBeltIndex, setSelectedBeltIndex] = useState(0);
  const [isColorModalOpen, setIsColorModalOpen] = useState(false);

  const {
    gameState,
    combo,
    isRunning,
    startGame,
    stopGame,
    handleGameOver,
    directionRef,
    nextDirectionRef,
  } = useGame(selectedBeltIndex);

  useKeyboardControls(directionRef, nextDirectionRef);
  const { isMobile } = useViewportSize();

  const currentBeltIndex = BELTS.findIndex(
    (belt) => belt.rank === gameState.beltProgress.rank
  );

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 rounded-xl text-sm shadow-lg">
        <span className="text-lg">⬅️⬆️⬇️➡️</span>
        <span className={cn(isMobile ? "hidden" : "block")}>
          Use arrow keys to move the snake!
        </span>
        <span className={cn(isMobile ? "block" : "hidden")}>
          Use the buttons below to move the snake!
        </span>
      </div>

      <GameBoard
        snake={gameState.snake}
        food={gameState.food}
        specialFood={gameState.specialFood}
        obstacles={gameState.obstacles}
        boss={null}
        beltProgress={gameState.beltProgress}
        activeSpecialEffect={gameState.activeSpecialEffect}
        score={gameState.score}
        combo={combo}
        onGameStart={startGame}
        onGameStop={stopGame}
        isRunning={isRunning}
        snakeColor={{
          snake: BELTS[selectedBeltIndex].snakeColor,
          background: BELTS[selectedBeltIndex].bgColor,
        }}
        currentBeltIndex={currentBeltIndex}
        currentDegree={gameState.beltProgress.degree}
      />

      <ModalBeltSelection
        isOpen={isColorModalOpen}
        selectedBeltIndex={selectedBeltIndex}
        selectedDegree={0}
        onClose={() => setIsColorModalOpen(false)}
        onSelectBelt={(score) => {
          const { rank, degree } = calculateBeltProgress(
            score,
            gameState.beltProgress.rank
          );
          const beltIndex = BELTS.findIndex((belt) => belt.rank === rank);
          setSelectedBeltIndex(beltIndex);
          setIsColorModalOpen(false);
        }}
      />

      <button
        onClick={() => setIsColorModalOpen(true)}
        className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors flex items-center gap-2"
      >
        <div
          className="w-4 h-4 rounded-full"
          style={{ backgroundColor: BELTS[selectedBeltIndex].snakeColor }}
        />
        <span>{BELTS[selectedBeltIndex].name} Belt</span>
      </button>

      {gameState.isGameOver && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Game Over!</h2>
            <p className="mb-2">
              Final Score: <span className="font-bold">{gameState.score}</span>
            </p>
            <p className="mb-4">
              Final Belt:{" "}
              <span className="font-bold capitalize">
                {gameState.beltProgress.rank} Belt
              </span>
            </p>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={startGame}
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
