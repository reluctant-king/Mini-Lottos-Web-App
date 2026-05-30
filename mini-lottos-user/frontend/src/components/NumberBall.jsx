export default function NumberBall({ number, filled }) {
  return (
    <div
      className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 ${
        filled
          ? 'bg-orange-500 text-white border-orange-500'
          : 'bg-white text-orange-500 border-orange-400'
      }`}
    >
      {number}
    </div>
  );
}
