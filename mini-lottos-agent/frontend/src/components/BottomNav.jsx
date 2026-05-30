import { useNavigate } from 'react-router-dom';

export default function BottomNav({ active, tabs }) {
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white border-t border-gray-200 px-4 py-2 z-40">
      <div className="flex justify-around items-center">
        {tabs.map((tab) => {
          const isActive = active === tab.name;
          const Icon = tab.icon;
          return (
            <button
              key={tab.name}
              onClick={() => navigate(tab.path)}
              className="flex flex-col items-center gap-1 py-1 px-3"
            >
              <Icon size={22} color={isActive ? '#2563EB' : '#9CA3AF'} />
              <span className={`text-[10px] font-medium ${isActive ? 'text-primary' : 'text-gray-400'}`}>
                {tab.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
