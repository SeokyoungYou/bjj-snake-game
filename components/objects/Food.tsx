import { Position } from "@/types/game";

interface FoodProps {
  food: Position;
  cellSize: number;
}

const Food: React.FC<FoodProps> = ({ food, cellSize }) => {
  return (
    <div
      className="absolute bg-red-500 rounded-full z-20"
      style={{
        width: cellSize * 0.7,
        height: cellSize * 0.7,
        left: food.x * cellSize + cellSize * 0.15,
        top: food.y * cellSize + cellSize * 0.15,
      }}
    />
  );
};

export default Food;
