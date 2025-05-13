interface SpecialEffectProps {
  activeSpecialEffect: string;
}

const SpecialEffect: React.FC<SpecialEffectProps> = ({
  activeSpecialEffect,
}) => {
  return (
    <div
      className="absolute inset-0 border-4 border-cyan-400 z-40 pointer-events-none"
      style={{
        boxShadow: "0 0 10px 2px rgba(0, 255, 255, 0.5) inset",
      }}
    >
      <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 px-3 py-1 rounded-full">
        <span className="text-cyan-400 font-bold">{activeSpecialEffect}</span>
      </div>
    </div>
  );
};

export default SpecialEffect;
