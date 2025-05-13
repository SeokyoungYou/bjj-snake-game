import { Position } from "@/types/game";
import { useViewportSize } from "@/hooks/useViewportSize";

interface SnakeProps {
  snake: Position[];
  cellSize: number;
  snakeHeadColor: string;
  snakeBodyColor: string;
  eyeColor: string;
}

const Snake: React.FC<SnakeProps> = ({
  snake,
  cellSize,
  snakeHeadColor,
  snakeBodyColor,
  eyeColor,
}) => {
  const { isMobile } = useViewportSize();
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
