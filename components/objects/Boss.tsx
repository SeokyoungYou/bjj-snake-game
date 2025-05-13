interface BossProps {
  boss: {
    position: {
      x: number;
      y: number;
    };
  };
  cellSize: number;
}

const Boss: React.FC<BossProps> = ({ boss, cellSize }) => {
  return (
    <div
      className="absolute bg-fuchsia-600 z-20 rounded-md"
      style={{
        width: cellSize,
        height: cellSize,
        left: boss.position.x * cellSize,
        top: boss.position.y * cellSize,
      }}
    >
      <div className="flex flex-col items-center justify-center h-full w-full">
        <div className="flex gap-1 mt-1">
          <div className="w-1 h-1 bg-black rounded-full" />
          <div className="w-1 h-1 bg-black rounded-full" />
        </div>
        <div className="w-3 h-1 bg-black rounded-full mt-2" />
      </div>
    </div>
  );
};

export default Boss;
