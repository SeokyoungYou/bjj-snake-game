"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GameOverModalProps } from "@/types/game";

/**
 * 게임 오버 모달 컴포넌트
 * 게임 종료 시 점수와 랭크를 보여주고 재시작 옵션을 제공합니다.
 */
export default function GameOverModal({
  score,
  highScore,
  belt,
  degree,
  onRestart,
}: GameOverModalProps) {
  const isHighScore = score >= highScore;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
      <Card className="w-[350px] max-w-[90vw]">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Game Over!</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-xl">
            Your Score: <span className="font-bold">{score}</span>
          </p>
          {isHighScore && (
            <p className="text-yellow-500 font-bold">New High Score!</p>
          )}
          <p>
            Highest Rank:{" "}
            <span className="font-bold">
              {belt} Belt, {degree} Degree
            </span>
          </p>
          <div className="mt-4">
            <p className="text-sm italic">
              {getMotivationalQuote(belt, degree)}
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={onRestart}>Try Again</Button>
        </CardFooter>
      </Card>
    </div>
  );
}

/**
 * 현재 랭크에 맞는 동기부여 문구를 반환합니다.
 * @param belt - 현재 벨트 등급
 * @param degree - 현재 벨트 단계
 * @returns 랜덤하게 선택된 동기부여 문구
 */
function getMotivationalQuote(belt: string, degree: number): string {
  const quotes = [
    "A black belt is a white belt who never gave up.",
    "In BJJ, it's not about how many times you tap, but how many times you get back up.",
    "The road to black belt is paved with white belts who quit.",
    "Every expert was once a beginner.",
    "Jiu-jitsu is not about being better than someone else, it's about being better than you used to be.",
    "The more you sweat in training, the less you bleed in battle.",
    "A belt only covers two inches of your waist. You have to cover the rest.",
    "It's not who's good, it's who's left.",
    "The hardest belt to earn is the white belt. It takes the most courage to step on the mat for the first time.",
    "Jiu-jitsu is human chess. Every move has a counter-move.",
  ];

  return quotes[Math.floor(Math.random() * quotes.length)];
}
