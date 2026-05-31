import { Bell, MapPin, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAgentAuth } from '../context/AgentAuthContext';

export default function TopHeader({
  title,
  subtitle,
  showAvatar = true,
  showBell = true,
  showBack = false,
  showLocation = true,
}) {
  const navigate = useNavigate();
  const { agent } = useAgentAuth();
  const initial = agent?.name?.[0]?.toUpperCase() || 'A';

  const defaultSubtitle = showLocation && (
    <span className="flex items-center gap-1 text-xs text-gray-500">
      <MapPin size={11} className="text-gray-400" />
      {agent?.district || 'North Central District'}
    </span>
  );

  return (
    <div className="flex items-center justify-between px-4 py-4 bg-white sticky top-0 z-30 border-b border-gray-100">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {showBack ? (
          <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center active:scale-95 shrink-0">
            <ArrowLeft size={20} className="text-gray-700" />
          </button>
        ) : showAvatar && (
          <button
            onClick={() => navigate('/settings')}
            className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-sm active:scale-95 transition-transform shrink-0 overflow-hidden"
          >
            {agent?.photo ? (
              <img src={agent.photo} alt={agent.name} className="w-full h-full object-cover" />
            ) : (
              initial
            )}
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
          onClick={() => navigate('/reports')}
          className="relative w-11 h-11 flex items-center justify-center active:scale-95 transition-transform shrink-0"
        >
          <Bell className="text-gray-700" size={22} />
          <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
        </button>
      )}
    </div>
  );
}
