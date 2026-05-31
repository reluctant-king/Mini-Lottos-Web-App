import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Bell, Languages, Shield, HelpCircle, LogOut, ChevronRight, MapPin } from 'lucide-react';
import { useAgentAuth } from '../context/AgentAuthContext';
import MobileLayout from '../components/MobileLayout';
import BottomNav from '../components/BottomNav';
import TopHeader from '../components/TopHeader';

export default function Settings() {
  const navigate = useNavigate();
  const { agent, logout } = useAgentAuth();
  const [notifEnabled, setNotifEnabled] = useState(true);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout();
      navigate('/', { replace: true });
    }
  };

  const initial = agent?.name?.[0]?.toUpperCase() || 'A';

  return (
    <MobileLayout>
      <TopHeader title="Settings" showBack showAvatar={false} showLocation={false} />

      <div className="px-4 py-4 space-y-3">
        <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl p-5 flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-2xl overflow-hidden shrink-0">
            {agent?.photo ? (
              <img src={agent.photo} alt={agent.name} className="w-full h-full object-cover" />
            ) : (
              initial
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xl font-bold truncate">{agent?.name || 'Agent'}</p>
            <p className="text-blue-600 font-mono font-semibold text-sm">{agent?.agentId}</p>
            <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
              <MapPin size={11} /> {agent?.district || 'North Central District'}
            </p>
          </div>
        </div>

        <SettingsRow
          icon={User} iconBg="bg-blue-100" iconColor="text-blue-600"
          label="Edit Profile" onClick={() => navigate('/settings/edit')}
        />

        <SettingsToggle
          icon={Bell} iconBg="bg-yellow-100" iconColor="text-yellow-600"
          label="Notifications" value={notifEnabled} onChange={setNotifEnabled}
        />

        <SettingsRow
          icon={Languages} iconBg="bg-green-100" iconColor="text-green-600"
          label="Language" value="English" onClick={() => navigate('/settings/language')}
        />

        <SettingsRow
          icon={Shield} iconBg="bg-purple-100" iconColor="text-purple-600"
          label="Privacy & Security" onClick={() => navigate('/settings/privacy')}
        />

        <SettingsRow
          icon={HelpCircle} iconBg="bg-gray-100" iconColor="text-gray-600"
          label="Help & Support" onClick={() => navigate('/settings/help')}
        />

        <SettingsRow
          icon={LogOut} iconBg="bg-red-100" iconColor="text-red-500"
          label="Logout" danger onClick={handleLogout}
        />

        <p className="text-center text-xs text-gray-400 pt-4">
          Mini Lottos Agent Portal v1.0.0
        </p>
      </div>

      <BottomNav />
    </MobileLayout>
  );
}

function SettingsRow({ icon: Icon, iconBg, iconColor, label, value, onClick, danger }) {
  return (
    <button
      onClick={onClick}
      className={`w-full bg-white p-4 rounded-2xl shadow-sm flex items-center gap-4 active:bg-gray-50 ${danger ? 'text-red-500' : ''}`}
    >
      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${iconBg}`}>
        <Icon className={iconColor} size={20} />
      </div>
      <span className="flex-1 text-left font-semibold">{label}</span>
      {value && <span className="text-gray-400 text-sm">{value}</span>}
      {!danger && <ChevronRight className="text-gray-400" size={20} />}
    </button>
  );
}

function SettingsToggle({ icon: Icon, iconBg, iconColor, label, value, onChange }) {
  return (
    <div className="w-full bg-white p-4 rounded-2xl shadow-sm flex items-center gap-4">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${iconBg}`}>
        <Icon className={iconColor} size={20} />
      </div>
      <span className="flex-1 text-left font-semibold">{label}</span>
      <button
        onClick={() => onChange(!value)}
        className={`w-12 h-7 rounded-full transition-all relative ${value ? 'bg-blue-600' : 'bg-gray-300'}`}
      >
        <span className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-all ${value ? 'left-6' : 'left-1'}`} />
      </button>
    </div>
  );
}
