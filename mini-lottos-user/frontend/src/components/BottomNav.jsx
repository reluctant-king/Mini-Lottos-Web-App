import { useNavigate } from 'react-router-dom';
import { Home, Ticket, HelpCircle, User, Bell, Gamepad2, Gift, Trophy, Sparkles, BarChart3 } from 'lucide-react';

const iconMap = {
  Home, Ticket, HelpCircle, User, Bell, Gamepad2, Gift, Trophy, Sparkles, BarChart3
};

export default function BottomNav({ active, badge, tabs: customTabs }) {
  const navigate = useNavigate();
  const tabs = customTabs || [
    { name: 'Home', path: '/home', icon: 'Home' },
    { name: 'My Tickets', path: '/tickets', icon: 'Ticket' },
    { name: 'Help', path: '/help', icon: 'HelpCircle' },
    { name: 'Profile', path: '/profile', icon: 'User' },
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white border-t border-gray-100 z-50 safe-area-bottom">
      <div className="flex items-center justify-around h-16 px-2">
        {tabs.map((tab) => {
          const Icon = iconMap[tab.icon] || Home;
          const isActive = active === tab.name;
          return (
            <button
              key={tab.name}
              onClick={() => navigate(tab.path)}
              className="flex flex-col items-center justify-center w-16 h-full relative"
            >
              {isActive ? (
                <div className="bg-orange-100 p-2 rounded-xl">
                  <Icon size={20} className="text-orange-500" fill="#F97316" />
                </div>
              ) : (
                <Icon size={20} className="text-gray-400" />
              )}
              <span className={`text-[10px] mt-0.5 font-medium ${isActive ? 'text-orange-500' : 'text-gray-400'}`}>
                {tab.name}
              </span>
              {badge && tab.name === 'My Tickets' && (
                <span className="absolute top-0 right-2 w-2 h-2 bg-red-500 rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
