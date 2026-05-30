import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, UserPlus, Badge, Phone, MapPin, Copy, Share2, Download, Check, ChevronRight, Home, Users, BarChart3, Settings2 } from 'lucide-react';
import { useToast } from '../components/Toast';
import MobileLayout from '../components/MobileLayout';
import BottomNav from '../components/BottomNav';
import api from '../api/axios';

const navTabs = [
  { name: 'Home', path: '/dashboard', icon: Home },
  { name: 'Users', path: '/register-user', icon: Users },
  { name: 'Reports', path: '/reports', icon: BarChart3 },
  { name: 'Settings', path: '/settings', icon: Settings2 },
];

const districts = ['Kochi', 'Trivandrum', 'Calicut', 'Kannur', 'Thrissur', 'Palakkad'];

export default function RegisterUser() {
  const navigate = useNavigate();
  const toast = useToast();
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [district, setDistrict] = useState('');
  const [generating, setGenerating] = useState(false);
  const [generatedUser, setGeneratedUser] = useState(null);

  const handleGenerate = async () => {
    if (!fullName.trim()) { toast('Please enter full name'); return; }
    if (phone.length !== 10) { toast('Phone number must be 10 digits'); return; }
    if (!district) { toast('Please select a district'); return; }
    setGenerating(true);
    try {
      const res = await api.post('/users/register', { name: fullName, phone, district });
      setGeneratedUser(res.data.user || res.data);
      toast('User registered successfully!');
    } catch (err) {
      toast(err.response?.data?.message || 'Failed to register user');
    } finally {
      setGenerating(false);
    }
  };

  const handleCopy = () => {
    if (generatedUser?.userId || generatedUser?.id) {
      navigator.clipboard.writeText(String(generatedUser.userId || generatedUser.id));
      toast('User ID copied!');
    }
  };

  const handleShare = () => {
    toast('Share link copied!');
  };

  return (
    <MobileLayout>
      <div className="px-5 pt-5 pb-4">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => navigate(-1)} className="h-9 w-9 rounded-xl bg-gray-100 flex items-center justify-center">
            <ArrowLeft size={20} color="#374151" />
          </button>
          <h1 className="text-lg font-bold text-gray-900">Register New User</h1>
        </div>

        <div className="flex justify-center mb-6">
          <div className="h-16 w-16 rounded-2xl bg-blue-100 flex items-center justify-center">
            <UserPlus size={32} color="#2563EB" />
          </div>
        </div>

        <p className="text-center text-xl font-bold text-gray-900 mb-6">Register New Player</p>

        <div className="mb-4">
          <label className="text-xs font-semibold text-gray-600 mb-1.5 block">FULL NAME</label>
          <div className="relative">
            <Badge size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter full name"
              className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="text-xs font-semibold text-gray-600 mb-1.5 block">PHONE NUMBER</label>
          <div className="relative">
            <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
              placeholder="Enter 10-digit phone"
              maxLength={10}
              className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="text-xs font-semibold text-gray-600 mb-1.5 block">DISTRICT</label>
          <div className="relative">
            <MapPin size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10" />
            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="w-full pl-10 pr-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 text-sm font-medium appearance-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">Select District</option>
              {districts.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={generating}
          className="w-full bg-primary text-white font-bold text-sm py-3.5 rounded-xl hover:bg-primary-dark transition-colors disabled:opacity-60 flex items-center justify-center gap-2 mb-6"
        >
          {generating ? 'GENERATING...' : 'Generate User ID'}
          {!generating && <ChevronRight size={18} />}
        </button>

        {generatedUser && (
          <div className="border-2 border-dashed border-primary rounded-2xl p-5 mb-6 bg-blue-50/50">
            <p className="text-xs font-bold text-gray-500 mb-2 text-center">GENERATED USER ID</p>
            <p className="text-2xl font-extrabold text-primary text-center mb-4 tracking-wider font-mono">
              {String(generatedUser.userId || generatedUser.id).replace(/(\d{4})(\d{3})/, '$1-$2')}
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleCopy}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-primary text-primary font-semibold text-xs hover:bg-blue-50 transition-colors"
              >
                <Copy size={14} /> Copy
              </button>
              <button
                onClick={handleShare}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-primary text-white font-semibold text-xs hover:bg-primary-dark transition-colors"
              >
                <Share2 size={14} /> Share
              </button>
            </div>
          </div>
        )}

        <button
          onClick={() => toast('Download link copied!')}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl border border-gray-200 text-gray-700 font-semibold text-sm hover:bg-gray-50 transition-colors"
        >
          <Download size={18} /> Install User App
        </button>
      </div>

      <BottomNav active="Users" tabs={navTabs} />
    </MobileLayout>
  );
}
