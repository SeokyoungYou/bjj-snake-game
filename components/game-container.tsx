"use client";

import { useState } from "react";
import GameBoard from "./game-board";
import { BELTS } from "@/lib/game-constants";
import { calculateBeltProgress } from "@/lib/score-calculator";
import ModalBeltSelection from "./ModalBeltSelection";
import { useGame } from "@/hooks/useGame";
import { useKeyboardControls } from "@/hooks/useKeyboardControls";
import { cn } from "@/lib/utils";
import { useViewportSize } from "@/hooks/useViewportSize";
import ModalGameOver from "./ModalGameOver";

export default function GameContainer() {
  const [selectedBeltIndex, setSelectedBeltIndex] = useState(0);
  const [isColorModalOpen, setIsColorModalOpen] = useState(false);

  const {
    gameState,
    isRunning,
    startGame,
    stopGame,
    handleGameOver,
    directionRef,
    nextDirectionRef,
  } = useGame(selectedBeltIndex);

  useKeyboardControls(directionRef, nextDirectionRef);
  const { isMobile } = useViewportSize();

  return (
    <div className="flex flex-col items-center gap-12">
      <div className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 rounded-xl text-xs shadow-lg">
        <span className="text-xs">⬅️⬆️⬇️➡️</span>
        <span className={cn(isMobile ? "hidden" : "block")}>
          Use arrow keys to move the snake!
        </span>
        <span className={cn(isMobile ? "block" : "hidden")}>
          Use the buttons below to move the snake!
        </span>
      </div>

      <GameBoard
        gameState={gameState}
        onGameStart={startGame}
        onGameStop={stopGame}
        isRunning={isRunning}
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

      {/* FIXME: admin only */}
      {/* <button
        onClick={() => setIsColorModalOpen(true)}
        className="px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors flex items-center gap-2"
      >
        <div
          className="w-4 h-4 rounded-full"
          style={{ backgroundColor: BELTS[selectedBeltIndex].snakeColor }}
        />
        <span>{BELTS[selectedBeltIndex].name} Belt</span>
      </button> */}

      {gameState.isGameOver && (
        <ModalGameOver gameState={gameState} onPlayAgain={startGame} />
      )}
    </div>
  );
}
