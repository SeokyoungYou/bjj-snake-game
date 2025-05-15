import { useRef } from "react";

export const useGameRef = () => {
  const gameBoardRef = useRef<HTMLDivElement>(null);

  const scrollToGameBoard = () => {
    window.scrollTo({
      top: (gameBoardRef.current?.offsetTop ?? 0) - 40,
      behavior: "smooth",
    });
  };
  return { gameBoardRef, scrollToGameBoard };
};
