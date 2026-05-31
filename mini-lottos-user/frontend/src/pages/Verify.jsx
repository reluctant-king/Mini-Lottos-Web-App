import { useState, useRef, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Ticket, MessageSquare, Lock, Clock } from 'lucide-react';
import MobileLayout from '../components/MobileLayout';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/Toast';

export default function Verify() {
  const [code, setCode] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const phone = searchParams.get('phone') || '';
  const debugOtp = searchParams.get('debug') || '';
  const { verifyOtp, sendOtp } = useAuth();
  const toast = useToast();

  useEffect(() => {
    if (resendTimer > 0) {
      const interval = setInterval(() => setResendTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [resendTimer]);

  useEffect(() => {
    if (debugOtp && debugOtp.length === 4) {
      setCode(debugOtp.split(''));
    }
  }, [debugOtp]);

  const handleChange = (index, value) => {
    if (value && !/^\d+$/.test(value)) return;
    const newCode = [...code];
    newCode[index] = value.slice(-1);
    setCode(newCode);
    if (value && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handleVerify = async () => {
    const otp = code.join('');
    if (otp.length !== 4) {
      toast('Please enter the complete 4-digit code', 'error');
      return;
    }
    setLoading(true);
    try {
      await verifyOtp(phone, otp);
      console.log('%c✅ Login successful!', 'color: green; font-weight: bold; font-size: 14px;');
      toast('Login successful!', 'success');
      navigate('/home', { replace: true });
    } catch (err) {
      toast(err.response?.data?.message || 'Invalid OTP', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResendTimer(30);
    try {
      await sendOtp(phone);
      toast('OTP resent!', 'success');
    } catch (err) {
      toast('Failed to resend', 'error');
    }
  };

  return (
    <MobileLayout>
      <div className="px-4 pt-4">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-xl">
          <ArrowLeft size={24} className="text-gray-700" />
        </button>
      </div>
      <div className="flex flex-col items-center px-6 pt-6">
        <h1 className="text-lg font-bold text-gray-800 mb-2">Mini Lottos</h1>
        <div className="bg-orange-500 rounded-xl w-16 h-16 flex items-center justify-center mb-6 shadow-lg">
          <Ticket size={28} className="text-white" />
        </div>

        <h2 className="text-xl font-bold text-gray-800">Verification Code</h2>
        <p className="text-gray-500 text-sm mt-2 mb-4 text-center">Enter the 4-digit code sent to +91 {phone}</p>

        <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-600 px-3 py-1.5 rounded-full text-xs font-semibold mb-6">
          <MessageSquare size={12} /> Check browser console for OTP
        </div>

        <div className="flex gap-3 mb-8">
          {code.map((digit, i) => (
            <input
              key={i}
              ref={inputRefs[i]}
              type="tel"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              className="w-14 h-14 text-center text-2xl font-bold border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none bg-white transition-colors"
            />
          ))}
        </div>

        <button
          onClick={handleVerify}
          disabled={loading || code.join('').length !== 4}
          className="w-full max-w-sm bg-orange-500 text-white font-bold py-3.5 rounded-xl text-base hover:bg-orange-600 active:scale-[0.98] transition-all disabled:opacity-50 shadow-lg shadow-orange-200 mb-6 flex items-center justify-center gap-2"
        >
          <Lock size={18} /> {loading ? 'Verifying...' : 'Verify & Login'}
        </button>

        <div className="flex items-center gap-2 mb-4">
          <span className="text-sm text-gray-500">Didn't receive code?</span>
          {resendTimer > 0 ? (
            <span className="text-sm font-medium text-gray-400 flex items-center gap-1">
              <Clock size={14} /> Resend in {resendTimer}s
            </span>
          ) : (
            <button onClick={handleResend} className="text-sm font-medium text-orange-500">
              Resend OTP
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 text-gray-400 mt-2">
          <Ticket size={14} />
          <span className="text-xs">Get help via phone</span>
        </div>
      </div>
    </MobileLayout>
  );
}
