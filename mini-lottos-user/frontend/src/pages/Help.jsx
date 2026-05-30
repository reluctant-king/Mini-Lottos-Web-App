import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, HelpCircle, Ticket, Award, Headphones, Phone, ChevronDown, ChevronUp } from 'lucide-react';
import MobileLayout from '../components/MobileLayout';
import BottomNav from '../components/BottomNav';
import { useToast } from '../components/Toast';

const faqs = [
  { q: 'When are the draws held?', a: 'Draws are held every day at 9:00 AM, 1:00 PM, 6:00 PM, and 9:00 PM IST. Special jackpot draws happen every Saturday at 8:00 PM.' },
  { q: 'Is my personal data safe?', a: 'Yes, all your personal data is encrypted and stored securely. We comply with all data protection regulations and never share your information with third parties.' },
  { q: 'How do I update my bank details?', a: 'Go to your Profile page, tap "Edit Profile", and update your bank account information. Changes will be verified within 24 hours.' },
  { q: 'What is the minimum age to play?', a: 'You must be 18 years or older to participate in Mini Lottos. Age verification is required during registration.' },
];

export default function Help() {
  const navigate = useNavigate();
  const toast = useToast();
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <MobileLayout>
      <div className="px-5 pt-4">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-xl">
            <ArrowLeft size={24} className="text-gray-700" />
          </button>
          <h1 className="text-lg font-bold text-gray-800">Support Center</h1>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <HelpCircle size={16} className="text-orange-500" />
          <h2 className="font-bold text-gray-800">Common Help Topics</h2>
        </div>

        <div className="space-y-3 mb-8">
          <div
            onClick={() => toast('Opening ticket status help...')}
            className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-orange-500 border border-gray-100 cursor-pointer hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
                <Ticket size={20} className="text-orange-500" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">Ticket Status Help</p>
                <p className="text-xs text-gray-400">Track and understand your ticket status</p>
              </div>
            </div>
          </div>

          <div
            onClick={() => toast('Opening claim guide...')}
            className="bg-white rounded-xl p-4 shadow-sm border-l-4 border-green-500 border border-gray-100 cursor-pointer hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
                <Award size={20} className="text-green-500" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">Claim My Prize</p>
                <p className="text-xs text-gray-400">Step-by-step prize collection guide</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <HelpCircle size={16} className="text-orange-500" />
          <h2 className="font-bold text-gray-800">FAQ</h2>
        </div>

        <div className="space-y-2 mb-8">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between p-4 text-left"
              >
                <span className="font-medium text-gray-800 text-sm">{faq.q}</span>
                {openFaq === i ? (
                  <ChevronUp size={18} className="text-orange-500 flex-shrink-0" />
                ) : (
                  <ChevronDown size={18} className="text-gray-400 flex-shrink-0" />
                )}
              </button>
              {openFaq === i && (
                <div className="px-4 pb-4 text-sm text-gray-500 border-t border-gray-50 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-dashed border-orange-300 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Headphones size={18} className="text-orange-500" />
            <h3 className="font-bold text-gray-800">Talk to Us</h3>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center">
              <Phone size={24} className="text-orange-500" />
            </div>
            <div>
              <p className="font-semibold text-gray-800">Customer Support</p>
              <p className="text-sm text-gray-500">Available 24/7</p>
              <a href="tel:+911800123456" className="text-sm font-semibold text-orange-500">1800-123-456</a>
            </div>
          </div>
        </div>
      </div>

      <BottomNav active="Help" badge={false} />
    </MobileLayout>
  );
}
