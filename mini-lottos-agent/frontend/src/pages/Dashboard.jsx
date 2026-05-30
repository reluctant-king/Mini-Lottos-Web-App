import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Landmark, Bell, Menu, MapPin, QrCode, UserPlus, Link2, ChevronRight, Ticket, Users, BarChart3, Home, Settings } from 'lucide-react';
import { useAgentAuth } from '../context/AgentAuthContext';
import { useToast } from '../components/Toast';
import MobileLayout from '../components/MobileLayout';
import BottomNav from '../components/BottomNav';
import StatCard from '../components/StatCard';
import Loader from '../components/Loader';
import api from '../api/axios';

const navTabs = [
  { name: 'Home', path: '/dashboard', icon: Home },
  { name: 'Tickets', path: '/tickets', icon: Ticket },
  { name: 'Users', path: '/register-user', icon: Users },
  { name: 'Reports', path: '/reports', icon: BarChart3 },
];

function formatAgentId(id) {
  if (!id) return '----';
  const s = String(id).padStart(8, '0');
  return `${s.slice(0, 4)}-${s.slice(4)}`;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { agent } = useAgentAuth();
  const toast = useToast();
  const [stats, setStats] = useState(null);
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alerts, setAlerts] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, activityRes, alertsRes] = await Promise.all([
          api.get('/reports/daily'),
          api.get('/reports/activity'),
          api.get('/alerts/unread-count').catch(() => ({ data: { count: 0 } })),
        ]);
        setStats(statsRes.data);
        setActivity(activityRes.data?.activities || activityRes.data || []);
        setAlerts(alertsRes.data?.count || 0);
      } catch (err) {
        setStats({ ticketsSold: 0, miniLottoEntries: 0, winningTickets: 0 });
        setActivity([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <MobileLayout><Loader /></MobileLayout>;

  return (
    <MobileLayout>
      <div className="px-5 pt-5 pb-4">
        <div className="flex justify-between items-center mb-5">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-blue-100 flex items-center justify-center">
              <Landmark size={22} color="#2563EB" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Agent Portal</h1>
              <p className="text-[10px] text-gray-500 font-medium">Kerala State Lottery</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative" onClick={() => navigate('/reports')}>
              <Bell size={22} color="#374151" />
              {alerts > 0 && <span className="absolute -top-1 -right-1 h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-white" />}
            </button>
            <button onClick={() => navigate('/settings')}>
              <Menu size={22} color="#374151" />
            </button>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-4 flex items-center gap-4 mb-6">
          <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center text-white text-xl font-bold shrink-0 overflow-hidden">
            {agent?.photo ? (
              <img src={agent.photo} alt="" className="h-full w-full object-cover" />
            ) : (
              agent?.name?.charAt(0) || 'A'
            )}
          </div>
          <div>
            <h2 className="font-bold text-gray-900 text-base">{agent?.name || 'Agent'}</h2>
            <p className="text-xs text-gray-600 font-mono font-medium">{formatAgentId(agent?.agentId || agent?.id)}</p>
            <div className="flex items-center gap-1 mt-1">
              <MapPin size={12} color="#6B7280" />
              <span className="text-[10px] text-gray-500">{agent?.district || 'District'}</span>
            </div>
          </div>
        </div>

        <p className="text-xs font-semibold text-gray-500 mb-3 tracking-wide">QUICK ACTIONS</p>
        <div className="grid grid-cols-3 gap-3 mb-6">
          <button onClick={() => navigate('/scan')} className="bg-primary rounded-2xl p-4 flex flex-col items-center gap-2 text-white">
            <QrCode size={28} />
            <span className="text-[10px] font-semibold">Scan Ticket</span>
          </button>
          <button onClick={() => navigate('/register-user')} className="bg-white rounded-2xl p-4 flex flex-col items-center gap-2 border border-gray-100 shadow-sm">
            <UserPlus size={28} color="#2563EB" />
            <span className="text-[10px] font-semibold text-gray-700">Register User</span>
          </button>
          <button onClick={() => navigate('/link')} className="bg-white rounded-2xl p-4 flex flex-col items-center gap-2 border border-gray-100 shadow-sm">
            <Link2 size={28} color="#2563EB" />
            <span className="text-[10px] font-semibold text-gray-700">Link Ticket</span>
          </button>
        </div>

        <p className="text-xs font-semibold text-gray-500 mb-3 tracking-wide">DAILY PERFORMANCE</p>
        <div className="grid grid-cols-3 gap-3 mb-6">
          <StatCard value={stats?.ticketsSold ?? 0} label="Tickets Sold" color="text-primary" />
          <StatCard value={stats?.miniLottoEntries ?? 0} label="Mini Lotto" color="text-green-600" />
          <StatCard value={stats?.winningTickets ?? 0} label="Winners" color="text-amber-600" />
        </div>

        <div className="flex justify-between items-center mb-3">
          <p className="text-xs font-semibold text-gray-500 tracking-wide">RECENT TICKET ACTIVITY</p>
          <button onClick={() => navigate('/tickets')} className="flex items-center gap-1">
            <span className="text-[10px] text-primary font-semibold">View All</span>
            <ChevronRight size={12} color="#2563EB" />
          </button>
        </div>

        {activity.length === 0 ? (
          <div className="bg-gray-50 rounded-2xl p-6 text-center">
            <p className="text-xs text-gray-400 font-medium">No recent activity</p>
          </div>
        ) : (
          <div className="space-y-2">
            {activity.slice(0, 5).map((item, i) => (
              <div key={i} className="flex items-center justify-between bg-white rounded-xl px-4 py-3 border border-gray-100 shadow-sm">
                <div>
                  <p className="text-sm font-bold text-gray-900">{item.ticketNumber || 'N/A'}</p>
                  <p className="text-[10px] text-gray-500 font-medium capitalize">{item.action || 'Created'}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-900">{item.amount ? `₹${item.amount}` : ''}</p>
                  <p className="text-[10px] text-gray-400">{item.time || item.createdAt ? new Date(item.createdAt || item.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <BottomNav active="Home" tabs={navTabs} />
    </MobileLayout>
  );
}
