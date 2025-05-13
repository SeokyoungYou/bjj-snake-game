"use client";

import { Button } from "@/components/ui/button";
import {
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

/**
 * 게임 컨트롤 컴포넌트
 * 방향키 버튼을 제공하여 모바일 환경에서도 게임을 조작할 수 있게 합니다.
 */
export default function GameControls() {
  /**
   * 버튼 클릭/터치 시 키보드 이벤트를 시뮬레이션합니다.
   * @param direction - 방향키 값 ('ArrowUp' | 'ArrowDown' | 'ArrowLeft' | 'ArrowRight')
   */
  const handleButtonPress = (
    direction: "ArrowUp" | "ArrowDown" | "ArrowLeft" | "ArrowRight"
  ) => {
    const event = new KeyboardEvent("keydown", { key: direction });
    window.dispatchEvent(event);
  };

  return (
    <div className="mt-4 grid grid-cols-3 gap-2 w-full max-w-[200px]">
      {/* 상단 방향키 */}
      <div className="col-start-2">
        <Button
          variant="outline"
          className="w-full aspect-square"
          onTouchStart={() => handleButtonPress("ArrowUp")}
          onClick={() => handleButtonPress("ArrowUp")}
        >
          <ChevronUp className="h-6 w-6" />
        </Button>
      </div>
      {/* 좌측 방향키 */}
      <div className="col-start-1 row-start-2">
        <Button
          variant="outline"
          className="w-full aspect-square"
          onTouchStart={() => handleButtonPress("ArrowLeft")}
          onClick={() => handleButtonPress("ArrowLeft")}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
      </div>
      {/* 우측 방향키 */}
      <div className="col-start-3 row-start-2">
        <Button
          variant="outline"
          className="w-full aspect-square"
          onTouchStart={() => handleButtonPress("ArrowRight")}
          onClick={() => handleButtonPress("ArrowRight")}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>
      {/* 중앙 빈 공간 */}
      <div className="col-start-2 row-start-2">
        <div className="w-full aspect-square"></div>
      </div>
      {/* 하단 방향키 */}
      <div className="col-start-2 row-start-3">
        <Button
          variant="outline"
          className="w-full aspect-square"
          onTouchStart={() => handleButtonPress("ArrowDown")}
          onClick={() => handleButtonPress("ArrowDown")}
        >
          <ChevronDown className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
}
