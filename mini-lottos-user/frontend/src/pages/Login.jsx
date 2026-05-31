import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Ticket, Smartphone, Shield, MessageSquare, Phone, ArrowRight } from 'lucide-react';
import MobileLayout from '../components/MobileLayout';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/Toast';
import api from '../api/axios';

export default function Login() {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [otpInfo, setOtpInfo] = useState(null);
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
      const { data } = await api.post('/auth/send-otp', { phone });

      if (data.debugOtp) {
        console.log(
          `%c📱 OTP RECEIVED %c\n\n` +
          `📞 Phone: ${phone}\n` +
          `🔐 OTP Code: ${data.debugOtp}\n` +
          `⏰ Valid for: 5 minutes\n\n` +
          `%c↗ Use this code on the next screen`,
          'background: #F97316; color: white; font-size: 16px; font-weight: bold; padding: 8px 16px; border-radius: 8px;',
          'color: #e6ff08; font-size: 14px; font-family: monospace; line-height: 1.6;',
          'color: #ffffff; font-style: italic; font-size: 12px;'
        );

        console.log(
          `%c╔════════════════════════════╗\n` +
          `║   OTP: ${data.debugOtp}              ║\n` +
          `╚════════════════════════════╝`,
          'color: #46dc24; font-weight: bold; font-family: monospace; font-size: 16px;'
        );

        setOtpInfo({ phone, code: data.debugOtp });
      } else {
        console.log(`📱 OTP sent to ${phone}. Check backend terminal.`);
      }

      toast('OTP sent successfully!', 'success');

      setTimeout(() => {
        navigate(`/verify?phone=${phone}&debug=${data.debugOtp || ''}`);
      }, 1500);
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

        {otpInfo && (
          <div className="w-full max-w-sm mb-4 bg-orange-50 border-2 border-orange-300 border-dashed rounded-2xl p-4 animate-pulse">
            <p className="text-xs uppercase tracking-wider text-orange-600 font-bold flex items-center gap-2">
              <MessageSquare size={12} /> DEMO MODE — OTP CODE
            </p>
            <p className="text-3xl font-extrabold text-orange-600 tracking-[0.5em] text-center mt-2 font-mono">
              {otpInfo.code}
            </p>
            <p className="text-xs text-orange-700 text-center mt-1">
              Also visible in browser console (F12)
            </p>
          </div>
        )}

        <form onSubmit={handleSendOtp} className="w-full max-w-sm">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-600 mb-2">Phone Number</label>
            <div className="flex items-center border-2 border-gray-200 rounded-xl px-4 py-3 focus-within:border-orange-400 transition-colors bg-white">
              <Phone size={18} className="text-gray-400 mr-2" />
              <span className="text-gray-500 font-medium mr-1">+91</span>
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
            className="w-full bg-orange-500 text-white font-bold py-3.5 rounded-xl text-base hover:bg-orange-600 active:scale-[0.98] transition-all disabled:opacity-50 shadow-lg shadow-orange-200 flex items-center justify-center gap-2"
          >
            {loading ? 'Sending...' : 'Send OTP'} {!loading && <ArrowRight size={18} />}
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
