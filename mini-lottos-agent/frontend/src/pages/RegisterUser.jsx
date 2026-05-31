import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus, Copy, Share2, Download, Fingerprint, Badge, Phone, MapPin, ChevronDown } from 'lucide-react';
import { useToast } from '../components/Toast';
import MobileLayout from '../components/MobileLayout';
import BottomNav from '../components/BottomNav';
import TopHeader from '../components/TopHeader';
import api from '../api/axios';

const DISTRICTS = ['Kochi', 'Trivandrum', 'Calicut', 'Kannur', 'Thrissur', 'Palakkad', 'Kollam'];

export default function RegisterUser() {
  const navigate = useNavigate();
  const toast = useToast();
  const [form, setForm] = useState({ name: '', phone: '', district: '' });
  const [generatedId, setGeneratedId] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!form.name || !form.phone || !form.district) {
      toast('Please fill all fields');
      return;
    }
    if (form.phone.length !== 10) {
      toast('Phone number must be 10 digits');
      return;
    }
    setLoading(true);
    try {
      const res = await api.post('/users/register', form);
      const userId = res.data?.user?.userIdCode || res.data?.userIdCode || res.data?.user?._id;
      if (!userId) {
        toast('User created but ID not returned');
        return;
      }
      setGeneratedId(userId);
      toast('User registered successfully!');
    } catch (err) {
      toast(err.response?.data?.message || 'Failed to register user');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (generatedId) {
      navigator.clipboard.writeText(generatedId);
      toast('User ID copied to clipboard!');
    }
  };

  const handleShare = async () => {
    if (navigator.share && generatedId) {
      try {
        await navigator.share({ title: 'Mini Lottos User ID', text: `Your new Mini Lottos User ID: ${generatedId}` });
      } catch (e) {}
    } else {
      handleCopy();
    }
  };

  return (
    <MobileLayout>
      <TopHeader title="Register New Player" showBack showAvatar={false} showLocation={false} />

      <div className="px-4 py-6">
        <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto">
          <UserPlus className="text-blue-600" size={36} />
        </div>
        <h2 className="text-2xl font-bold text-center mt-4">Create Player Account</h2>
        <p className="text-gray-500 text-center mt-2 px-4">Enter the player's details to authorize their mobile application access.</p>

        <div className="mt-8 space-y-5">
          <Field icon={Badge} label="FULL NAME" value={form.name} onChange={v => setForm({ ...form, name: v })} placeholder="Legal full name" />
          <Field icon={Phone} label="PHONE NUMBER" value={form.phone} onChange={v => setForm({ ...form, phone: v.replace(/\D/g, '').slice(0, 10) })} placeholder="10-digit mobile number" maxLength={10} />

          <div>
            <label className="text-xs uppercase tracking-wider font-bold text-gray-600 mb-2 block">DISTRICT</label>
            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <select
                value={form.district}
                onChange={e => setForm({ ...form, district: e.target.value })}
                className="w-full pl-12 pr-10 py-4 bg-white border border-gray-200 rounded-2xl outline-none focus:border-blue-600 appearance-none"
              >
                <option value="">Select District</option>
                {DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
            </div>
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <Fingerprint size={20} />
          {loading ? 'Generating...' : 'Generate User ID'}
        </button>

        {generatedId && (
          <div className="mt-6 border-2 border-dashed border-blue-300 bg-blue-50 rounded-2xl p-6 text-center">
            <p className="text-xs uppercase tracking-wider text-gray-600 font-bold">GENERATED USER ID</p>
            <p className="text-3xl font-extrabold text-blue-600 tracking-widest mt-3 font-mono">{generatedId}</p>
            <div className="flex gap-3 justify-center mt-5">
              <button onClick={handleCopy} className="flex-1 bg-white border border-blue-300 text-blue-600 py-3 rounded-xl font-bold flex items-center justify-center gap-2">
                <Copy size={16} /> Copy
              </button>
              <button onClick={handleShare} className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2">
                <Share2 size={16} /> Share
              </button>
            </div>
          </div>
        )}

        {generatedId && (
          <button className="w-full mt-4 border-2 border-blue-600 text-blue-600 py-4 rounded-2xl font-bold flex items-center justify-center gap-2">
            <Download size={18} /> Install User App
          </button>
        )}
      </div>

      <BottomNav />
    </MobileLayout>
  );
}

function Field({ icon: Icon, label, value, onChange, placeholder, maxLength }) {
  return (
    <div>
      <label className="text-xs uppercase tracking-wider font-bold text-gray-600 mb-2 block">{label}</label>
      <div className="relative">
        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          maxLength={maxLength}
          className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl outline-none focus:border-blue-600"
        />
      </div>
    </div>
  );
}
