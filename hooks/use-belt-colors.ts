import { BeltProgress, BeltRank } from "@/types/game";
import { BELTS } from "@/constants/game-constants";

interface BeltColors {
  beltColor: string;
  stripeColor: string;
  backgroundColor: string;
  gridColor: string;
  snakeHeadColor: string;
  snakeBodyColor: string;
  eyeColor: string;
}

export const useBeltColors = (beltProgress: BeltProgress): BeltColors => {
  const beltIndex = Object.values(BeltRank).indexOf(beltProgress.rank);
  const currentBelt =
    beltIndex >= 0 && beltIndex < BELTS.length ? BELTS[beltIndex] : BELTS[0];

  return {
    beltColor: currentBelt.color,
    stripeColor: currentBelt.stripeColor,
    backgroundColor: currentBelt.bgColor,
    gridColor: currentBelt.gridColor,
    snakeHeadColor: currentBelt.color,
    snakeBodyColor: currentBelt.snakeColor,
    eyeColor: currentBelt.eyeColor,
  };
};
