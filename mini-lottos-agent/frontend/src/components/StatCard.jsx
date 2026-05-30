export default function StatCard({ value, label, color }) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
      <p className={`text-2xl font-extrabold ${color || 'text-gray-900'}`}>{value}</p>
      <p className="text-xs text-gray-500 mt-1 font-medium">{label}</p>
    </div>
  );
}
