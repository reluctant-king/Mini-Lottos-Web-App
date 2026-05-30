import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Trophy, Phone } from 'lucide-react';
import MobileLayout from '../components/MobileLayout';
import NumberBall from '../components/NumberBall';
import { useToast } from '../components/Toast';
import api from '../api/axios';

export default function Winning() {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    api.get(`/tickets/${id}`)
      .then((res) => setTicket(res.data.ticket || res.data))
      .catch(() => {
        setTicket({
          _id: id,
          gameName: 'Super Daily',
          category: 'Standard',
          drawDate: '2026-06-01',
          numbers: [7, 14, 23, 35, 42],
          price: 50,
          status: 'won',
          prize: 50000,
        });
      });
  }, [id]);

  if (!ticket) {
    return (
      <MobileLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="w-10 h-10 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin" />
        </div>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout>
      <div className="px-4 pt-4">
        <button onClick={() => navigate('/tickets')} className="p-2 hover:bg-gray-100 rounded-xl">
          <ArrowLeft size={24} className="text-gray-700" />
        </button>
      </div>

      <div className="mx-5 mt-2 bg-gradient-to-b from-gray-900 to-orange-900 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-yellow-500/10 rounded-full" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-orange-500/10 rounded-full" />
        <div className="flex flex-col items-center relative z-10">
          <span className="text-6xl mb-4">🎉</span>
          <h1 className="text-5xl font-extrabold text-orange-400 mb-6">Congratulations!</h1>
          <div className="bg-yellow-400 rounded-2xl px-8 py-4 w-full text-center shadow-lg">
            <p className="text-yellow-900 text-sm font-medium">TOTAL WINNINGS</p>
            <p className="text-4xl font-extrabold text-yellow-900">₹{ticket.prize?.toLocaleString('en-IN') || '0'}</p>
          </div>
        </div>
      </div>

      <div className="mx-5 mt-6 bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
        <h3 className="font-bold text-gray-800 mb-3">Ticket Information</h3>
        <div className="flex items-center gap-2 mb-3">
          {(ticket.numbers || []).map((num, i) => (
            <NumberBall key={i} number={num} filled={true} />
          ))}
        </div>
        <div className="text-sm text-gray-600 space-y-1">
          <p><span className="font-medium text-gray-800">Game:</span> {ticket.gameName}</p>
          <p><span className="font-medium text-gray-800">Ticket ID:</span> #{ticket._id?.slice(-6) || '000000'}</p>
          <p><span className="font-medium text-gray-800">Draw Date:</span> {ticket.drawDate ? new Date(ticket.drawDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'N/A'}</p>
          <p><span className="font-medium text-gray-800">Price:</span> ₹{ticket.price || 0}</p>
        </div>
      </div>

      <div className="px-5 mt-6 space-y-3 pb-8">
        <button
          onClick={() => navigate(`/winning/${id}/claim`)}
          className="w-full flex items-center justify-center gap-2 bg-orange-500 text-white font-bold py-3.5 rounded-xl hover:bg-orange-600 transition-colors shadow-lg shadow-orange-200"
        >
          <Trophy size={20} /> View Details
        </button>
        <button
          onClick={() => toast('Contacting your agent...')}
          className="w-full flex items-center justify-center gap-2 border-2 border-orange-500 text-orange-500 font-bold py-3.5 rounded-xl hover:bg-orange-50 transition-colors"
        >
          <Phone size={20} /> Contact Agent
        </button>
      </div>
    </MobileLayout>
  );
}
