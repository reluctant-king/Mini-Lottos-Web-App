import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Ticket, Smartphone, Shield } from 'lucide-react';
import MobileLayout from '../components/MobileLayout';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/Toast';

export default function Login() {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { sendOtp } = useAuth();
  const toast = useToast();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (phone.length !== 10 || !/^\d+$/.test(phone)) {
      toast('Please enter a valid 10-digit phone number', 'error');
      return;
    }
    setLoading(true);
    try {
      await sendOtp(phone);
      toast('OTP sent successfully!', 'success');
      navigate(`/verify?phone=${phone}`);
    } catch (err) {
      toast(err.response?.data?.message || 'Failed to send OTP', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <MobileLayout>
      <div className="flex flex-col items-center min-h-screen px-6 pt-16">
        <div className="bg-orange-500 rounded-xl w-20 h-20 flex items-center justify-center mb-4 shadow-lg">
          <Ticket size={36} className="text-white" />
        </div>
        <h1 className="text-2xl font-bold text-orange-500 mb-2">Mini Lottos</h1>

        <div className="w-64 h-64 rounded-full bg-orange-100 flex items-center justify-center mt-6 mb-8">
          <Smartphone size={80} className="text-orange-300" />
        </div>

        <h2 className="text-xl font-bold text-gray-800 text-center">Welcome to Mini Lottos</h2>
        <p className="text-gray-500 text-center mt-2 mb-8 text-sm">
          Enter your phone number to get started
        </p>

        <form onSubmit={handleSendOtp} className="w-full max-w-sm">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-600 mb-2">Phone Number</label>
            <div className="flex items-center border-2 border-gray-200 rounded-xl px-4 py-3 focus-within:border-orange-400 transition-colors bg-white">
              <span className="text-gray-500 font-medium mr-2">+91</span>
              <input
                type="tel"
                maxLength={10}
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                placeholder="Enter 10-digit number"
                className="flex-1 outline-none text-base bg-transparent"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 text-white font-bold py-3.5 rounded-xl text-base hover:bg-orange-600 active:scale-[0.98] transition-all disabled:opacity-50 shadow-lg shadow-orange-200"
          >
            {loading ? 'Sending...' : 'Send OTP'}
          </button>
        </form>

        <div className="mt-auto mb-8 flex items-center gap-2 text-gray-400">
          <Shield size={14} />
          <span className="text-xs">Terms & Conditions | Privacy Policy</span>
        </div>
      </div>
    </MobileLayout>
  );
}
