import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Ticket, User, Hash, Activity, Printer, Home, Users, BarChart3, Settings2 } from 'lucide-react';
import { useToast } from '../components/Toast';
import MobileLayout from '../components/MobileLayout';
import BottomNav from '../components/BottomNav';

const navTabs = [
  { name: 'Home', path: '/dashboard', icon: Home },
  { name: 'Users', path: '/register-user', icon: Users },
  { name: 'Reports', path: '/reports', icon: BarChart3 },
  { name: 'Settings', path: '/settings', icon: Settings2 },
];

export default function LinkedSuccess() {
  const navigate = useNavigate();
  const toast = useToast();

  const handlePrint = () => {
    window.print();
  };

  return (
    <MobileLayout>
      <div className="px-5 pt-5 pb-4">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => navigate(-1)} className="h-9 w-9 rounded-xl bg-gray-100 flex items-center justify-center">
            <ArrowLeft size={20} color="#374151" />
          </button>
          <h1 className="text-lg font-bold text-gray-900">Ticket Linked</h1>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center mb-6">
          <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
            <CheckCircle size={36} color="#059669" />
          </div>
          <p className="text-lg font-extrabold text-green-800">Ticket Successfully Linked</p>
          <p className="text-xs text-green-600 mt-1">The ticket has been linked to the user account</p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-6">
          <div className="divide-y divide-gray-100">
            <div className="px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Ticket size={18} color="#6B7280" />
                <span className="text-sm font-medium text-gray-500">Ticket #</span>
              </div>
              <span className="text-sm font-bold text-gray-900">TKT-2024-001</span>
            </div>
            <div className="px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <User size={18} color="#6B7280" />
                <span className="text-sm font-medium text-gray-500">User ID</span>
              </div>
              <span className="text-sm font-bold text-gray-900">USR-0001</span>
            </div>
            <div className="px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Hash size={18} color="#6B7280" />
                <span className="text-sm font-medium text-gray-500">Entries</span>
              </div>
              <span className="text-sm font-bold text-gray-900">4</span>
            </div>
            <div className="px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Activity size={18} color="#6B7280" />
                <span className="text-sm font-medium text-gray-500">Entry Value</span>
              </div>
              <span className="text-sm font-bold text-gray-900">₹5</span>
            </div>
            <div className="px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle size={18} color="#6B7280" />
                <span className="text-sm font-medium text-gray-500">Status</span>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-700 text-[10px] font-bold rounded-full">ACTIVE</span>
            </div>
          </div>
        </div>

        <button
          onClick={handlePrint}
          className="w-full bg-primary text-white font-bold text-sm py-3.5 rounded-xl hover:bg-primary-dark transition-colors flex items-center justify-center gap-2 mb-3"
        >
          <Printer size={18} /> Print Receipt
        </button>

        <button
          onClick={() => navigate('/create-entry')}
          className="w-full py-3.5 rounded-xl border-2 border-primary text-primary font-bold text-sm hover:bg-blue-50 transition-colors mb-3"
        >
          Process Another Ticket
        </button>

        <button
          onClick={() => navigate('/dashboard')}
          className="w-full py-3.5 rounded-xl text-gray-500 font-semibold text-sm hover:bg-gray-50 transition-colors"
        >
          Return to Dashboard
        </button>
      </div>

      <BottomNav active="Reports" tabs={navTabs} />
    </MobileLayout>
  );
}
