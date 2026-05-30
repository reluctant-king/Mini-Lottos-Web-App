import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Zap, Check, Ticket } from 'lucide-react';
import { useToast } from '../components/Toast';
import MobileLayout from '../components/MobileLayout';
import api from '../api/axios';

export default function ScanTicket() {
  const navigate = useNavigate();
  const toast = useToast();
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState(null);

  const handleSimulateScan = async () => {
    setScanning(true);
    try {
      const res = await api.post('/tickets/scan', { qrData: 'SIMULATED_SCAN' });
      setResult(res.data.ticket || res.data);
      toast('Ticket scanned successfully!');
    } catch (err) {
      toast(err.response?.data?.message || 'Invalid ticket');
      setResult(null);
    } finally {
      setScanning(false);
    }
  };

  const handleContinue = () => {
    if (!result) return;
    if (result.isWinner || result.status === 'winner') {
      navigate(`/winner-alert/${result.id || result._id}`);
    } else {
      navigate('/tickets');
    }
  };

  return (
    <MobileLayout>
      <div className="px-5 pt-5 pb-4">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => navigate(-1)} className="h-9 w-9 rounded-xl bg-gray-100 flex items-center justify-center">
            <ArrowLeft size={20} color="#374151" />
          </button>
          <h1 className="text-lg font-bold text-gray-900">Scan Ticket</h1>
        </div>

        <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center relative mb-4 overflow-hidden">
          <div className="relative w-64 h-64">
            <div className="absolute top-0 left-0 w-10 h-10 border-l-4 border-t-4 border-primary rounded-tl" />
            <div className="absolute top-0 right-0 w-10 h-10 border-r-4 border-t-4 border-primary rounded-tr" />
            <div className="absolute bottom-0 left-0 w-10 h-10 border-l-4 border-b-4 border-primary rounded-bl" />
            <div className="absolute bottom-0 right-0 w-10 h-10 border-r-4 border-b-4 border-primary rounded-br" />
            <div className="absolute inset-4 flex items-center justify-center">
              <div className="h-px w-full bg-primary/40 animate-pulse" />
            </div>
          </div>
          <button className="absolute bottom-4 right-4 h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center shadow-lg">
            <Zap size={20} color="white" />
          </button>
        </div>

        <p className="text-center text-sm text-gray-500 font-medium mb-6">
          Place the ticket QR code inside the frame
        </p>

        <button
          onClick={handleSimulateScan}
          disabled={scanning}
          className="w-full bg-primary text-white font-bold text-sm py-3.5 rounded-xl hover:bg-primary-dark transition-colors disabled:opacity-60 mb-4"
        >
          {scanning ? 'SCANNING...' : 'SIMULATE SCAN'}
        </button>

        {result && (
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm mb-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Ticket size={20} color="#2563EB" />
                <span className="font-bold text-gray-900">{result.ticketNumber || 'TICKET-001'}</span>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-700 text-[10px] font-bold rounded-full flex items-center gap-1">
                <Check size={12} /> VALID
              </span>
            </div>
            <div className="text-sm text-gray-600 space-y-1">
              <p><span className="font-medium">Category:</span> {result.category || 'Mini Lotto'}</p>
              <p><span className="font-medium">Entries:</span> {result.entries || 1}</p>
              <p><span className="font-medium">Amount:</span> ₹{result.amount || result.price || 0}</p>
            </div>
          </div>
        )}

        {result && (
          <button
            onClick={handleContinue}
            className="w-full bg-gray-900 text-white font-bold text-sm py-3.5 rounded-xl hover:bg-gray-800 transition-colors mb-3"
          >
            Continue Processing &gt;
          </button>
        )}

        <p className="text-center text-xs text-primary font-medium cursor-pointer hover:underline">
          Enter Code Manually
        </p>
      </div>
    </MobileLayout>
  );
}
