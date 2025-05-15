"use client";

import { cn } from "@/lib/utils";
import { useViewportSize } from "@/hooks/useViewportSize";
import { ControlButtonDirection } from "@/types/game";
import ControlButton from "./ControlButton";

export default function GameControls() {
  const { isMobile } = useViewportSize();

  if (!isMobile) return null;

  const handleButtonPress = (direction: ControlButtonDirection) => {
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
          <ControlButton
            direction={ControlButtonDirection.ArrowUp}
            handleButtonPress={handleButtonPress}
          />
        </div>
        <div className="flex justify-between gap-2">
          <ControlButton
            direction={ControlButtonDirection.ArrowLeft}
            handleButtonPress={handleButtonPress}
          />

          <div className="w-12 h-12" />
          <ControlButton
            direction={ControlButtonDirection.ArrowRight}
            handleButtonPress={handleButtonPress}
          />
        </div>
        <div className="flex justify-center gap-2">
          <ControlButton
            direction={ControlButtonDirection.ArrowDown}
            handleButtonPress={handleButtonPress}
          />
        </div>
      </div>
    </div>
  );
}
