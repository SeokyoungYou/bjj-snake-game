import { SpecialItem } from "@/types/game";

interface SpecialFoodProps {
  specialFood: SpecialItem;
  cellSize: number;
}

const SpecialFood: React.FC<SpecialFoodProps> = ({ specialFood, cellSize }) => {
  return (
    <div
      className="absolute bg-cyan-400 rounded-full z-20 animate-pulse"
      style={{
        width: cellSize * 0.8,
        height: cellSize * 0.8,
        left: specialFood.position.x * cellSize + cellSize * 0.1,
        top: specialFood.position.y * cellSize + cellSize * 0.1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <span className="text-xs font-bold text-black">
        {specialFood.type.charAt(0)}
      </span>
    </div>
  );
};

export default SpecialFood;
