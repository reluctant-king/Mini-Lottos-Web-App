import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield } from 'lucide-react';

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate('/login'), 2500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-yellow-200 via-orange-100 to-blue-300 flex flex-col items-center justify-center">
      <div className="absolute top-16 left-8 w-14 h-14 rounded-full bg-yellow-300 opacity-60 animate-bounce" style={{ animationDelay: '0s', animationDuration: '2s' }} />
      <div className="absolute top-32 right-12 w-16 h-16 rounded-full bg-orange-400 opacity-40 animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '2.5s' }} />
      <div className="absolute bottom-40 left-10 w-12 h-12 rounded-full bg-pink-300 opacity-50 animate-bounce" style={{ animationDelay: '1s', animationDuration: '2s' }} />
      <div className="absolute bottom-52 right-20 w-10 h-10 rounded-full bg-blue-300 opacity-50 animate-bounce" style={{ animationDelay: '0.3s', animationDuration: '2.2s' }} />
      <div className="absolute top-1/3 left-6 w-8 h-8 rounded-full bg-purple-300 opacity-40 animate-bounce" style={{ animationDelay: '0.8s', animationDuration: '1.8s' }} />
      <div className="absolute top-1/2 right-8 w-6 h-6 rounded-full bg-teal-300 opacity-50 animate-bounce" style={{ animationDelay: '1.2s', animationDuration: '2.1s' }} />

      <div className="flex flex-col items-center">
        <div className="w-64 h-64 rounded-full bg-teal-600 border-8 border-white shadow-2xl flex flex-col items-center justify-center mb-6">
          <span className="text-white text-5xl font-bold lowercase">mni</span>
          <span className="text-white text-xl tracking-[0.25em] font-semibold">LOTTOS</span>
        </div>
        <h1 className="text-4xl font-extrabold text-blue-900 tracking-tight">MINI LOTTOS</h1>
        <p className="text-sm tracking-[0.3em] text-blue-700 font-medium mt-1">PLAY. WIN. CELEBRATE.</p>
      </div>

      <div className="absolute bottom-24 flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
        <Shield size={16} className="text-blue-700" />
        <span className="text-xs font-semibold text-blue-800">OFFICIAL GOVERNMENT SUPPORTED</span>
      </div>

      <div className="absolute bottom-8 w-48 h-1.5 bg-white/60 rounded-full overflow-hidden">
        <div className="h-full bg-orange-500 rounded-full animate-pulse" style={{ width: '60%' }} />
      </div>
    </div>
  );
}
