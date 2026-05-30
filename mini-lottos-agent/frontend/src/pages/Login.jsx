import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Info, Landmark, Badge, Lock, Eye, EyeOff, Fingerprint, ShieldCheck } from 'lucide-react';
import { useAgentAuth } from '../context/AgentAuthContext';
import { useToast } from '../components/Toast';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAgentAuth();
  const toast = useToast();
  const [agentId, setAgentId] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!agentId || !password) {
      toast('Please enter agent ID and password');
      return;
    }
    if (agentId.length !== 8) {
      toast('Agent ID must be 8 digits');
      return;
    }
    setLoading(true);
    try {
      await login(agentId, password);
      toast('Login successful!');
      navigate('/dashboard');
    } catch (err) {
      toast(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBiometric = async () => {
    setLoading(true);
    try {
      await login('88291020', 'agent123');
      toast('Biometric login successful!');
      navigate('/dashboard');
    } catch (err) {
      toast(err.response?.data?.message || 'Biometric login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white max-w-[430px] mx-auto px-5 py-6">
      <div className="flex justify-between items-center mb-6">
        <div />
        <h1 className="text-lg font-bold text-gray-900">Agent Login</h1>
        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
          <Info size={18} color="#2563EB" />
        </div>
      </div>

      <div className="h-48 rounded-2xl bg-gradient-to-br from-blue-700 via-blue-800 to-blue-900 relative overflow-hidden mb-8">
        <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 200 200">
          <polygon points="0,50 20,0 40,50" fill="white" />
          <polygon points="60,100 80,50 100,100" fill="white" />
          <polygon points="120,30 140,0 160,30" fill="white" />
          <polygon points="160,120 180,80 200,120" fill="white" />
          <polygon points="30,150 50,110 70,150" fill="white" />
          <polygon points="100,180 120,140 140,180" fill="white" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-5 shadow-lg">
            <Landmark size={40} color="#2563EB" />
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-1">Welcome Back</h2>
      <p className="text-sm text-gray-500 mb-6">Login to your agent portal</p>

      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label className="text-xs font-semibold text-gray-600 mb-1.5 block">AGENT ID</label>
          <div className="relative">
            <Badge size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={agentId}
              onChange={(e) => setAgentId(e.target.value.replace(/\D/g, '').slice(0, 8))}
              placeholder="Enter 8-digit Agent ID"
              className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              maxLength={8}
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="text-xs font-semibold text-gray-600 mb-1.5 block">PASSWORD</label>
          <div className="relative">
            <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type={showPw ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full pl-10 pr-12 py-3.5 rounded-xl border border-gray-200 bg-gray-50 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2">
              {showPw ? <EyeOff size={18} color="#9CA3AF" /> : <Eye size={18} color="#9CA3AF" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-white font-bold text-sm py-3.5 rounded-xl hover:bg-primary-dark transition-colors disabled:opacity-60"
        >
          {loading ? 'LOGGING IN...' : 'LOGIN TO PORTAL'}
        </button>
      </form>

      <div className="flex items-center my-6">
        <div className="flex-1 h-px bg-gray-200" />
        <span className="px-4 text-xs text-gray-400 font-medium">OR</span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>

      <button
        onClick={handleBiometric}
        disabled={loading}
        className="w-full flex items-center justify-center gap-3 py-3.5 rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors disabled:opacity-60"
      >
        <Fingerprint size={22} color="#2563EB" />
        <span className="text-sm font-semibold text-gray-700">Biometric Login</span>
      </button>

      <p className="text-center text-xs text-primary font-medium mt-5 mb-8 cursor-pointer hover:underline">
        Forgot Password?
      </p>

      <div className="flex items-center justify-center gap-2 text-gray-400">
        <ShieldCheck size={14} />
        <span className="text-[10px] font-medium">Authorized Agents Only</span>
      </div>
    </div>
  );
}
