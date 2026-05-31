import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Ticket, Gamepad2, Gift, Award } from 'lucide-react';

const tabs = [
  { name: 'Home', path: '/home', icon: Home },
  { name: 'Tickets', path: '/tickets', icon: Ticket },
  { name: 'Games', path: '/rewards', icon: Gamepad2 },
  { name: 'Rewards', path: '/rewards/balance', icon: Gift },
  { name: 'Winners', path: '/results', icon: Award },
];

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 pb-2 pt-2 z-50 max-w-md mx-auto shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = location.pathname === tab.path;

          return (
            <button
              key={tab.name}
              onClick={() => navigate(tab.path)}
              className={`relative flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-colors ${
                isActive ? 'text-orange-500' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <div className={`p-1.5 rounded-lg ${isActive ? 'bg-orange-50' : ''}`}>
                <Icon size={20} />
              </div>
              <span className={`text-[10px] font-semibold ${isActive ? 'text-orange-500' : 'text-gray-400'}`}>
                {tab.name}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
