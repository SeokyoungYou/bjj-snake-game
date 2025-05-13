import { BELTS } from "@/lib/game-constants";
import { BeltRank } from "@/types/game";

/**
 * 벨트 프로그레스 바 컴포넌트
 * 현재 벨트 등급과 단계를 시각적으로 표시합니다.
 * 다음 벨트까지의 진행 상황을 보여줍니다.
 */
interface BeltProgressBarProps {
  currentBelt: number;
  currentDegree: number;
}

export default function BeltProgressBar({
  currentBelt,
  currentDegree,
}: BeltProgressBarProps) {
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
