import { useState } from 'react';
import MobileLayout from '../components/MobileLayout';
import BottomNav from '../components/BottomNav';
import TopHeader from '../components/TopHeader';
import { Check } from 'lucide-react';

const LANGS = [
  { code: 'en', name: 'English', native: 'English' },
  { code: 'ml', name: 'Malayalam', native: 'മലയാളം' },
  { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు' },
  { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' },
];

export default function AgentLanguage() {
  const [selected, setSelected] = useState('en');

  return (
    <MobileLayout>
      <TopHeader title="Language" showBack showAvatar={false} showLocation={false} />
      <div className="px-4 py-4">
        <p className="text-gray-500 text-sm mb-4">Choose your preferred language for the app interface.</p>
        <div className="bg-white rounded-2xl shadow divide-y divide-gray-100 overflow-hidden">
          {LANGS.map(lang => (
            <button
              key={lang.code}
              onClick={() => setSelected(lang.code)}
              className="w-full p-4 flex items-center gap-3 active:bg-gray-50"
            >
              <div className="flex-1 text-left">
                <p className="font-semibold">{lang.name}</p>
                <p className="text-xs text-gray-500">{lang.native}</p>
              </div>
              {selected === lang.code && (
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                  <Check className="text-white" size={14} />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
      <BottomNav />
    </MobileLayout>
  );
}
