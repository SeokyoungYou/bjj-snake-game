"use client";

import { useEffect, useRef } from "react";
import { BELTS } from "@/lib/game-constants";
import { BeltProgressBarProps } from "@/types/game";
import { toast } from "sonner";

/**
 * 벨트 프로그레스 바 컴포넌트
 * 현재 벨트 등급과 단계를 시각적으로 표시합니다.
 * 다음 벨트까지의 진행 상황을 보여줍니다.
 */
export default function BeltProgressBar({
  currentBelt,
  currentDegree,
}: BeltProgressBarProps) {
  const prevBeltRef = useRef(currentBelt);
  const prevDegreeRef = useRef(currentDegree);

  useEffect(() => {
    // 벨트 변경 감지 (승급)
    if (prevBeltRef.current !== currentBelt) {
      toast.success(
        `Congratulations! You've been promoted to ${BELTS[
          currentBelt
        ].name.toUpperCase()} Belt! 🎉`,
        {
          duration: 3000,
          position: "top-center",
          style: {
            background: "linear-gradient(to right, #fbbf24, #fcd34d, #fbbf24)",
            color: "#000",
            fontWeight: "bold",
            fontSize: "1.1rem",
          },
        }
      );
    }
    // Degree 변경 감지 (단계 상승)
    else if (prevDegreeRef.current < currentDegree) {
      toast.success(`Advanced to ${currentDegree} Degree!`, {
        duration: 2000,
        position: "top-center",
        style: {
          background: "#4ade80",
          color: "#fff",
          fontWeight: "medium",
          fontSize: "1rem",
        },
      });
    }

    prevBeltRef.current = currentBelt;
    prevDegreeRef.current = currentDegree;
  }, [currentBelt, currentDegree]);

  return (
    <div className="w-full mb-4">
      {/* 현재 벨트와 다음 벨트 표시 */}
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-neutral-600">
          {BELTS[currentBelt].name} Belt, {currentDegree} Degree
        </span>
        <span className="text-sm font-medium text-neutral-600">
          {currentBelt < 4 ? BELTS[currentBelt + 1].name : "Master"} Belt
        </span>
      </div>
      {/* 진행 바 */}
      <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden">
        <div
          className={`h-full ${BELTS[currentBelt].color} transition-all duration-500`}
          style={{
            width: `${(currentDegree / 4) * 100}%`,
            borderRight: currentDegree < 4 ? "2px solid white" : "none",
          }}
        ></div>
      </div>
      {/* 단계 표시 점 */}
      <div className="flex justify-between mt-1">
        {[0, 1, 2, 3, 4].map((degree) => (
          <div
            key={degree}
            className={`w-3 h-3 rounded-full ${
              degree <= currentDegree ? BELTS[currentBelt].color : "bg-gray-600"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}
