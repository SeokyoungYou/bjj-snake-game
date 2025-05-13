"use client";

import { Button } from "@/components/ui/button";
import {
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useViewportSize } from "@/hooks/useViewportSize";

interface GameControlsProps {
  onPlayAgain?: () => void;
}

export default function GameControls({ onPlayAgain }: GameControlsProps) {
  const { isMobile } = useViewportSize();

  if (!isMobile) return null;

  const handleButtonPress = (
    direction: "ArrowUp" | "ArrowDown" | "ArrowLeft" | "ArrowRight"
  ) => {
    const event = new KeyboardEvent("keydown", { key: direction });
    window.dispatchEvent(event);
  };

  return (
    <div className="fixed bottom-2 left-1/2 -translate-x-1/2 z-50 w-full flex justify-center pointer-events-none">
      <div
        className={cn(
          "bg-white/80 rounded-xl shadow-xl px-2 py-2 flex flex-col gap-2 pointer-events-auto",
          "backdrop-blur-md max-w-xs"
        )}
      >
        <div className="flex justify-center gap-2">
          <Button
            aria-label="Move Up"
            variant="outline"
            className="w-12 h-12 rounded-lg bg-white/90 shadow active:bg-blue-100 transition"
            onTouchStart={() => handleButtonPress("ArrowUp")}
            onClick={() => handleButtonPress("ArrowUp")}
          >
            <ChevronUp className="w-7 h-7" />
          </Button>
        </div>
        <div className="flex justify-between gap-2">
          <Button
            aria-label="Move Left"
            variant="outline"
            className="w-12 h-12 rounded-lg bg-white/90 shadow active:bg-blue-100 transition"
            onTouchStart={() => handleButtonPress("ArrowLeft")}
            onClick={() => handleButtonPress("ArrowLeft")}
          >
            <ChevronLeft className="w-7 h-7" />
          </Button>
          <div className="w-12 h-12" />
          <Button
            aria-label="Move Right"
            variant="outline"
            className="w-12 h-12 rounded-lg bg-white/90 shadow active:bg-blue-100 transition"
            onTouchStart={() => handleButtonPress("ArrowRight")}
            onClick={() => handleButtonPress("ArrowRight")}
          >
            <ChevronRight className="w-7 h-7" />
          </Button>
        </div>
        <div className="flex justify-center gap-2">
          <Button
            aria-label="Move Down"
            variant="outline"
            className="w-12 h-12 rounded-lg bg-white/90 shadow active:bg-blue-100 transition"
            onTouchStart={() => handleButtonPress("ArrowDown")}
            onClick={() => handleButtonPress("ArrowDown")}
          >
            <ChevronDown className="w-7 h-7" />
          </Button>
        </div>
      </div>
    </div>
  );
}
