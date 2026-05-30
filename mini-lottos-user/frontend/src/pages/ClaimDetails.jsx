import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Phone, MapPin, User, Check } from 'lucide-react';
import MobileLayout from '../components/MobileLayout';
import { useToast } from '../components/Toast';
import api from '../api/axios';

export default function ClaimDetails() {
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
          agent: { name: 'Sunil Kumar', phone: '+91 9876543210', location: 'Kochi, Kerala' },
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
      <div className="px-5 pt-4">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-xl">
            <ArrowLeft size={24} className="text-gray-700" />
          </button>
          <h1 className="text-lg font-bold text-gray-800">Claim Details</h1>
        </div>

        <div className="bg-gradient-to-r from-yellow-400 to-green-500 rounded-2xl p-6 shadow-lg mb-6">
          <p className="text-white/80 text-sm font-medium mb-1">Prize Amount</p>
          <p className="text-4xl font-extrabold text-white">₹{ticket.prize?.toLocaleString('en-IN') || '0'}</p>
          <p className="text-white/70 text-xs mt-2">{ticket.gameName} • #{ticket._id?.slice(-6) || '000000'}</p>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center">
              <User size={28} className="text-orange-500" />
            </div>
            <div>
              <p className="font-bold text-gray-800">{ticket.agent?.name || 'Agent Name'}</p>
              <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                <MapPin size={12} />
                <span>{ticket.agent?.location || 'Location'}</span>
              </div>
            </div>
          </div>
          <a
            href={`tel:${ticket.agent?.phone || ''}`}
            className="w-full flex items-center justify-center gap-2 bg-green-500 text-white font-bold py-3 rounded-xl hover:bg-green-600 transition-colors shadow-md"
          >
            <Phone size={18} /> Call Agent
          </a>
        </div>

        <h3 className="font-bold text-gray-800 mb-4">Steps to Claim Prize</h3>
        <div className="space-y-4 mb-8">
          {[
            { step: 1, title: 'Contact Agent', desc: 'Call your assigned agent using the button above.' },
            { step: 2, title: 'Visit Collection Point', desc: 'Visit the agent with your ticket and valid ID proof.' },
            { step: 3, title: 'Collect Prize', desc: 'Sign the collection form and receive your prize amount.' },
          ].map((item) => (
            <div key={item.step} className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-orange-600 font-bold text-sm">{item.step}</span>
              </div>
              <div>
                <p className="font-semibold text-gray-800">{item.title}</p>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MobileLayout>
  );
}
