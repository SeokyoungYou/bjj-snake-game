import { useWindowSize } from "usehooks-ts";
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
