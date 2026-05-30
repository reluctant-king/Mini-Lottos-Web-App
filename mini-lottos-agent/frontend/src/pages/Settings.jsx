import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Bell, Languages, Shield, HelpCircle, LogOut, ChevronRight, MapPin, Home, Users, BarChart3, Settings2 } from 'lucide-react';
import { useAgentAuth } from '../context/AgentAuthContext';
import { useToast } from '../components/Toast';
import MobileLayout from '../components/MobileLayout';
import BottomNav from '../components/BottomNav';

const navTabs = [
  { name: 'Home', path: '/dashboard', icon: Home },
  { name: 'Users', path: '/register-user', icon: Users },
  { name: 'Reports', path: '/reports', icon: BarChart3 },
  { name: 'Settings', path: '/settings', icon: Settings2 },
];

function formatAgentId(id) {
  if (!id) return '----';
  const s = String(id).padStart(8, '0');
  return `${s.slice(0, 4)}-${s.slice(4)}`;
}

export default function Settings() {
  const navigate = useNavigate();
  const { agent, logout } = useAgentAuth();
  const toast = useToast();
  const [notificationsOn, setNotificationsOn] = useState(true);

  const handleLogout = () => {
    logout();
    toast('Logged out successfully');
    navigate('/');
  };

  const menuItems = [
    { icon: User, label: 'Edit Profile', color: 'text-blue-500', bg: 'bg-blue-50', action: () => toast('Edit profile') },
    { icon: Bell, label: 'Notifications', color: 'text-amber-500', bg: 'bg-amber-50', action: null, toggle: true },
    { icon: Languages, label: 'Language', color: 'text-green-500', bg: 'bg-green-50', value: 'English', action: () => toast('Language settings') },
    { icon: Shield, label: 'Privacy & Security', color: 'text-purple-500', bg: 'bg-purple-50', action: () => toast('Privacy & Security') },
    { icon: HelpCircle, label: 'Help & Support', color: 'text-gray-500', bg: 'bg-gray-100', action: () => toast('Help & Support') },
    { icon: LogOut, label: 'Logout', color: 'text-red-500', bg: 'bg-red-50', action: handleLogout, danger: true },
  ];

  return (
    <MobileLayout>
      <div className="px-5 pt-5 pb-4">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => navigate(-1)} className="h-9 w-9 rounded-xl bg-gray-100 flex items-center justify-center">
            <ArrowLeft size={20} color="#374151" />
          </button>
          <h1 className="text-lg font-bold text-gray-900">Settings</h1>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-4 flex items-center gap-4 mb-6">
          <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center text-white text-xl font-bold shrink-0 overflow-hidden">
            {agent?.photo ? (
              <img src={agent.photo} alt="" className="h-full w-full object-cover" />
            ) : (
              agent?.name?.charAt(0) || 'A'
            )}
          </div>
          <div>
            <h2 className="font-bold text-gray-900 text-base">{agent?.name || 'Agent'}</h2>
            <p className="text-xs text-gray-600 font-mono font-medium">{formatAgentId(agent?.agentId || agent?.id)}</p>
            <div className="flex items-center gap-1 mt-1">
              <MapPin size={12} color="#6B7280" />
              <span className="text-[10px] text-gray-500">{agent?.district || 'District'}</span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          {menuItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                onClick={item.toggle || item.action ? undefined : item.action}
                className="flex items-center justify-between bg-white rounded-2xl px-4 py-3.5 border border-gray-100 shadow-sm cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`h-9 w-9 rounded-xl ${item.bg} flex items-center justify-center`}>
                    <Icon size={18} className={item.color} />
                  </div>
                  <span className={`text-sm font-semibold ${item.danger ? 'text-red-500' : 'text-gray-700'}`}>
                    {item.label}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {item.value && (
                    <span className="text-xs text-gray-400 font-medium">{item.value}</span>
                  )}
                  {item.toggle ? (
                    <button
                      onClick={(e) => { e.stopPropagation(); setNotificationsOn(!notificationsOn); }}
                      className={`relative h-6 w-11 rounded-full transition-colors ${notificationsOn ? 'bg-primary' : 'bg-gray-300'}`}
                    >
                      <span
                        className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                          notificationsOn ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  ) : item.action ? (
                    <ChevronRight size={16} color="#9CA3AF" />
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <BottomNav active="Settings" tabs={navTabs} />
    </MobileLayout>
  );
}
