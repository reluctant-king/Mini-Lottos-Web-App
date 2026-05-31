import { Home, Ticket, Users, BarChart3, Settings } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const tabs = [
  { label: 'Home', icon: Home, path: '/dashboard' },
  { label: 'Tickets', icon: Ticket, path: '/tickets' },
  { label: 'Users', icon: Users, path: '/users' },
  { label: 'Reports', icon: BarChart3, path: '/reports' },
  { label: 'Settings', icon: Settings, path: '/settings' },
];

export default function BottomNav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isActive = (path) => {
    if (pathname === path) return true;
    if (path === '/users' && (pathname === '/users' || pathname.startsWith('/register-user') || pathname.startsWith('/link') || pathname.startsWith('/linked-success'))) return true;
    if (path === '/tickets' && pathname.startsWith('/tickets')) return true;
    if (path === '/dashboard' && (pathname === '/dashboard' || pathname.startsWith('/scan') || pathname.startsWith('/create-entry') || pathname.startsWith('/winner-alert'))) return true;
    if (path === '/settings' && pathname.startsWith('/settings')) return true;
    return false;
  };

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] bg-white border-t border-gray-100 flex justify-around items-center py-2 z-50 shadow-[0_-2px_10px_rgba(0,0,0,0.04)]">
      {tabs.map(({ label, icon: Icon, path }) => {
        const active = isActive(path);
        return (
          <button
            key={path}
            onClick={() => navigate(path)}
            className="flex flex-col items-center gap-1 p-2 flex-1 active:scale-95 transition-transform"
          >
            <div className={`w-11 h-11 rounded-full flex items-center justify-center transition-all ${active ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-gray-400'}`}>
              <Icon size={20} strokeWidth={active ? 2.5 : 2} />
            </div>
            <span className={`text-[11px] font-semibold ${active ? 'text-blue-600' : 'text-gray-400'}`}>{label}</span>
          </button>
        );
      })}
    </div>
  );
}
