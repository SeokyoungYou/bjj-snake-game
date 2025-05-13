import { useEffect } from "react";
import { Direction } from "@/types/game";

export const useKeyboardControls = (
  directionRef: React.MutableRefObject<Direction>,
  nextDirectionRef: React.MutableRefObject<Direction>
) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          if (directionRef.current !== "DOWN") {
            nextDirectionRef.current = "UP";
          }
          break;
        case "ArrowDown":
          if (directionRef.current !== "UP") {
            nextDirectionRef.current = "DOWN";
          }
          break;
        case "ArrowLeft":
          if (directionRef.current !== "RIGHT") {
            nextDirectionRef.current = "LEFT";
          }
          break;
        case "ArrowRight":
          if (directionRef.current !== "LEFT") {
            nextDirectionRef.current = "RIGHT";
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [directionRef, nextDirectionRef]);
};
