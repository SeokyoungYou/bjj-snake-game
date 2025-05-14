"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { GameState } from "@/types/game";
import { useBeltColors } from "@/hooks/use-belt-colors";

interface ModalGameOverProps {
  gameState: GameState;
  onPlayAgain: () => void;
}

export default function ModalGameOver({
  gameState,
  onPlayAgain,
}: ModalGameOverProps) {
  const { snakeHeadColor, snakeBodyColor, eyeColor } = useBeltColors(
    gameState.beltProgress
  );
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-white/90 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: "spring",
          duration: 0.5,
          bounce: 0.4,
        }}
        className="bg-indigo-50 p-8 rounded-2xl text-center shadow-2xl border border-gray-100 max-w-md w-full mx-4"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: "spring" }}
          className="mb-6 relative h-32"
        >
          {/* Snake body segments */}
          {[0, 1, 2, 3].map((index) => (
            <motion.div
              key={index}
              initial={{ scale: 0, x: -20 * index }}
              animate={{ scale: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="absolute"
              style={{
                width: "40px",
                height: "40px",
                left: `${120 + index * 30}px`,
                top: "50%",
                transform: "translateY(-50%)",
                backgroundColor: index === 0 ? snakeHeadColor : snakeBodyColor,
                borderRadius: index === 0 ? "8px" : "4px",
                zIndex: 30 - index,
              }}
            >
              {index === 0 && (
                <div className="w-full h-full relative">
                  <div
                    className="absolute top-2 left-2 rounded-full"
                    style={{
                      backgroundColor: eyeColor,
                      width: "8px",
                      height: "8px",
                    }}
                  />
                  <div
                    className="absolute top-2 right-2 rounded-full"
                    style={{
                      backgroundColor: eyeColor,
                      width: "8px",
                      height: "8px",
                    }}
                  />
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-bold mb-6 text-gray-800"
        >
          Game Over!
        </motion.h2>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-4 mb-8"
        >
          <p className="text-gray-600 text-lg">
            Final Score:{" "}
            <span className="text-indigo-600 font-bold text-2xl">
              {gameState.score}
            </span>
          </p>
          <p className="text-gray-600 text-lg">
            Final Belt:{" "}
            <span className="text-indigo-600 font-bold capitalize text-2xl">
              {gameState.beltProgress.rank} Belt
            </span>
          </p>
        </motion.div>

        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onPlayAgain}
          className="w-full px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold text-lg hover:bg-indigo-700 transition-all duration-200 shadow-lg"
        >
          Play Again
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
