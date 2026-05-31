import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, UserPlus, ScanLine, ChevronRight } from 'lucide-react';
import { useToast } from '../components/Toast';
import MobileLayout from '../components/MobileLayout';
import BottomNav from '../components/BottomNav';
import TopHeader from '../components/TopHeader';
import api from '../api/axios';

export default function LinkUser() {
  const navigate = useNavigate();
  const toast = useToast();
  const [query, setQuery] = useState('');
  const [searching, setSearching] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) {
      toast('Please enter a search term');
      return;
    }
    setSearching(true);
    try {
      const res = await api.get(`/users/search?q=${encodeURIComponent(query)}`);
      const user = res.data.user || res.data;
      if (!user || !user._id) {
        toast('User not found');
        return;
      }
      const ticketId = localStorage.getItem('pending_ticket_id');
      if (!ticketId) {
        toast('No pending ticket found. Please create an entry first.');
        navigate('/create-entry');
        return;
      }
      const linkRes = await api.post('/tickets/link', { ticketId, userPhone: user.phone });
      localStorage.removeItem('pending_ticket_id');
      toast('Ticket linked successfully!');
      const linked = linkRes.data.ticket || linkRes.data;
      navigate('/linked-success', {
        state: {
          ticketNumber: linked.ticketNumber,
          userName: user.name,
          userPhone: user.phone,
          entries: linked.entries || 1,
          price: linked.price || 5,
        }
      });
    } catch (err) {
      toast(err.response?.data?.message || 'User not found');
    } finally {
      setSearching(false);
    }
  };

  return (
    <MobileLayout>
      <TopHeader title="Link Ticket to User" showBack showAvatar={false} showLocation={false} />

      <div className="px-5 pt-5 pb-4">
        <p className="text-xs font-semibold text-gray-500 mb-3 tracking-wide">SELECT USER TYPE</p>

        <p className="text-[10px] font-bold text-gray-400 mb-3 tracking-widest">STEP 1 — EXISTING USER</p>

        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 mb-4 flex items-center gap-3">
          <div className="h-12 w-20 bg-emerald-100 rounded-xl flex items-center justify-center">
            <div className="w-14 h-8 bg-white rounded border border-emerald-200 flex items-center justify-center">
              <ScanLine size={18} color="#059669" />
            </div>
          </div>
          <div>
            <p className="text-xs font-bold text-emerald-800">Scan User QR</p>
            <p className="text-[10px] text-emerald-600">Point camera at user's app QR</p>
          </div>
        </div>

        <div className="relative mb-4">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by User ID or Phone"
            className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        <button
          onClick={handleSearch}
          disabled={searching}
          className="w-full bg-primary text-white font-bold text-sm py-3.5 rounded-xl hover:bg-primary-dark transition-colors disabled:opacity-60 mb-6"
        >
          {searching ? 'SEARCHING...' : 'Search User'}
        </button>

        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="px-4 text-xs text-gray-400 font-medium">OR</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <p className="text-[10px] font-bold text-gray-400 mb-3 tracking-widest">STEP 2 — NEW USER</p>

        <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-6 mb-4 text-white">
          <div className="h-12 w-12 rounded-xl bg-white/20 flex items-center justify-center mb-3">
            <UserPlus size={24} color="white" />
          </div>
          <p className="font-bold text-base">Register New User</p>
          <p className="text-xs text-blue-200 mt-1">Create a new player account</p>
        </div>

        <button
          onClick={() => navigate('/register-user')}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl border-2 border-primary text-primary font-bold text-sm hover:bg-blue-50 transition-colors"
        >
          Register New User <ChevronRight size={18} />
        </button>
      </div>

      <BottomNav />
    </MobileLayout>
  );
}
