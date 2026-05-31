import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import { useAgentAuth } from '../context/AgentAuthContext';
import api from '../api/axios';
import MobileLayout from '../components/MobileLayout';
import BottomNav from '../components/BottomNav';
import TopHeader from '../components/TopHeader';

const DISTRICTS = ['North Central District', 'Kochi', 'Trivandrum', 'Calicut', 'Kannur', 'Thrissur', 'Palakkad', 'Kollam'];

export default function EditAgentProfile() {
  const navigate = useNavigate();
  const { agent, refreshAgent } = useAgentAuth();
  const [form, setForm] = useState({
    name: agent?.name || '',
    email: agent?.email || '',
    phone: agent?.phone || '',
    district: agent?.district || 'North Central District',
    state: agent?.state || 'Kerala',
  });
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.put('/auth/profile', form);
      await refreshAgent();
      alert('Profile updated successfully!');
      navigate('/settings');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  return (
    <MobileLayout>
      <TopHeader title="Edit Profile" showBack showAvatar={false} showLocation={false} />
      <div className="px-4 py-6 space-y-5 pb-32">
        <Field label="Full Name" value={form.name} onChange={v => setForm({...form, name: v})} />
        <Field label="Email" value={form.email} onChange={v => setForm({...form, email: v})} type="email" />
        <Field label="Phone" value={form.phone} onChange={v => setForm({...form, phone: v})} />
        <div>
          <label className="text-xs uppercase tracking-wider font-bold text-gray-600 mb-2 block">District</label>
          <select value={form.district} onChange={e => setForm({...form, district: e.target.value})} className="w-full px-4 py-4 bg-white border border-gray-200 rounded-2xl outline-none focus:border-blue-600">
            {DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>
        <Field label="State" value={form.state} onChange={v => setForm({...form, state: v})} />
        <Field label="Agent ID" value={agent?.agentId || ''} disabled />
      </div>
      <div className="fixed bottom-20 left-1/2 -translate-x-1/2 w-full max-w-[430px] px-4">
        <button onClick={handleSave} disabled={saving} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 disabled:opacity-50">
          <Check size={20} /> {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
      <BottomNav />
    </MobileLayout>
  );
}

function Field({ label, value, onChange, type = 'text', disabled }) {
  return (
    <div>
      <label className="text-xs uppercase tracking-wider font-bold text-gray-600 mb-2 block">{label}</label>
      <input
        type={type}
        value={value}
        disabled={disabled}
        onChange={e => onChange && onChange(e.target.value)}
        className={`w-full px-4 py-4 border border-gray-200 rounded-2xl outline-none focus:border-blue-600 ${disabled ? 'bg-gray-100 text-gray-500' : 'bg-white'}`}
      />
    </div>
  );
}
