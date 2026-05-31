import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Ticket, ChevronRight } from 'lucide-react';
import { useToast } from '../components/Toast';
import MobileLayout from '../components/MobileLayout';
import BottomNav from '../components/BottomNav';
import TopHeader from '../components/TopHeader';
import Loader from '../components/Loader';
import api from '../api/axios';

const filters = ['All', 'Active', 'Completed', 'Winners'];

const statusColors = {
  active: 'bg-green-100 text-green-700',
  completed: 'bg-gray-100 text-gray-600',
  winner: 'bg-amber-100 text-amber-700',
};

export default function TicketRecords() {
  const navigate = useNavigate();
  const toast = useToast();
  const [activeFilter, setActiveFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true);
      try {
        const status = activeFilter === 'All' ? '' : activeFilter.toLowerCase();
        const res = await api.get(`/tickets?status=${status}`);
        setTickets(res.data.tickets || res.data || []);
      } catch {
        setTickets([]);
        toast('Failed to load tickets');
      } finally {
        setLoading(false);
      }
    };
    fetchTickets();
  }, [activeFilter]);

  const filteredTickets = tickets.filter((t) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      (t.ticketNumber || '').toLowerCase().includes(q) ||
      (t.userId || t.user?.id || '').toLowerCase().includes(q)
    );
  });

  return (
    <MobileLayout>
      <TopHeader title="Ticket Records" showBack showAvatar={false} showLocation={false} />

      <div className="px-5 pt-5 pb-4">
        <div className="relative mb-4">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by ticket or user ID"
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${
                activeFilter === f
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {loading ? (
          <Loader />
        ) : filteredTickets.length === 0 ? (
          <div className="bg-gray-50 rounded-2xl p-8 text-center">
            <Ticket size={40} color="#9CA3AF" className="mx-auto mb-3" />
            <p className="text-sm text-gray-400 font-medium">No tickets found</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredTickets.map((ticket) => {
              const status = (ticket.status || 'active').toLowerCase();
              const statusColor = statusColors[status] || 'bg-gray-100 text-gray-600';
              return (
                <div key={ticket.id || ticket._id} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Ticket size={16} color="#2563EB" />
                      <span className="text-sm font-bold text-gray-900">{ticket.ticketNumber || 'TKT-000'}</span>
                    </div>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${statusColor}`}>
                      {(ticket.status || 'Active').toUpperCase()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-[10px] text-gray-500 space-y-0.5">
                      <p className="font-medium">User: {ticket.userId?.name || ticket.user?.name || ticket.userPhone || 'N/A'}</p>
                      <p className="font-medium">Category: {ticket.category || 'Mini Lotto'}</p>
                    </div>
                    <button
                      onClick={() => navigate(`/tickets/${ticket._id || ticket.id}`)}
                      className="flex items-center gap-1 text-primary text-[10px] font-bold"
                    >
                      View Details <ChevronRight size={12} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <BottomNav />
    </MobileLayout>
  );
}
