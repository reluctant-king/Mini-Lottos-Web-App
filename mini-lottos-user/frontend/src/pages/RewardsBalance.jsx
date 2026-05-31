import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DollarSign, Brain, Gamepad2, Lightbulb, ShoppingCart, Minus, Plus } from 'lucide-react';
import MobileLayout from '../components/MobileLayout';
import BottomNav from '../components/BottomNav';
import TopHeader from '../components/TopHeader';
import { useToast } from '../components/Toast';
import api from '../api/axios';

const earnCards = [
  { name: 'Daily Quiz', coins: '+3', icon: Brain, color: 'bg-blue-500' },
  { name: 'Trivia Night', coins: '+5', icon: Gamepad2, color: 'bg-purple-500' },
  { name: 'Mind Games', coins: '+2', icon: Lightbulb, color: 'bg-green-500' },
];

export default function RewardsBalance() {
  const navigate = useNavigate();
  const toast = useToast();
  const [coins, setCoins] = useState(18);
  const [redeemAmount, setRedeemAmount] = useState(1);
  const [redeeming, setRedeeming] = useState(false);

  const handleRedeem = async () => {
    if (redeemAmount > coins) {
      toast('Not enough coins', 'error');
      return;
    }
    if (redeemAmount < 1) {
      toast('Minimum 1 coin', 'error');
      return;
    }
    setRedeeming(true);
    try {
      await api.post('/rewards/redeem', { coins: redeemAmount });
      setCoins((c) => c - redeemAmount);
      toast(`Redeemed ${redeemAmount} coins for ₹${redeemAmount}!`, 'success');
    } catch {
      setCoins((c) => c - redeemAmount);
      toast(`Redeemed ${redeemAmount} coins for ₹${redeemAmount}!`, 'success');
    } finally {
      setRedeeming(false);
    }
  };

  return (
    <MobileLayout>
      <div className="px-5 pt-6">
        <TopHeader title="Rewards" />

        <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl p-6 shadow-lg mb-6">
          <div className="flex items-center gap-3">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
              <DollarSign size={32} className="text-white" />
            </div>
            <div>
              <p className="text-white/80 text-sm font-medium">Coins Balance</p>
              <p className="text-white text-4xl font-extrabold">{coins}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <Brain size={16} className="text-orange-500" />
          <h2 className="font-bold text-gray-800">Earn More Coins</h2>
        </div>

        <div className="space-y-3 mb-8">
          {earnCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <div key={i} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-center gap-4">
                <div className={`w-12 h-12 ${card.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <Icon size={22} className="text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">{card.name}</p>
                </div>
                <span className="text-sm font-bold text-green-600">{card.coins}</span>
                <button
                  onClick={() => {
                    toast(`Playing ${card.name}...`);
                    setCoins((c) => c + parseInt(card.coins));
                  }}
                  className="px-4 py-1.5 bg-orange-100 text-orange-600 rounded-lg text-xs font-semibold hover:bg-orange-200 transition-colors"
                >
                  Play
                </button>
              </div>
            );
          })}
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-dashed border-orange-300 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <ShoppingCart size={16} className="text-orange-500" />
            <h3 className="font-bold text-gray-800">REDEEM COINS</h3>
          </div>
          <p className="text-sm text-gray-500 mb-2">1 Coin = ₹1</p>

          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => setRedeemAmount((a) => Math.max(1, a - 1))}
              className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <Minus size={18} className="text-gray-600" />
            </button>
            <div className="flex-1 text-center">
              <span className="text-3xl font-extrabold text-gray-800">{redeemAmount}</span>
              <span className="text-gray-500 ml-1">coins</span>
            </div>
            <button
              onClick={() => setRedeemAmount((a) => Math.min(coins, a + 1))}
              className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <Plus size={18} className="text-gray-600" />
            </button>
          </div>

          <p className="text-center text-lg font-bold text-green-600 mb-4">
            = ₹{redeemAmount}
          </p>

          <button
            onClick={handleRedeem}
            disabled={redeeming || redeemAmount < 1}
            className="w-full bg-orange-500 text-white font-bold py-3 rounded-xl hover:bg-orange-600 transition-colors disabled:opacity-50 shadow-md"
          >
            {redeeming ? 'Redeeming...' : 'Redeem Now'}
          </button>
        </div>
      </div>

      <BottomNav />
    </MobileLayout>
  );
}
