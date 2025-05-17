"use client";

import { motion } from "framer-motion";
import { Share2, Download } from "lucide-react";
import { GameState } from "@/types/game";
import { toast } from "sonner";
import { useState } from "react";

interface GameOverActionsProps {
  gameState: GameState;
}

const getAppStoreLink = () => {
  const userAgent = navigator.userAgent.toLowerCase();

  if (/iphone|ipad|ipod/.test(userAgent)) {
    return "https://apps.apple.com/us/app/post-black-belt-bjj-journal/id1673061463";
  } else if (/android/.test(userAgent)) {
    return "https://play.google.com/store/apps/details?id=com.quartz.postblackbelt";
  } else {
    return "https://post-black-belt.quartz.best";
  }
};

export function GameOverActions({ gameState }: GameOverActionsProps) {
  const [isSharing, setIsSharing] = useState(false);

  const handleShare = async () => {
    if (isSharing) return;

    try {
      setIsSharing(true);
      if (navigator.share) {
        await navigator.share({
          title: "BJJ Snake Game",
          text: `I scored ${gameState.score} points and reached ${gameState?.beltProgress?.rank} Belt ${gameState?.beltProgress?.degree} Grau in BJJ Snake Game! Can you beat my score?`,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Link copied to clipboard!");
      }
    } catch (error) {
      if (error instanceof Error && error.name !== "AbortError") {
        toast.error("Failed to share. Please try again.");
      }
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div className="flex gap-4">
      <motion.button
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleShare}
        disabled={isSharing}
        className={`flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl font-medium text-sm hover:bg-gray-200 transition-all duration-200 flex items-center justify-center gap-2 ${
          isSharing ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        <Share2 size={16} />
        {isSharing ? "Sharing..." : "Share"}
      </motion.button>

      <motion.button
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          window.open(getAppStoreLink(), "_blank");
        }}
        className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl font-medium text-sm hover:bg-gray-200 transition-all duration-200 flex items-center justify-center gap-2"
      >
        <Download size={16} />
        Download
      </motion.button>
    </div>
  );
}
