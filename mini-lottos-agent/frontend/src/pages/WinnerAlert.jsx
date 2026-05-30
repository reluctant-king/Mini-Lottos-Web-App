import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Trophy, CheckCircle, Clock, User, Phone, Check, Home, Users, BarChart3, Settings2 } from 'lucide-react';
import { useToast } from '../components/Toast';
import MobileLayout from '../components/MobileLayout';
import BottomNav from '../components/BottomNav';
import api from '../api/axios';

const navTabs = [
  { name: 'Home', path: '/dashboard', icon: Home },
  { name: 'Users', path: '/register-user', icon: Users },
  { name: 'Reports', path: '/reports', icon: BarChart3 },
  { name: 'Settings', path: '/settings', icon: Settings2 },
];

export default function WinnerAlert() {
  const navigate = useNavigate();
  const { id } = useParams();
  const toast = useToast();
  const [contacted, setContacted] = useState(false);

  const handleCall = () => {
    window.location.href = 'tel:+919999999999';
  };

  const handleMarkContacted = async () => {
    try {
      await Promise.all([
        api.put(`/alerts/winners/${id}/read`),
        api.post(`/tickets/${id}/contacted`),
      ]);
      setContacted(true);
      toast('Marked as contacted!');
    } catch (err) {
      toast(err.response?.data?.message || 'Failed to update status');
    }
  };

  return (
    <MobileLayout>
      <div className="px-5 pt-5 pb-4">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => navigate(-1)} className="h-9 w-9 rounded-xl bg-gray-100 flex items-center justify-center">
            <ArrowLeft size={20} color="#374151" />
          </button>
          <h1 className="text-lg font-bold text-gray-900">Winning Ticket Alert</h1>
        </div>

        <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-6 mb-6 text-white text-center">
          <div className="h-16 w-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3">
            <Trophy size={36} color="white" />
          </div>
          <p className="text-xl font-extrabold">Winning Ticket Found!</p>
          <p className="text-xs text-blue-200 mt-2 max-w-xs mx-auto">
            A winning ticket has been verified. Please contact the user immediately.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-6">
          <div className="bg-primary px-5 py-3">
            <p className="text-white text-xs font-bold tracking-wider">CONFIRMED PRIZE</p>
          </div>
          <div className="p-5 text-center">
            <p className="text-4xl font-black text-gray-900 mb-2">₹50,00,000</p>
            <div className="flex items-center justify-center gap-2">
              <Clock size={14} color="#D97706" />
              <span className="px-3 py-1 bg-orange-100 text-orange-700 text-[10px] font-bold rounded-full">
                CONTACT PENDING
              </span>
            </div>
          </div>
        </div>

        <p className="text-xs font-semibold text-gray-500 mb-3 tracking-wide">TICKET INFORMATION</p>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-6">
          <div className="divide-y divide-gray-100">
            <div className="px-5 py-4 flex items-center justify-between">
              <span className="text-sm font-medium text-gray-500">Ticket Number</span>
              <span className="text-sm font-bold text-gray-900">ML-2024-{id || 'XXXX'}</span>
            </div>
            <div className="px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <User size={16} color="#6B7280" />
                <span className="text-sm font-medium text-gray-500">Winner Name</span>
              </div>
              <span className="text-sm font-bold text-gray-900">Rahul Menon</span>
            </div>
            <div className="px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Phone size={16} color="#6B7280" />
                <span className="text-sm font-medium text-gray-500">Phone Number</span>
              </div>
              <span className="text-sm font-bold text-gray-900">+91 99999 99999</span>
            </div>
          </div>
        </div>

        <button
          onClick={handleCall}
          className="w-full bg-primary text-white font-bold text-sm py-3.5 rounded-xl hover:bg-primary-dark transition-colors flex items-center justify-center gap-2 mb-3"
        >
          <Phone size={18} /> Call User
        </button>

        <button
          onClick={handleMarkContacted}
          disabled={contacted}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl border-2 border-primary text-primary font-bold text-sm hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {contacted ? (
            <>
              <CheckCircle size={18} /> Contacted
            </>
          ) : (
            <>
              <Check size={18} /> Mark as Contacted
            </>
          )}
        </button>
      </div>

      <BottomNav active="Users" tabs={navTabs} />
    </MobileLayout>
  );
}
