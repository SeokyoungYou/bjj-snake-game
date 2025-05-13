"use client";

import { useEffect, useState } from "react";
import { PromotionModalProps } from "@/types/game";

/**
 * 프로모션 모달 컴포넌트
 * 벨트 승급이나 특별한 성과 달성 시 표시되는 축하 메시지 모달입니다.
 * 3초 후 자동으로 사라집니다.
 */
export default function PromotionModal({ message }: PromotionModalProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
      <div className="bg-gradient-to-r from-yellow-500 via-yellow-300 to-yellow-500 text-black font-bold text-2xl px-8 py-4 rounded-lg shadow-lg animate-bounce">
        {message}
      </div>
    </div>
  );
}
