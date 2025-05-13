import { ObstaclePosition } from "@/types/game";

interface ObstacleProps {
  obstacle: ObstaclePosition;
  cellSize: number;
}

const Obstacle: React.FC<ObstacleProps> = ({ obstacle, cellSize }) => {
  return (
    <div
      className="absolute bg-gray-600 rounded-sm z-10"
      style={{
        width: cellSize,
        height: cellSize,
        left: obstacle.position.x * cellSize,
        top: obstacle.position.y * cellSize,
      }}
    />
  );
};

export default Obstacle;
