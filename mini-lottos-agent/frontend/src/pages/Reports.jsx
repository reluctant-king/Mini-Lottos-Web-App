import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart3, TrendingUp, TrendingDown, Banknote } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import MobileLayout from '../components/MobileLayout';
import BottomNav from '../components/BottomNav';
import TopHeader from '../components/TopHeader';
import Loader from '../components/Loader';
import api from '../api/axios';

const dailyData = [
  { time: '6am', sales: 120 }, { time: '8am', sales: 200 }, { time: '10am', sales: 350 },
  { time: '12pm', sales: 280 }, { time: '2pm', sales: 400 }, { time: '4pm', sales: 320 },
  { time: '6pm', sales: 500 }, { time: '8pm', sales: 450 }, { time: '10pm', sales: 380 },
  { time: '12am', sales: 250 },
];

const weeklyData = [
  { day: 'MON', sales: 1200 }, { day: 'TUE', sales: 1800 }, { day: 'WED', sales: 1400 },
  { day: 'THU', sales: 2100 }, { day: 'FRI', sales: 1600 }, { day: 'SAT', sales: 2400 },
  { day: 'SUN', sales: 1900 },
];

export default function Reports() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [salesData, setSalesData] = useState({ daily: dailyData, weekly: weeklyData });
  const [stats, setStats] = useState({
    ticketsToday: 0,
    weeklySales: 0,
    miniLottoEntries: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dailyRes, weeklyRes] = await Promise.all([
          api.get('/reports/sales?period=daily'),
          api.get('/reports/sales?period=weekly'),
        ]);
        if (dailyRes.data?.data) {
          const daily = dailyRes.data.data.map((d) => ({ time: d.label, sales: d.value }));
          setSalesData((prev) => ({ ...prev, daily }));
        }
        if (weeklyRes.data?.data) {
          const weekly = weeklyRes.data.data.map((d) => ({ day: d.label, sales: d.value }));
          setSalesData((prev) => ({ ...prev, weekly }));
        }
        setStats({
          ticketsToday: dailyRes.data?.data?.reduce((s, d) => s + d.value, 0) || 128,
          weeklySales: weeklyRes.data?.data?.reduce((s, d) => s + d.value, 0) || 12400,
          miniLottoEntries: 45,
        });
      } catch {
        setStats({ ticketsToday: 128, weeklySales: 12400, miniLottoEntries: 45 });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <MobileLayout><Loader /></MobileLayout>;

  return (
    <MobileLayout>
      <TopHeader title="Sales Summary" />

      <div className="px-5 pt-5 pb-4">
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-1 mb-2">
              <TrendingUp size={14} color="#059669" />
              <span className="text-[10px] text-green-600 font-bold">+12%</span>
            </div>
            <p className="text-xl font-extrabold text-gray-900">{stats.ticketsToday}</p>
            <p className="text-[10px] text-gray-500 font-medium">Tickets Today</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-1 mb-2">
              <Banknote size={14} color="#059669" />
              <span className="text-[10px] text-green-600 font-bold">+5.2%</span>
            </div>
            <p className="text-xl font-extrabold text-gray-900">₹{stats.weeklySales.toLocaleString()}</p>
            <p className="text-[10px] text-gray-500 font-medium">Weekly Sales</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-center gap-1 mb-2">
              <TrendingDown size={14} color="#DC2626" />
              <span className="text-[10px] text-red-600 font-bold">-2.4%</span>
            </div>
            <p className="text-xl font-extrabold text-gray-900">{stats.miniLottoEntries}</p>
            <p className="text-[10px] text-gray-500 font-medium">Mini Lottos</p>
          </div>
        </div>

        <p className="text-xs font-semibold text-gray-500 mb-3 tracking-wide">DAILY SALES</p>
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm mb-6">
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={salesData.daily}>
              <defs>
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2563EB" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#2563EB" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
              <XAxis dataKey="time" tick={{ fontSize: 10, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Area type="monotone" dataKey="sales" stroke="#2563EB" strokeWidth={2} fill="url(#areaGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <p className="text-xs font-semibold text-gray-500 mb-3 tracking-wide">WEEKLY SUMMARY</p>
        <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm mb-6">
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={salesData.weekly}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
              <XAxis dataKey="day" tick={{ fontSize: 10, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Bar dataKey="sales" fill="#2563EB" radius={[4, 4, 0, 0]} barSize={24} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <BottomNav />
    </MobileLayout>
  );
}
