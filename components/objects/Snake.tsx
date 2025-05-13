import { Position } from "@/types/game";

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
                className="absolute top-1 left-1 w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: eyeColor }}
              />
              <div
                className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: eyeColor }}
              />
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default Snake;
