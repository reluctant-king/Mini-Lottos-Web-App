import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Award, Bell, Gift, Sparkles, TrendingUp, CheckCheck } from 'lucide-react';
import MobileLayout from '../components/MobileLayout';
import BottomNav from '../components/BottomNav';
import { useData } from '../context/DataContext';
import { useToast } from '../components/Toast';
import api from '../api/axios';

const defaultNotifications = [
  { id: 1, type: 'win', title: 'You Won!', message: 'Congratulations! Your ticket #ML-4821 won ₹5,000 in Super Daily draw.', time: '2 min ago', read: false },
  { id: 2, type: 'draw', title: 'Draw Reminder', message: 'Next Super Daily draw starts in 30 minutes. Get your tickets!', time: '15 min ago', read: false },
  { id: 3, type: 'bonus', title: 'Bonus Coins', message: 'You earned 5 bonus coins for playing Daily Quiz!', time: '1 hour ago', read: false },
  { id: 4, type: 'win', title: 'Winner Announcement', message: 'Rahul K. from Kochi won ₹25,000 in Quick 5 draw.', time: '3 hours ago', read: true },
  { id: 5, type: 'draw', title: 'Draw Complete', message: 'Super Daily draw #1423 results are now available.', time: '5 hours ago', read: true },
  { id: 6, type: 'bonus', title: 'Special Offer', message: 'Deposit ₹100 and get ₹50 bonus. Limited time offer!', time: '1 day ago', read: true },
];

const typeStyles = {
  win: { border: 'border-l-orange-500', icon: Award, bg: 'bg-orange-100', color: 'text-orange-600' },
  draw: { border: 'border-l-blue-500', icon: TrendingUp, bg: 'bg-blue-100', color: 'text-blue-600' },
  bonus: { border: 'border-l-purple-500', icon: Gift, bg: 'bg-purple-100', color: 'text-purple-600' },
};

export default function Notifications() {
  const navigate = useNavigate();
  const { notifications, refreshNotifications } = useData();
  const toast = useToast();
  const [list, setList] = useState(defaultNotifications);

  useEffect(() => {
    refreshNotifications();
    api.get('/notifications')
      .then((res) => {
        const data = res.data.notifications || res.data;
        if (data.length > 0) setList(data);
      })
      .catch(() => {});
  }, [refreshNotifications]);

  const handleClear = async () => {
    try {
      await api.delete('/notifications');
      setList([]);
      toast('Notifications cleared', 'success');
    } catch {
      setList([]);
      toast('Notifications cleared', 'success');
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await api.put('/notifications/read-all');
      setList((prev) => prev.map((n) => ({ ...n, read: true })));
      toast('All marked as read', 'success');
    } catch {
      setList((prev) => prev.map((n) => ({ ...n, read: true })));
      toast('All marked as read', 'success');
    }
  };

  const hasUnread = list.some((n) => !n.read);

  return (
    <MobileLayout>
      <div className="px-5 pt-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-xl">
              <ArrowLeft size={24} className="text-gray-700" />
            </button>
            <h1 className="text-lg font-bold text-gray-800">Alerts</h1>
          </div>
          <div className="flex items-center gap-2">
            {hasUnread && (
              <button
                onClick={handleMarkAllRead}
                className="text-sm font-medium text-blue-500 hover:text-blue-600 flex items-center gap-1"
              >
                <CheckCheck size={16} /> Read
              </button>
            )}
            <button
              onClick={handleClear}
              className="text-sm font-medium text-orange-500 hover:text-orange-600"
            >
              Clear
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {list.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <Bell size={48} className="text-gray-300 mb-4" />
              <p className="text-gray-400 font-medium">No notifications</p>
              <p className="text-gray-300 text-sm mt-1">That's all for now!</p>
            </div>
          ) : (
            list.map((n) => {
              const style = typeStyles[n.type] || typeStyles.draw;
              const Icon = style.icon;
              return (
                <div
                  key={n._id || n.id}
                  className={`bg-white rounded-xl shadow-sm border border-gray-100 border-l-4 ${style.border} p-4 relative`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 ${style.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <Icon size={18} className={style.color} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-gray-800 text-sm">{n.title}</p>
                        {!n.read && <span className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0" />}
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{n.message}</p>
                      <p className="text-[10px] text-gray-400 mt-1.5">{n.time}</p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {list.length > 0 && (
          <p className="text-center text-gray-400 text-sm mt-8 mb-8">That's all for now!</p>
        )}
      </div>

      <BottomNav />
    </MobileLayout>
  );
}
