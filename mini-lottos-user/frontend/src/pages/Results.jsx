import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, MapPin, ShoppingCart, Clock, Eye, Award, ChevronRight, TrendingUp } from 'lucide-react';
import MobileLayout from '../components/MobileLayout';
import BottomNav from '../components/BottomNav';
import { useAuth } from '../context/AuthContext';

export default function Results() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const districts = [
    { name: 'Kochi', amount: '₹12,50,000', highlight: true },
    { name: 'Trivandrum', amount: '₹8,30,000', highlight: false },
    { name: 'Calicut', amount: '₹6,75,000', highlight: false },
    { name: 'Kollam', amount: '₹4,20,000', highlight: false },
    { name: 'Thrissur', amount: '₹3,90,000', highlight: false },
  ];

  const gridItems = [
    { icon: Eye, label: 'View Active Tickets', color: 'bg-blue-500', path: '/tickets' },
    { icon: Clock, label: 'View Past Tickets', color: 'bg-purple-500', path: '/tickets' },
    { icon: ShoppingCart, label: 'Buy Mini Entry', color: 'bg-orange-500', path: '/results' },
    { icon: Award, label: 'Check Results', color: 'bg-green-500', path: '/results' },
  ];

  return (
    <MobileLayout>
      <div className="px-5 pt-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold text-lg shadow-md">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <MapPin size={12} />
                <span>Kochi, Kerala</span>
              </div>
              <p className="font-bold text-gray-800">Good Evening</p>
            </div>
          </div>
          <button
            onClick={() => navigate('/notifications')}
            className="relative p-2 hover:bg-gray-100 rounded-xl"
          >
            <Bell size={22} className="text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-6 mb-6 shadow-lg relative overflow-hidden">
          <div className="absolute right-4 top-4 opacity-20">
            <Award size={80} />
          </div>
          <p className="text-white/80 text-sm font-medium">TODAY'S BIGGEST PRIZE</p>
          <p className="text-white text-4xl font-extrabold mt-2">₹1,00,00,000</p>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-8">
          {gridItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <button
                key={i}
                onClick={() => {
                  if (item.label.includes('Buy') || item.label.includes('Check')) {
                    const toast = () => {};
                    navigate(item.path);
                  } else {
                    navigate(item.path);
                  }
                }}
                className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-left hover:shadow-md transition-shadow"
              >
                <div className={`w-10 h-10 ${item.color} rounded-xl flex items-center justify-center mb-3`}>
                  <Icon size={20} className="text-white" />
                </div>
                <p className="text-sm font-semibold text-gray-700">{item.label}</p>
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <TrendingUp size={16} className="text-orange-500" />
            <h2 className="font-bold text-gray-800">Mini Lottos Pool Size (District Wise)</h2>
          </div>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2 -mx-5 px-5 mb-8">
          {districts.map((d, i) => (
            <div
              key={i}
              className={`min-w-[140px] rounded-xl p-4 flex-shrink-0 ${
                d.highlight ? 'bg-orange-500 text-white shadow-lg' : 'bg-white border border-gray-100 shadow-sm'
              }`}
            >
              <p className={`text-sm font-medium ${d.highlight ? 'text-white/80' : 'text-gray-500'}`}>{d.name}</p>
              <p className={`text-lg font-extrabold mt-1 ${d.highlight ? 'text-white' : 'text-gray-800'}`}>{d.amount}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl p-5 mb-6 shadow-lg flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
            <Award size={28} className="text-white" />
          </div>
          <div className="flex-1">
            <p className="text-white text-sm font-medium">Recent Winner</p>
            <p className="text-white text-xl font-extrabold">Rahul M. won ₹25,000</p>
          </div>
          <ChevronRight size={20} className="text-white/70" />
        </div>
      </div>

      <BottomNav active="Home" badge={false} />
    </MobileLayout>
  );
}
