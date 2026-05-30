export default function Loader({ size = 'md' }) {
  const sizeMap = { sm: 'w-6 h-6', md: 'w-10 h-10', lg: 'w-16 h-16' };
  const sizeClass = sizeMap[size] || sizeMap.md;

  return (
    <div className="flex items-center justify-center p-8">
      <div
        className={`${sizeClass} border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin`}
      />
    </div>
  );
}
