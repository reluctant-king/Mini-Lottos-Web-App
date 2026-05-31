import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, UserPlus, Phone, MapPin, ChevronRight, Users as UsersIcon } from 'lucide-react';
import MobileLayout from '../components/MobileLayout';
import BottomNav from '../components/BottomNav';
import TopHeader from '../components/TopHeader';
import api from '../api/axios';

export default function UsersList() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await api.get('/users/list');
      setUsers(res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = users.filter(u =>
    u.name?.toLowerCase().includes(query.toLowerCase()) ||
    u.phone?.includes(query) ||
    u.userIdCode?.includes(query)
  );

  return (
    <MobileLayout>
      <TopHeader title="Registered Users" />

      <div className="px-4 py-4">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl p-4 flex items-center gap-3">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
            <UsersIcon size={24} />
          </div>
          <div className="flex-1">
            <p className="text-xs opacity-90 uppercase tracking-wider">Total Players Registered</p>
            <p className="text-2xl font-bold">{users.length}</p>
          </div>
          <button
            onClick={() => navigate('/register-user')}
            className="bg-white text-blue-600 px-4 py-2 rounded-xl font-bold text-sm flex items-center gap-1 active:scale-95"
          >
            <UserPlus size={16} /> New
          </button>
        </div>

        <div className="relative mt-5">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search by name, phone, or User ID"
            className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-2xl outline-none focus:border-blue-600"
          />
        </div>

        <div className="mt-5 space-y-3">
          {loading ? (
            <p className="text-center text-gray-400 py-8">Loading...</p>
          ) : filtered.length === 0 ? (
            <div className="bg-gray-50 rounded-2xl p-10 text-center">
              <UsersIcon className="mx-auto text-gray-300" size={48} />
              <p className="text-gray-400 mt-3 font-semibold">No users found</p>
              <button
                onClick={() => navigate('/register-user')}
                className="mt-4 bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm"
              >
                + Register First User
              </button>
            </div>
          ) : (
            filtered.map(u => (
              <button
                key={u._id}
                className="w-full bg-white rounded-2xl shadow p-4 flex items-center gap-3 active:bg-gray-50"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-lg">
                  {u.name?.[0]?.toUpperCase() || '?'}
                </div>
                <div className="flex-1 text-left min-w-0">
                  <p className="font-bold truncate">{u.name}</p>
                  <p className="text-xs text-gray-500 flex items-center gap-2 mt-0.5">
                    <span className="flex items-center gap-1"><Phone size={11} /> {u.phone}</span>
                  </p>
                  <p className="text-xs text-gray-500 flex items-center gap-2 mt-0.5">
                    <span className="flex items-center gap-1"><MapPin size={11} /> {u.district}</span>
                    {u.userIdCode && <span className="text-blue-600 font-mono font-bold">#{u.userIdCode}</span>}
                  </p>
                </div>
                <ChevronRight className="text-gray-400 shrink-0" size={18} />
              </button>
            ))
          )}
        </div>
      </div>

      <BottomNav />
    </MobileLayout>
  );
}
