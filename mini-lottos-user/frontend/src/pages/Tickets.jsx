import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Ticket, Bell } from 'lucide-react';
import MobileLayout from '../components/MobileLayout';
import BottomNav from '../components/BottomNav';
import TicketCard from '../components/TicketCard';
import Loader from '../components/Loader';
import { useData } from '../context/DataContext';
import { useToast } from '../components/Toast';

export default function Tickets() {
  const [tab, setTab] = useState('active');
  const navigate = useNavigate();
  const { tickets, refreshTickets } = useData();
  const toast = useToast();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    refreshTickets().finally(() => setLoading(false));
  }, [refreshTickets]);

  const filteredTickets = tickets.filter((t) => {
    if (tab === 'active') return t.status === 'active' || t.status === 'pending';
    return t.status === 'won' || t.status === 'lost';
  });

  return (
    <MobileLayout>
      <div className="px-5 pt-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-orange-500 rounded-xl w-10 h-10 flex items-center justify-center shadow-md">
              <Ticket size={20} className="text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-800">My Tickets</h1>
          </div>
          <button
            onClick={() => navigate('/notifications')}
            className="relative p-2 hover:bg-gray-100 rounded-xl"
          >
            <Bell size={22} className="text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>
        </div>

        <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
          <button
            onClick={() => setTab('active')}
            className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all ${
              tab === 'active' ? 'bg-white text-orange-500 shadow-sm' : 'text-gray-500'
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setTab('past')}
            className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all ${
              tab === 'past' ? 'bg-white text-orange-500 shadow-sm' : 'text-gray-500'
            }`}
          >
            Past Draws
          </button>
        </div>

        {loading ? (
          <Loader />
        ) : filteredTickets.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <Ticket size={48} className="text-gray-300 mb-4" />
            <p className="text-gray-400 font-medium">No tickets found</p>
            <p className="text-gray-300 text-sm mt-1">
              {tab === 'active' ? 'Buy a ticket to get started!' : 'No past draws yet'}
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredTickets.map((ticket) => (
              <TicketCard
                key={ticket._id || ticket.id}
                ticket={ticket}
                onClick={() => {
                  if (ticket.status === 'won') {
                    navigate(`/winning/${ticket._id || ticket.id}`);
                  } else {
                    navigate(`/tickets/${ticket._id || ticket.id}`);
                  }
                }}
              />
            ))}
          </div>
        )}
      </div>

      <BottomNav active="My Tickets" badge={true} />
    </MobileLayout>
  );
}
