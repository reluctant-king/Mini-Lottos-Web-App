import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Ticket, Hash, Check, ChevronRight } from 'lucide-react';
import { useToast } from '../components/Toast';
import MobileLayout from '../components/MobileLayout';
import BottomNav from '../components/BottomNav';
import TopHeader from '../components/TopHeader';
import api from '../api/axios';

export default function CreateEntry() {
  const navigate = useNavigate();
  const toast = useToast();
  const [entries, setEntries] = useState(4);
  const [category, setCategory] = useState('basic');
  const [loading, setLoading] = useState(false);

  const basicPrice = 5;
  const premiumPrice = 10;
  const price = category === 'basic' ? basicPrice : premiumPrice;
  const total = entries * price;

  const handleProceed = async () => {
    if (entries < 1) {
      toast('Minimum 1 entry required');
      return;
    }
    setLoading(true);
    try {
      const res = await api.post('/tickets/create', {
        entries,
        category: 'Mini Lottos',
        price: total,
      });
      localStorage.setItem('pending_ticket_id', res.data.ticket?._id || res.data._id || res.data.ticketId);
      toast('Entry created! Now link to a user.');
      navigate('/link');
    } catch (err) {
      toast(err.response?.data?.message || 'Failed to create entry');
    } finally {
      setLoading(false);
    }
  };

  return (
    <MobileLayout>
      <TopHeader title="Mini Lottos Entry" showBack showAvatar={false} showLocation={false} />

      <div className="px-5 pt-5 pb-4">
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-5 mb-6 text-white">
          <div className="h-10 w-10 rounded-xl bg-white/20 flex items-center justify-center mb-3">
            <Ticket size={22} color="white" />
          </div>
          <p className="text-lg font-extrabold">Agent Terminal</p>
          <p className="text-xs text-blue-200 font-medium mt-1">Issue new lottery entries quickly</p>
        </div>

        <p className="text-xs font-semibold text-gray-500 mb-3 tracking-wide">ENTRY DETAILS</p>
        <div className="mb-5">
          <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Number of Entries</label>
          <div className="relative">
            <Hash size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="number"
              value={entries}
              onChange={(e) => setEntries(Math.max(1, parseInt(e.target.value) || 1))}
              min={1}
              className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>

        <p className="text-xs font-semibold text-gray-500 mb-3 tracking-wide">LOTTERY CATEGORY</p>
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            onClick={() => setCategory('basic')}
            className={`rounded-2xl p-4 text-center border-2 transition-all ${
              category === 'basic'
                ? 'border-primary bg-blue-50'
                : 'border-gray-200 bg-white'
            }`}
          >
            <p className={`text-sm font-extrabold ${category === 'basic' ? 'text-primary' : 'text-gray-900'}`}>Basic Entry</p>
            <p className={`text-lg font-black mt-1 ${category === 'basic' ? 'text-primary' : 'text-gray-900'}`}>₹5</p>
            {category === 'basic' && <Check size={16} className="mx-auto mt-1 text-primary" />}
          </button>
          <button
            onClick={() => setCategory('premium')}
            className={`rounded-2xl p-4 text-center border-2 transition-all ${
              category === 'premium'
                ? 'border-primary bg-blue-50'
                : 'border-gray-200 bg-white'
            }`}
          >
            <p className={`text-sm font-extrabold ${category === 'premium' ? 'text-primary' : 'text-gray-900'}`}>Premium Entry</p>
            <p className={`text-lg font-black mt-1 ${category === 'premium' ? 'text-primary' : 'text-gray-900'}`}>₹10</p>
            {category === 'premium' && <Check size={16} className="mx-auto mt-1 text-primary" />}
          </button>
        </div>

        <div className="bg-gray-900 text-white rounded-2xl p-5 mb-6">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs text-gray-400 font-medium">Number of Entries</span>
            <span className="text-sm font-bold">{entries}</span>
          </div>
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs text-gray-400 font-medium">Price per Entry</span>
            <span className="text-sm font-bold">₹{price}</span>
          </div>
          <div className="border-t border-gray-700 pt-3 flex justify-between items-center">
            <span className="text-sm font-bold">Total Value</span>
            <span className="text-xl font-extrabold text-primary">₹{total}</span>
          </div>
        </div>

        <button
          onClick={handleProceed}
          disabled={loading}
          className="w-full bg-primary text-white font-bold text-sm py-3.5 rounded-xl hover:bg-primary-dark transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
        >
          {loading ? 'PROCESSING...' : 'Proceed to Link User'}
          <ChevronRight size={18} />
        </button>

        <p className="text-center text-[10px] text-gray-400 font-medium mt-6">
          AUTHORIZED GOVERNMENT LOTTERY AGENT PORTAL
        </p>
      </div>

      <BottomNav />
    </MobileLayout>
  );
}
