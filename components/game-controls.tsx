"use client";

import { Button } from "@/components/ui/button";
import {
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useViewportSize } from "@/hooks/useViewportSize";

/**
 * 게임 컨트롤 컴포넌트
 * 방향키 버튼을 제공하여 모바일 환경에서도 게임을 조작할 수 있게 합니다.
 */
export default function GameControls() {
  const { isMobile } = useViewportSize();

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
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="grid grid-cols-3 gap-3 w-[280px]">
        {/* 상단 방향키 */}
        <div className="col-start-2">
          <Button
            variant="outline"
            className={cn(
              "w-full aspect-square bg-white/90 backdrop-blur-md hover:bg-white active:bg-white/100",
              "touch-manipulation select-none shadow-lg",
              isMobile ? "h-16" : "h-14"
            )}
            onTouchStart={() => handleButtonPress("ArrowUp")}
            onClick={() => handleButtonPress("ArrowUp")}
          >
            <ChevronUp
              className={cn("h-8 w-8", isMobile ? "h-10 w-10" : "h-8 w-8")}
            />
          </Button>
        </div>
        {/* 좌측 방향키 */}
        <div className="col-start-1 row-start-2">
          <Button
            variant="outline"
            className={cn(
              "w-full aspect-square bg-white/90 backdrop-blur-md hover:bg-white active:bg-white/100",
              "touch-manipulation select-none shadow-lg",
              isMobile ? "h-16" : "h-14"
            )}
            onTouchStart={() => handleButtonPress("ArrowLeft")}
            onClick={() => handleButtonPress("ArrowLeft")}
          >
            <ChevronLeft
              className={cn("h-8 w-8", isMobile ? "h-10 w-10" : "h-8 w-8")}
            />
          </Button>
        </div>
        {/* 우측 방향키 */}
        <div className="col-start-3 row-start-2">
          <Button
            variant="outline"
            className={cn(
              "w-full aspect-square bg-white/90 backdrop-blur-md hover:bg-white active:bg-white/100",
              "touch-manipulation select-none shadow-lg",
              isMobile ? "h-16" : "h-14"
            )}
            onTouchStart={() => handleButtonPress("ArrowRight")}
            onClick={() => handleButtonPress("ArrowRight")}
          >
            <ChevronRight
              className={cn("h-8 w-8", isMobile ? "h-10 w-10" : "h-8 w-8")}
            />
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
            className={cn(
              "w-full aspect-square bg-white/90 backdrop-blur-md hover:bg-white active:bg-white/100",
              "touch-manipulation select-none shadow-lg",
              isMobile ? "h-16" : "h-14"
            )}
            onTouchStart={() => handleButtonPress("ArrowDown")}
            onClick={() => handleButtonPress("ArrowDown")}
          >
            <ChevronDown
              className={cn("h-8 w-8", isMobile ? "h-10 w-10" : "h-8 w-8")}
            />
          </Button>
        </div>
      </div>
    </div>
  );
}
