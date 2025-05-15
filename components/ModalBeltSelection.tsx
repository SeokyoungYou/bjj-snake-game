import { BELTS } from "@/constants/game-constants";
import { BeltRank } from "@/types/game";
import { SCORE_THRESHOLDS } from "@/lib/score-calculator";

interface ModalBeltSelectionProps {
  isOpen: boolean;
  selectedBeltIndex: number;
  selectedDegree: number;
  onClose: () => void;
  onSelectBelt: (score: number) => void;
}

export default function ModalBeltSelection({
  isOpen,
  selectedBeltIndex,
  selectedDegree,
  onClose,
  onSelectBelt,
}: ModalBeltSelectionProps) {
  if (!isOpen) return null;

  const getRequiredScore = (beltIndex: number, degree: number) => {
    const beltRank = BELTS[beltIndex].rank;
    const thresholds = SCORE_THRESHOLDS[beltRank];
    return thresholds[degree].score;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">벨트 및 랭크 선택</h2>
        <div className="grid grid-cols-2 gap-4">
          {BELTS.map((belt, index) => (
            <div key={belt.name} className="space-y-2">
              <button
                onClick={() => {
                  const score = getRequiredScore(index, selectedDegree);
                  onSelectBelt(score);
                  onClose();
                }}
                className={`w-full p-4 rounded-lg border-2 transition-all ${
                  selectedBeltIndex === index
                    ? "border-blue-500 scale-105"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                style={{ backgroundColor: belt.bgColor }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full"
                    style={{ backgroundColor: belt.color }}
                  />
                  <span className="font-medium">{belt.name} 벨트</span>
                </div>
              </button>
              {selectedBeltIndex === index && (
                <div className="flex flex-col gap-2">
                  {[0, 1, 2, 3, 4].map((degree) => (
                    <button
                      key={degree}
                      onClick={() => {
                        const score = getRequiredScore(index, degree);
                        onSelectBelt(score);
                        onClose();
                      }}
                      className={`flex items-center justify-between p-2 rounded-lg border-2 transition-all ${
                        selectedDegree === degree
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <span>{degree}단</span>
                      <span className="text-sm text-gray-600">
                        필요 점수: {getRequiredScore(index, degree)}점
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <button
          onClick={onClose}
          className="mt-4 w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
        >
          닫기
        </button>
      </div>
    </div>
  );
}
