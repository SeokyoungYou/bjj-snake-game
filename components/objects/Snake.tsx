import { BeltProgress, Position } from "@/types/game";
import { useViewportSize } from "@/hooks/useViewportSize";
import { useBeltColors } from "@/hooks/use-belt-colors";

interface SnakeProps {
  snake: Position[];
  cellSize: number;
  beltProgress: BeltProgress;
}

const EYE_SIZE = 3;

const Snake: React.FC<SnakeProps> = ({ snake, cellSize, beltProgress }) => {
  const { snakeHeadColor, snakeBodyColor, eyeColor, stripeColor } =
    useBeltColors(beltProgress);
  const stripeCount = beltProgress.degree;

  const getSegmentColor = (index: number) => {
    if (index === 0) return snakeHeadColor;

    // 꼬리에서부터 stripeCount * 2 만큼의 세그먼트에 줄무늬 적용
    const fromTail = snake.length - 1 - index;
    if (fromTail < stripeCount * 2) {
      return fromTail % 2 === 0 ? snakeBodyColor : stripeColor;
    }

    return snakeBodyColor;
  };

  return (
    <>
      {snake.map((segment, index) => (
        <div
          key={`snake-${index}`}
          style={{
            position: "absolute",
            width: cellSize,
            height: cellSize,
            left: segment.x * cellSize,
            top: segment.y * cellSize,
            backgroundColor: getSegmentColor(index),
            borderRadius: index === 0 ? "4px" : "2px",
            zIndex: 30,
          }}
        >
          {index === 0 && (
            <div className="w-full h-full relative">
              <div
                className={`absolute top-1 left-1 rounded-full`}
                style={{
                  backgroundColor: eyeColor,
                  width: EYE_SIZE,
                  height: EYE_SIZE,
                }}
              />
              <div
                className={`absolute top-1 right-1 rounded-full`}
                style={{
                  backgroundColor: eyeColor,
                  width: EYE_SIZE,
                  height: EYE_SIZE,
                }}
              />
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default Snake;
