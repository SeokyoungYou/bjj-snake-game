import { BeltProgress, Position } from "@/types/game";
import { useViewportSize } from "@/hooks/useViewportSize";
import { useBeltColors } from "@/hooks/use-belt-colors";

interface SnakeProps {
  snake: Position[];
  cellSize: number;
  beltProgress: BeltProgress;
}

const Snake: React.FC<SnakeProps> = ({ snake, cellSize, beltProgress }) => {
  const { isMobile } = useViewportSize();
  const { snakeHeadColor, snakeBodyColor, eyeColor } =
    useBeltColors(beltProgress);

  const eyeSize = isMobile ? 3 : 6;
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
            backgroundColor: index === 0 ? snakeHeadColor : snakeBodyColor,
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
                  width: eyeSize,
                  height: eyeSize,
                }}
              />
              <div
                className={`absolute top-1 right-1 rounded-full`}
                style={{
                  backgroundColor: eyeColor,
                  width: eyeSize,
                  height: eyeSize,
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
