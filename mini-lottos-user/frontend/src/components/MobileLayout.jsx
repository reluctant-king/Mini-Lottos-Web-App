export default function MobileLayout({ children, hideNav }) {
  return (
    <div className="max-w-[430px] mx-auto min-h-screen bg-gray-50 relative pb-24 shadow-2xl">
      {children}
    </div>
  );
}
