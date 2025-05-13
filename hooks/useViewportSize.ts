import { useWindowSize } from "react-use";

interface ViewportSize {
  width: number;
  height: number;
  isMobile: boolean;
}

export const useViewportSize = (): ViewportSize => {
  const { width, height } = useWindowSize();

  return {
    width,
    height,
    isMobile: width < 768,
  };
};
