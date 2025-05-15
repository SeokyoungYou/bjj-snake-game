import { useEffect } from "react";
import { Direction } from "@/types/game";
import { gameSounds } from "@/lib/sounds";

export const useKeyboardControls = (
  directionRef: React.MutableRefObject<Direction>,
  nextDirectionRef: React.MutableRefObject<Direction>
) => {
  // TODO: refactor here

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      console.log("keyboard");
      switch (e.key) {
        case "ArrowUp":
          if (directionRef.current !== "DOWN") {
            nextDirectionRef.current = "UP";
            gameSounds.controlKey("CHANGE");
            return;
          }
          gameSounds.controlKey("MAINTAIN");

          break;
        case "ArrowDown":
          if (directionRef.current !== "UP") {
            nextDirectionRef.current = "DOWN";
            gameSounds.controlKey("CHANGE");
            return;
          }
          gameSounds.controlKey("MAINTAIN");
          break;
        case "ArrowLeft":
          if (directionRef.current !== "RIGHT") {
            nextDirectionRef.current = "LEFT";
            gameSounds.controlKey("CHANGE");
            return;
          }
          gameSounds.controlKey("MAINTAIN");
          break;
        case "ArrowRight":
          if (directionRef.current !== "LEFT") {
            nextDirectionRef.current = "RIGHT";
            gameSounds.controlKey("CHANGE");
            return;
          }
          gameSounds.controlKey("MAINTAIN");
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [directionRef, nextDirectionRef]);
};
