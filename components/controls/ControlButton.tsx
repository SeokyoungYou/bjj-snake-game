import { ControlButtonDirection } from "@/types/game";
import React from "react";
import { Button } from "../ui/button";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
} from "lucide-react";

interface ControlButtonProps {
  direction: ControlButtonDirection;
  handleButtonPress: (direction: ControlButtonDirection) => void;
}

export default function ControlButton({
  direction,
  handleButtonPress,
}: ControlButtonProps) {
  return (
    <Button
      aria-label={direction}
      variant="outline"
      className="w-[52px] h-[52px] rounded-lg bg-white/90 shadow active:bg-indigo-100 transition duration-200"
      onTouchStart={() => handleButtonPress(direction)}
    >
      {direction === ControlButtonDirection.ArrowUp && (
        <ChevronUp className="w-7 h-7" />
      )}
      {direction === ControlButtonDirection.ArrowDown && (
        <ChevronDown className="w-7 h-7" />
      )}
      {direction === ControlButtonDirection.ArrowLeft && (
        <ChevronLeft className="w-7 h-7" />
      )}
      {direction === ControlButtonDirection.ArrowRight && (
        <ChevronRight className="w-7 h-7" />
      )}
    </Button>
  );
}
