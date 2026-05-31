import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Ticket, User, Phone, Hash, Calendar, Award } from 'lucide-react';
import MobileLayout from '../components/MobileLayout';
import BottomNav from '../components/BottomNav';
import TopHeader from '../components/TopHeader';
import api from '../api/axios';

export default function TicketDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/tickets/${id}`)
      .then((res) => setTicket(res.data.ticket || res.data))
      .catch(() => setTicket(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <MobileLayout>
        <div className="flex items-center justify-center min-h-screen"><div className="h-10 w-10 border-4 border-gray-200 border-t-primary rounded-full animate-spin" /></div>
      </MobileLayout>
    );
  }

  if (!ticket) {
    return (
      <MobileLayout>
        <TopHeader title="Ticket Details" showBack showAvatar={false} showLocation={false} />
        <div className="p-6 text-center">
          <p className="text-gray-500">Ticket not found</p>
          <button onClick={() => navigate('/tickets')} className="text-primary mt-2 font-medium">Go back</button>
        </div>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout>
      <TopHeader title="Ticket Details" showBack showAvatar={false} showLocation={false} />

      <div className="px-5 pt-5 pb-4">
        <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-5 mb-6 text-white">
          <div className="flex items-center justify-between mb-3">
            <Ticket size={24} />
            <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-bold uppercase">{ticket.status}</span>
          </div>
          <p className="text-2xl font-extrabold">{ticket.ticketNumber || 'N/A'}</p>
          <p className="text-blue-200 text-sm mt-1">{ticket.category || 'Mini Lotto'}</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-6">
          <div className="divide-y divide-gray-100">
            <div className="px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <User size={16} color="#6B7280" />
                <span className="text-sm font-medium text-gray-500">User</span>
              </div>
              <span className="text-sm font-bold text-gray-900">{ticket.userId?.name || ticket.userPhone || 'N/A'}</span>
            </div>
            <div className="px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Phone size={16} color="#6B7280" />
                <span className="text-sm font-medium text-gray-500">Phone</span>
              </div>
              <span className="text-sm font-bold text-gray-900">{ticket.userId?.phone || ticket.userPhone || 'N/A'}</span>
            </div>
            <div className="px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Hash size={16} color="#6B7280" />
                <span className="text-sm font-medium text-gray-500">Numbers</span>
              </div>
              <span className="text-sm font-bold text-gray-900">{(ticket.numbers || []).join(', ') || 'N/A'}</span>
            </div>
            <div className="px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Calendar size={16} color="#6B7280" />
                <span className="text-sm font-medium text-gray-500">Draw Date</span>
              </div>
              <span className="text-sm font-bold text-gray-900">{ticket.drawDate ? new Date(ticket.drawDate).toLocaleDateString() : 'N/A'}</span>
            </div>
            <div className="px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Award size={16} color="#6B7280" />
                <span className="text-sm font-medium text-gray-500">Prize</span>
              </div>
              <span className="text-sm font-bold text-gray-900">{ticket.prize ? `₹${ticket.prize.toLocaleString()}` : '—'}</span>
            </div>
          </div>
        </div>

        <button onClick={() => navigate('/tickets')} className="w-full py-3.5 rounded-xl border border-gray-200 text-gray-700 font-semibold text-sm hover:bg-gray-50 transition-colors">
          Back to Tickets
        </button>
      </div>

      <BottomNav />
    </MobileLayout>
  );
}
