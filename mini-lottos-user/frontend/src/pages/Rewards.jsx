import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Gamepad2, Brain, Building2, Lightbulb, Gift, Sparkles, DollarSign } from 'lucide-react';
import MobileLayout from '../components/MobileLayout';
import BottomNav from '../components/BottomNav';
import TopHeader from '../components/TopHeader';
import { useToast } from '../components/Toast';
import api from '../api/axios';

const games = [
  { name: 'Daily Quiz', coins: '+3', icon: Brain, color: 'bg-blue-500', desc: 'Answer daily trivia' },
  { name: 'Trivia Challenge', coins: '+2', icon: Gamepad2, color: 'bg-purple-500', desc: 'Beat the clock' },
  { name: 'Culture Mini Game', coins: '+5', icon: Building2, color: 'bg-orange-500', desc: 'Explore culture' },
  { name: 'Educational Game', coins: '+2', icon: Lightbulb, color: 'bg-green-500', desc: 'Learn & earn' },
];

const rewards = [
  { title: 'Animated Prize Video', icon: Sparkles, color: 'from-purple-400 to-pink-500' },
  { title: 'Retro Character', icon: Gift, color: 'from-cyan-400 to-blue-500' },
];

export default function Rewards() {
  const navigate = useNavigate();
  const toast = useToast();
  const [coins, setCoins] = useState(18);
  const [playing, setPlaying] = useState(null);

  const handlePlay = async (gameId, gameName) => {
    setPlaying(gameId);
    try {
      const res = await api.post('/rewards/play', { gameId });
      const earned = res.data.coins || 0;
      setCoins((c) => c + earned);
      toast(`You earned ${earned} coins from ${gameName}!`, 'success');
    } catch {
      const bonus = gameId === 1 ? 3 : gameId === 2 ? 2 : gameId === 3 ? 5 : 2;
      setCoins((c) => c + bonus);
      toast(`You earned ${bonus} coins from ${gameName}!`, 'success');
    } finally {
      setPlaying(null);
    }
  };

  return (
    <MobileLayout>
      <div className="px-5 pt-6">
        <TopHeader title="Mini Lottos" />

        <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl p-6 shadow-lg mb-6 relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full" />
          <p className="text-white/80 text-sm font-medium">Your Rewards</p>
          <div className="flex items-center gap-3 mt-2">
            <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
              <DollarSign size={28} className="text-white" />
            </div>
            <p className="text-white text-4xl font-extrabold">{coins}</p>
            <span className="text-white/70 text-sm mt-2">Coins</span>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <Sparkles size={16} className="text-orange-500" />
          <h2 className="font-bold text-gray-800">Play & Earn</h2>
        </div>

        <div className="space-y-3 mb-8">
          {games.map((game, i) => {
            const Icon = game.icon;
            return (
              <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-4">
                <div className={`w-12 h-12 ${game.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <Icon size={22} className="text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">{game.name}</p>
                  <p className="text-xs text-gray-400">{game.desc}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-green-600">{game.coins}</span>
                  <button
                    onClick={() => handlePlay(i + 1, game.name)}
                    disabled={playing === i + 1}
                    className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      playing === i + 1
                        ? 'bg-gray-100 text-gray-400'
                        : 'bg-orange-100 text-orange-600 hover:bg-orange-200'
                    }`}
                  >
                    {playing === i + 1 ? 'Playing...' : 'Play'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex items-center gap-2 mb-4">
          <Gift size={16} className="text-orange-500" />
          <h2 className="font-bold text-gray-800">Unlock Visual Rewards</h2>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2 -mx-5 px-5 mb-8">
          {rewards.map((r, i) => (
            <div
              key={i}
              className={`min-w-[200px] bg-gradient-to-br ${r.color} rounded-2xl p-5 flex-shrink-0 shadow-lg cursor-pointer`}
              onClick={() => toast(`Unlocking ${r.title}...`)}
            >
              <r.icon size={32} className="text-white mb-3" />
              <p className="text-white font-bold text-lg">{r.title}</p>
              <p className="text-white/70 text-xs mt-1">Tap to unlock</p>
            </div>
          ))}
        </div>

        <button
          onClick={() => navigate('/rewards/balance')}
          className="w-full bg-orange-500 text-white font-bold py-3.5 rounded-xl text-base hover:bg-orange-600 transition-all shadow-lg shadow-orange-200 mb-8"
        >
          REDEEM FOR MINI LOTTO ENTRY
        </button>
      </div>

      <BottomNav />
    </MobileLayout>
  );
}
