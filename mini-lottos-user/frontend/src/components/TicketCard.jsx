import { Clock, Award } from 'lucide-react';
import NumberBall from './NumberBall';

const statusGradients = {
  active: 'from-orange-400 to-amber-500',
  won: 'from-yellow-400 to-green-500',
  lost: 'from-gray-400 to-gray-500',
  pending: 'from-gray-300 to-gray-400',
};

const statusColors = {
  active: 'bg-orange-100 text-orange-600',
  won: 'bg-green-100 text-green-600',
  lost: 'bg-gray-100 text-gray-500',
  pending: 'bg-yellow-100 text-yellow-600',
};

export default function TicketCard({ ticket, onClick }) {
  const status = ticket.status || 'active';
  const numbers = ticket.numbers || [];
  const gradient = statusGradients[status] || statusGradients.active;
  const statusClass = statusColors[status] || statusColors.active;

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 mb-3 cursor-pointer active:scale-[0.98] transition-transform"
    >
      <div className={`bg-gradient-to-r ${gradient} p-4 text-white`}>
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-lg">{ticket.gameName || 'Mini Lottos'}</h3>
            <p className="text-sm opacity-80">{ticket.category || 'Standard'}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusClass}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        </div>
        {ticket.drawDate && (
          <p className="text-xs opacity-70 mt-1">
            Draw: {new Date(ticket.drawDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
          </p>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-3">
          {numbers.map((num, i) => (
            <NumberBall key={i} number={num} filled={status === 'active' || status === 'won'} />
          ))}
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-600">
            {ticket.price ? `₹${ticket.price}` : 'Free'}
          </span>
          <div className="flex items-center gap-2">
            {status === 'won' && ticket.prize && (
              <span className="flex items-center gap-1 text-sm font-bold text-green-600">
                <Award size={14} /> ₹{ticket.prize.toLocaleString('en-IN')}
              </span>
            )}
            {status === 'active' && (
              <span className="text-sm text-orange-500 font-medium">View Details →</span>
            )}
            {status === 'pending' && (
              <span className="flex items-center gap-1 text-sm text-gray-500">
                <Clock size={14} /> Processing
              </span>
            )}
            {status === 'won' && (
              <span className="text-sm text-green-600 font-medium">Claim Prize</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
