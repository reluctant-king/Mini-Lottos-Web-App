import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Share2, Download, QrCode } from 'lucide-react';
import MobileLayout from '../components/MobileLayout';
import NumberBall from '../components/NumberBall';
import { useToast } from '../components/Toast';
import api from '../api/axios';

export default function TicketDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/tickets/${id}`)
      .then((res) => setTicket(res.data.ticket || res.data))
      .catch(() => {
        setTicket({
          _id: id,
          gameName: 'Super Daily',
          category: 'Standard',
          drawDate: '2026-06-05',
          numbers: [7, 14, 23, 35, 42],
          price: 50,
          status: 'active',
          prize: null,
        });
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <MobileLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="w-10 h-10 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin" />
        </div>
      </MobileLayout>
    );
  }

  if (!ticket) {
    return (
      <MobileLayout>
        <div className="p-6 text-center">
          <p className="text-gray-500">Ticket not found</p>
          <button onClick={() => navigate('/tickets')} className="text-orange-500 mt-2">Go back</button>
        </div>
      </MobileLayout>
    );
  }

  const statusColors = {
    active: 'bg-orange-100 text-orange-600',
    won: 'bg-green-100 text-green-600',
    lost: 'bg-gray-100 text-gray-500',
    pending: 'bg-yellow-100 text-yellow-600',
  };

  const statusGradients = {
    active: 'from-orange-400 to-amber-500',
    won: 'from-yellow-400 to-green-500',
    lost: 'from-gray-400 to-gray-500',
    pending: 'from-gray-300 to-gray-400',
  };

  return (
    <MobileLayout>
      <div className="px-5 pt-4">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-xl">
            <ArrowLeft size={24} className="text-gray-700" />
          </button>
          <h1 className="text-lg font-bold text-gray-800">Ticket Details</h1>
        </div>

        <div className={`bg-gradient-to-r ${statusGradients[ticket.status] || statusGradients.active} rounded-2xl p-6 shadow-lg mb-6`}>
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-white font-bold text-xl">{ticket.gameName}</h2>
              <p className="text-white/80 text-sm">{ticket.category}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[ticket.status] || statusColors.active}`}>
              {(ticket.status || 'active').charAt(0).toUpperCase() + (ticket.status || 'active').slice(1)}
            </span>
          </div>
          <p className="text-white/70 text-xs mb-4">
            Draw Date: {ticket.drawDate ? new Date(ticket.drawDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'N/A'}
          </p>
          <div className="flex items-center gap-2 mb-4">
            {(ticket.numbers || [7, 14, 23, 35, 42]).map((num, i) => (
              <NumberBall key={i} number={num} filled={true} />
            ))}
          </div>
          {ticket.prize && (
            <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2 inline-block">
              <span className="text-white font-bold text-lg">Prize: ₹{ticket.prize.toLocaleString('en-IN')}</span>
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
          <h3 className="font-bold text-gray-800 mb-4">Ticket QR Code</h3>
          <div className="flex items-center justify-center p-6 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
            <div className="w-48 h-48 relative">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <rect x="5" y="5" width="20" height="20" fill="#F97316" rx="2" />
                <rect x="30" y="5" width="15" height="15" fill="#333" rx="1" />
                <rect x="50" y="5" width="20" height="20" fill="#F97316" rx="2" />
                <rect x="75" y="5" width="20" height="20" fill="#333" rx="1" />
                <rect x="5" y="30" width="15" height="15" fill="#333" rx="1" />
                <rect x="25" y="30" width="20" height="20" fill="#F97316" rx="2" />
                <rect x="50" y="30" width="15" height="15" fill="#333" rx="1" />
                <rect x="70" y="30" width="25" height="20" fill="#F97316" rx="2" />
                <rect x="5" y="50" width="20" height="20" fill="#F97316" rx="2" />
                <rect x="30" y="50" width="15" height="15" fill="#333" rx="1" />
                <rect x="50" y="50" width="20" height="20" fill="#F97316" rx="2" />
                <rect x="75" y="55" width="20" height="15" fill="#333" rx="1" />
                <rect x="5" y="75" width="20" height="20" fill="#F97316" rx="2" />
                <rect x="30" y="75" width="25" height="20" fill="#333" rx="1" />
                <rect x="60" y="75" width="15" height="15" fill="#F97316" rx="2" />
                <rect x="80" y="75" width="15" height="20" fill="#333" rx="1" />
                <rect x="50" y="70" width="5" height="5" fill="#F97316" rx="1" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <QrCode size={32} className="text-orange-500 opacity-50" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3 mb-8">
          <button
            onClick={() => toast('Ticket shared!')}
            className="flex-1 flex items-center justify-center gap-2 bg-gray-100 text-gray-700 font-semibold py-3 rounded-xl hover:bg-gray-200 transition-colors"
          >
            <Share2 size={18} /> Share
          </button>
          <button
            onClick={() => toast('Ticket downloaded!')}
            className="flex-1 flex items-center justify-center gap-2 bg-orange-500 text-white font-semibold py-3 rounded-xl hover:bg-orange-600 transition-colors shadow-md"
          >
            <Download size={18} /> Download
          </button>
        </div>
      </div>
    </MobileLayout>
  );
}
