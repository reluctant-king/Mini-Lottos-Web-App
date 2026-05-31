import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Mail, MapPin, Globe, Calendar, Phone } from 'lucide-react';
import MobileLayout from '../components/MobileLayout';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

export default function EditProfile() {
  const navigate = useNavigate();
  const { user, refreshUser } = useAuth();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    district: '',
    state: '',
    dob: '',
    gender: '',
  });

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || '',
        email: user.email || '',
        district: user.district || '',
        state: user.state || '',
        dob: user.dob ? (typeof user.dob === 'string' ? user.dob : user.dob.split('T')[0]) : '',
        gender: user.gender || '',
      });
    }
  }, [user]);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.put('/auth/profile', {
        name: form.name,
        email: form.email,
        district: form.district,
        state: form.state,
        dob: form.dob || null,
        gender: form.gender,
      });

      await refreshUser();

      alert('✅ Profile updated successfully!');
      navigate('/profile');
    } catch (err) {
      console.error('Save error:', err);
      alert('❌ Failed to update profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <MobileLayout>
      <div className="px-5 pt-4">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-xl">
            <ArrowLeft size={24} className="text-gray-700" />
          </button>
          <h1 className="text-lg font-bold text-gray-800">Edit Profile</h1>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-gray-500 mb-1.5 block">
              <User size={14} className="inline mr-1" />Full Name
            </label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Enter your name"
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition-all"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-500 mb-1.5 block">
              <Mail size={14} className="inline mr-1" />Email
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition-all"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-500 mb-1.5 block">
              <Phone size={14} className="inline mr-1" />Phone
            </label>
            <input
              type="tel"
              value={user?.phone || ''}
              disabled
              className="w-full px-4 py-3 rounded-xl bg-gray-100 border border-gray-200 text-gray-500 font-medium cursor-not-allowed"
            />
            <p className="text-[10px] text-gray-400 mt-1">Phone number cannot be changed</p>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-500 mb-1.5 block">
              <MapPin size={14} className="inline mr-1" />District
            </label>
            <input
              type="text"
              value={form.district}
              onChange={(e) => handleChange('district', e.target.value)}
              placeholder="Enter your district"
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition-all"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-500 mb-1.5 block">
              <Globe size={14} className="inline mr-1" />State
            </label>
            <input
              type="text"
              value={form.state}
              onChange={(e) => handleChange('state', e.target.value)}
              placeholder="Enter your state"
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition-all"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-500 mb-1.5 block">
              <Calendar size={14} className="inline mr-1" />Date of Birth
            </label>
            <input
              type="date"
              value={form.dob}
              onChange={(e) => handleChange('dob', e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-400 transition-all"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-500 mb-1.5 block">
              <User size={14} className="inline mr-1" />Gender
            </label>
            <div className="flex gap-3">
              {['Male', 'Female', 'Other'].map((option) => (
                <button
                  key={option}
                  onClick={() => handleChange('gender', option)}
                  className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-all border ${
                    form.gender === option
                      ? 'bg-orange-500 text-white border-orange-500 shadow-md'
                      : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-orange-300'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-8 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex-1 bg-gray-100 text-gray-700 font-bold py-3.5 rounded-xl hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex-1 bg-orange-500 text-white font-bold py-3.5 rounded-xl hover:bg-orange-600 transition-colors disabled:opacity-50 shadow-md"
          >
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </MobileLayout>
  );
}
