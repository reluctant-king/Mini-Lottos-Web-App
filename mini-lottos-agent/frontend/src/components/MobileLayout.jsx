export default function MobileLayout({ children, hideNav, active, tabs }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full max-w-[430px] mx-auto bg-white min-h-screen shadow-lg relative pb-20">
        {children}
      </div>
    </div>
  );
}
