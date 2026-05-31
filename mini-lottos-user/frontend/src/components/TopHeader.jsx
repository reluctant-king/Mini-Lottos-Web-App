import { Bell, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';

export default function TopHeader({
  title,
  subtitle,
  showLocation = true,
  showAvatar = true,
  showBell = true,
}) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { notifications } = useData() || { notifications: [] };
  const unread = (notifications || []).filter(n => !n.read).length;
  const initial = user?.name?.[0]?.toUpperCase() || 'P';

  const defaultSubtitle = showLocation && (
    <span className="flex items-center gap-1 text-xs text-gray-500">
      <MapPin size={11} className="text-gray-400" />
      {user?.district || 'Kochi'}, {user?.state || 'Kerala'}
    </span>
  );

  return (
    <div className="flex items-center justify-between px-4 py-4 bg-gray-50 sticky top-0 z-30">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {showAvatar && (
          <button
            onClick={() => navigate('/profile')}
            className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-lg shadow-sm active:scale-95 transition-transform shrink-0"
          >
            {initial}
          </button>
        )}
        <div className="min-w-0">
          {(subtitle || defaultSubtitle) && (
            <div className="truncate">{subtitle || defaultSubtitle}</div>
          )}
          <h1 className="text-lg font-bold text-gray-900 truncate">{title}</h1>
        </div>
      </div>
      {showBell && (
        <button
          onClick={() => navigate('/notifications')}
          className="relative w-11 h-11 flex items-center justify-center active:scale-95 transition-transform shrink-0"
        >
          <Bell className="text-gray-700" size={22} />
          {unread > 0 && (
            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
          )}
        </button>
      )}
    </div>
  );
}
