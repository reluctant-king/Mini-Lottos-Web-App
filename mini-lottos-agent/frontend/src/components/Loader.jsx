export default function Loader({ size = 'md' }) {
  const sizeClasses = {
    sm: 'h-6 w-6 border-2',
    md: 'h-10 w-10 border-3',
    lg: 'h-16 w-16 border-4',
  };

  return (
    <div className="flex justify-center items-center py-12">
      <div
        className={`${sizeClasses[size]} rounded-full border-gray-200 border-t-primary animate-spin`}
        style={{ borderTopColor: '#2563EB' }}
      />
    </div>
  );
}
