import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Edit, Languages, Shield, HelpCircle, LogOut, Camera, ChevronRight, User, DollarSign, Award } from 'lucide-react';
import MobileLayout from '../components/MobileLayout';
import BottomNav from '../components/BottomNav';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/Toast';

const menuItems = [
  { icon: Edit, label: 'Edit Profile', action: 'edit' },
  { icon: Languages, label: 'Language', value: 'English', action: 'lang' },
  { icon: Shield, label: 'Privacy & Security', action: 'privacy' },
  { icon: HelpCircle, label: 'Help & Support', action: 'help' },
];

export default function Profile() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const toast = useToast();
  const [notifToggle, setNotifToggle] = useState(true);

  const handleMenuAction = (action) => {
    switch (action) {
      case 'edit':
        toast('Edit profile coming soon');
        break;
      case 'lang':
        toast('Language: English');
        break;
      case 'privacy':
        toast('Privacy & Security settings');
        break;
      case 'help':
        navigate('/help');
        break;
      default:
        break;
    }
  };

  const handleLogout = () => {
    logout();
    toast('Logged out successfully');
    navigate('/login');
  };

  return (
    <MobileLayout>
      <div className="px-5 pt-6">
        <div className="flex items-center justify-between mb-8">
          <div className="w-8" />
          <h1 className="text-lg font-bold text-gray-800">Profile</h1>
          <button
            onClick={() => navigate('/notifications')}
            className="relative p-2 hover:bg-gray-100 rounded-xl"
          >
            <Bell size={22} className="text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>
        </div>

        <div className="flex flex-col items-center mb-8">
          <div className="relative w-24 h-24 mb-4">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md border-2 border-white">
              <Camera size={14} className="text-orange-500" />
            </div>
          </div>
          <h2 className="text-xl font-bold text-gray-800">{user?.name || 'Player'}</h2>
          <p className="text-sm text-gray-500">+91 {user?.phone || '9876543210'}</p>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-8">
          <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl p-4 shadow-md">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign size={18} className="text-white/80" />
              <p className="text-white/80 text-xs font-medium">Balance</p>
            </div>
            <p className="text-white text-2xl font-extrabold">₹{user?.balance?.toLocaleString('en-IN') || '0'}</p>
          </div>
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-4 shadow-md">
            <div className="flex items-center gap-2 mb-2">
              <Award size={18} className="text-white/80" />
              <p className="text-white/80 text-xs font-medium">Coins</p>
            </div>
            <p className="text-white text-2xl font-extrabold">{user?.coins || '18'}</p>
          </div>
        </div>

        <div className="space-y-1 mb-8">
          {menuItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <button
                key={i}
                onClick={() => handleMenuAction(item.action)}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                    <Icon size={20} className="text-gray-600" />
                  </div>
                  <span className="font-medium text-gray-700">{item.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  {item.value && <span className="text-sm text-gray-400">{item.value}</span>}
                  <ChevronRight size={16} className="text-gray-400" />
                </div>
              </button>
            );
          })}

          <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                <Bell size={20} className="text-gray-600" />
              </div>
              <span className="font-medium text-gray-700">Notifications</span>
            </div>
            <button
              onClick={() => {
                setNotifToggle(!notifToggle);
                toast(notifToggle ? 'Notifications muted' : 'Notifications enabled');
              }}
              className={`w-12 h-6 rounded-full transition-colors relative ${
                notifToggle ? 'bg-orange-500' : 'bg-gray-300'
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full absolute top-0.5 shadow-sm transition-transform ${
                  notifToggle ? 'left-6' : 'left-0.5'
                }`}
              />
            </button>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 p-4 hover:bg-red-50 rounded-xl transition-colors mt-4"
          >
            <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
              <LogOut size={20} className="text-red-500" />
            </div>
            <span className="font-medium text-red-500">Logout</span>
          </button>
        </div>
      </div>

      <BottomNav active="Profile" badge={false} />
    </MobileLayout>
  );
}
