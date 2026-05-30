import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PartyPopper, Star, Eye, ChevronRight, Sparkles } from 'lucide-react';
import MobileLayout from '../components/MobileLayout';
import BottomNav from '../components/BottomNav';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { useToast } from '../components/Toast';
import api from '../api/axios';

export default function Home() {
  const { user } = useAuth();
  const { refreshNotifications } = useData();
  const toast = useToast();
  const navigate = useNavigate();
  const [winners, setWinners] = useState([]);
  const [drawTime, setDrawTime] = useState({ hours: 2, minutes: 15 });

  useEffect(() => {
    refreshNotifications();
    api.get('/draws/upcoming').catch(() => {});
    const winnersData = [
      { name: 'Rajesh K.', prize: 50000, game: 'Super Daily' },
      { name: 'Priya S.', prize: 25000, game: 'Quick 5' },
      { name: 'Amit R.', prize: 100000, game: 'Super Daily' },
    ];
    setWinners(winnersData);

    const timer = setInterval(() => {
      setDrawTime((prev) => {
        if (prev.minutes === 0) {
          if (prev.hours === 0) return { hours: 0, minutes: 0 };
          return { hours: prev.hours - 1, minutes: 59 };
        }
        return { hours: prev.hours, minutes: prev.minutes - 1 };
      });
    }, 60000);
    return () => clearInterval(timer);
  }, [refreshNotifications]);

  return (
    <MobileLayout>
      <div className="px-5 pt-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div>
              <p className="text-xs text-gray-500">Welcome back</p>
              <p className="font-bold text-gray-800">{user?.name || 'Player'}</p>
            </div>
          </div>
          <div className="bg-gradient-to-r from-orange-500 to-amber-500 px-4 py-2 rounded-full shadow-md">
            <span className="text-white font-bold text-sm">₹{user?.balance?.toLocaleString('en-IN') || '0'}</span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl p-5 mb-6 shadow-lg relative overflow-hidden">
          <div className="absolute -right-6 -top-6 w-32 h-32 bg-white/10 rounded-full" />
          <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-white/10 rounded-full" />
          <div className="flex items-start justify-between relative z-10">
            <div>
              <p className="text-white/80 text-sm font-medium">Big Winner Today!</p>
              <p className="text-white text-2xl font-extrabold mt-1">₹1,00,000</p>
            </div>
            <PartyPopper size={32} className="text-yellow-200" fill="#FDE68A" />
          </div>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <Star size={16} className="text-orange-500" fill="#F97316" />
          <h2 className="font-bold text-gray-800">Featured Games</h2>
        </div>

        <div className="bg-gradient-to-r from-yellow-400 via-orange-400 to-amber-500 rounded-2xl p-5 mb-4 shadow-lg relative overflow-hidden">
          <div className="absolute top-2 right-3 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
            HOT JACKPOT
          </div>
          <div className="relative z-10">
            <h3 className="text-white font-bold text-lg">Super Daily</h3>
            <p className="text-3xl font-extrabold text-white mt-2">₹5,000,000</p>
            <div className="flex items-center gap-2 mt-3">
              <div className="bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                <span className="text-white font-semibold text-sm">
                  {drawTime.hours}h : {drawTime.minutes.toString().padStart(2, '0')}m
                </span>
              </div>
            </div>
            <button
              onClick={() => toast('Visit your local agent to play')}
              className="mt-4 bg-white text-orange-600 font-bold px-6 py-2.5 rounded-xl text-sm hover:bg-orange-50 transition-colors shadow-md"
            >
              Play Now
            </button>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl p-5 mb-6 shadow-lg relative overflow-hidden">
          <div className="absolute top-2 right-3 bg-blue-700 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
            EVERY 15 MINS
          </div>
          <div className="relative z-10">
            <h3 className="text-white font-bold text-lg">Quick 5</h3>
            <p className="text-2xl font-extrabold text-white mt-2">₹50,000</p>
            <button
              onClick={() => toast('Visit your local agent to play')}
              className="mt-4 bg-white text-blue-600 font-bold px-6 py-2.5 rounded-xl text-sm hover:bg-blue-50 transition-colors shadow-md"
            >
              Play Now
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-orange-500" />
            <h2 className="font-bold text-gray-800">Past Winners</h2>
          </div>
          <button className="text-xs text-orange-500 font-medium flex items-center gap-1">
            View All <ChevronRight size={14} />
          </button>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2 -mx-5 px-5">
          {winners.map((w, i) => (
            <div key={i} className="min-w-[180px] bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex-shrink-0">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Eye size={18} className="text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-gray-800">{w.name}</p>
                  <p className="text-xs text-gray-400">{w.game}</p>
                </div>
              </div>
              <p className="text-lg font-extrabold text-green-600">₹{w.prize.toLocaleString('en-IN')}</p>
            </div>
          ))}
        </div>
      </div>

      <BottomNav active="Home" badge={false} />
    </MobileLayout>
  );
}
