import { useCallback, useEffect, useRef } from "react";

export const useScrollLock = () => {
  const scrollLocked = useRef(false);
  const originalStyle = useRef<{
    overflow: string;
    paddingRight: string;
  } | null>(null);

  const lock = useCallback(() => {
    if (typeof document === "undefined" || scrollLocked.current) return;

    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    const body = document.body;

    originalStyle.current = {
      overflow: body.style.overflow,
      paddingRight: body.style.paddingRight,
    };

    body.style.overflow = "hidden";
    body.style.paddingRight = `${scrollbarWidth}px`;
    scrollLocked.current = true;
  }, []);

  const unlock = useCallback(() => {
    if (typeof document === "undefined" || !scrollLocked.current) return;

    const body = document.body;
    if (originalStyle.current) {
      body.style.overflow = originalStyle.current.overflow;
      body.style.paddingRight = originalStyle.current.paddingRight;
    }
    scrollLocked.current = false;
  }, []);

  useEffect(() => {
    return () => {
      if (scrollLocked.current) {
        unlock();
      }
    };
  }, [unlock]);

  return { lock, unlock };
};
