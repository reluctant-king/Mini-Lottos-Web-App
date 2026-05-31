import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('ml_user_token');
    const timer = setTimeout(() => {
      navigate(token ? '/home' : '/login', { replace: true });
    }, 1500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-500 to-amber-500 flex flex-col items-center justify-center">
      <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center mb-6 backdrop-blur-sm">
        <span className="text-4xl font-black text-white">ML</span>
      </div>
      <h1 className="text-3xl font-extrabold text-white mb-2">Mini Lottos</h1>
      <p className="text-white/80 text-sm">Your Lucky Numbers Await</p>
      <div className="mt-12">
        <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin" />
      </div>
    </div>
  );
}
