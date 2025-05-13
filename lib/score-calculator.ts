import { BeltProgress, BeltRank } from "@/types/game";

interface ScoreThreshold {
  score: number;
  degree: number;
}

export const SCORE_THRESHOLDS: Record<BeltRank, ScoreThreshold[]> = {
  [BeltRank.WHITE]: [
    { score: 0, degree: 0 },
    { score: 2, degree: 1 },
    { score: 4, degree: 2 },
    { score: 6, degree: 3 },
    { score: 8, degree: 4 },
  ],
  [BeltRank.BLUE]: [
    { score: 10, degree: 0 },
    { score: 14, degree: 1 },
    { score: 18, degree: 2 },
    { score: 22, degree: 3 },
    { score: 26, degree: 4 },
  ],
  [BeltRank.PURPLE]: [
    { score: 30, degree: 0 },
    { score: 36, degree: 1 },
    { score: 42, degree: 2 },
    { score: 48, degree: 3 },
    { score: 54, degree: 4 },
  ],
  [BeltRank.BROWN]: [
    { score: 60, degree: 0 },
    { score: 68, degree: 1 },
    { score: 76, degree: 2 },
    { score: 84, degree: 3 },
    { score: 92, degree: 4 },
  ],
  [BeltRank.BLACK]: [
    { score: 100, degree: 0 },
    { score: 120, degree: 1 },
    { score: 140, degree: 2 },
    { score: 160, degree: 3 },
    { score: 180, degree: 4 },
  ],
};

export const calculateBeltProgress = (
  score: number,
  currentRank: BeltRank
): BeltProgress => {
  const thresholds = SCORE_THRESHOLDS[currentRank];

  // 현재 벨트의 마지막 단계를 넘어섰는지 확인
  const lastThreshold = thresholds[thresholds.length - 1];
  if (score >= lastThreshold.score) {
    // 다음 벨트로 진행
    const nextRank = getNextRank(currentRank);
    if (nextRank) {
      return {
        rank: nextRank,
        degree: 0,
      };
    }
    // 블랙벨트 4단계 이상은 더 이상 진행하지 않음
    return {
      rank: BeltRank.BLACK,
      degree: 4,
    };
  }

  // 현재 벨트 내에서의 진행도 계산
  for (let i = thresholds.length - 1; i >= 0; i--) {
    if (score >= thresholds[i].score) {
      return {
        rank: currentRank,
        degree: thresholds[i].degree,
      };
    }
  }

  return {
    rank: currentRank,
    degree: 0,
  };
};

const getNextRank = (currentRank: BeltRank): BeltRank | null => {
  switch (currentRank) {
    case BeltRank.WHITE:
      return BeltRank.BLUE;
    case BeltRank.BLUE:
      return BeltRank.PURPLE;
    case BeltRank.PURPLE:
      return BeltRank.BROWN;
    case BeltRank.BROWN:
      return BeltRank.BLACK;
    case BeltRank.BLACK:
      return null;
    default:
      return null;
  }
};
