import { useState } from 'react';
import MobileLayout from '../components/MobileLayout';
import BottomNav from '../components/BottomNav';
import TopHeader from '../components/TopHeader';
import { HelpCircle, MessageCircle, Phone, Mail, FileText, Plus, Minus, Headphones, Building2 } from 'lucide-react';

const FAQS = [
  { q: 'How do I sell a new lottery ticket?', a: 'Go to Dashboard \u2192 Quick Actions \u2192 Scan Ticket OR Register User. Follow the on-screen steps to create and link the ticket.' },
  { q: 'How do I verify a winning ticket?', a: 'Tap "Scan Ticket" on the dashboard, scan the QR code, the system will instantly verify and show the prize amount.' },
  { q: 'When do I get my commission?', a: 'Agent commissions are credited weekly every Monday based on tickets sold the previous week.' },
  { q: 'What if a player wins a big prize?', a: 'You will receive a Winning Ticket Alert. Contact the player, verify their ID, and guide them to the district lottery office.' },
  { q: 'How do I report a problem?', a: 'Use the "Contact Support" options below, or email support@minilottos.gov.in for urgent issues.' },
  { q: 'How do I update my agent details?', a: 'Go to Settings \u2192 Edit Profile. Some fields like Agent ID and License No. cannot be changed.' },
];

export default function AgentHelp() {
  const [open, setOpen] = useState(null);

  return (
    <MobileLayout>
      <TopHeader title="Help & Support" showBack showAvatar={false} showLocation={false} />

      <div className="px-4 py-4 space-y-6">
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-2xl p-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
              <Headphones size={24} />
            </div>
            <div>
              <p className="text-lg font-bold">Need Help?</p>
              <p className="text-xs opacity-90">We're here 24/7 for our agents</p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xs uppercase tracking-wider font-bold text-gray-500 mb-2 px-1">QUICK TOPICS</h3>
          <div className="grid grid-cols-2 gap-3">
            <TopicCard icon={FileText} color="blue" title="Ticket Help" desc="Sell & verify tickets" />
            <TopicCard icon={MessageCircle} color="green" title="Payments" desc="Commission & payouts" />
            <TopicCard icon={Building2} color="purple" title="License Info" desc="Agent credentials" />
            <TopicCard icon={HelpCircle} color="orange" title="Player Issues" desc="Resolve complaints" />
          </div>
        </div>

        <div>
          <h3 className="text-xs uppercase tracking-wider font-bold text-gray-500 mb-2 px-1">FREQUENTLY ASKED QUESTIONS</h3>
          <div className="space-y-2">
            {FAQS.map((f, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full p-4 flex justify-between items-center active:bg-gray-50"
                >
                  <span className="font-semibold text-left flex-1 pr-3">{f.q}</span>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${open === i ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}>
                    {open === i ? <Minus size={14} /> : <Plus size={14} />}
                  </div>
                </button>
                {open === i && (
                  <div className="px-4 pb-4 text-sm text-gray-600 border-t border-gray-100 pt-3">
                    {f.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="border-2 border-dashed border-blue-300 bg-blue-50 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <Headphones className="text-blue-600" />
            <h3 className="text-lg font-bold">Contact Support</h3>
          </div>
          <div className="space-y-3">
            <ContactCard icon={Phone} title="Agent Helpline (24x7)" value="1800-MINI-AGENT" color="blue" />
            <ContactCard icon={MessageCircle} title="WhatsApp Support" value="+91 98765 00000" color="green" />
            <ContactCard icon={Mail} title="Email Us" value="agents@minilottos.gov.in" color="orange" />
            <ContactCard icon={Building2} title="District Office" value="Kerala State Lottery, Trivandrum" color="purple" />
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 pb-4">
          Mini Lottos Agent Portal · v1.0.0
        </p>
      </div>

      <BottomNav />
    </MobileLayout>
  );
}

function TopicCard({ icon: Icon, color, title, desc }) {
  const colorMap = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    purple: 'bg-purple-100 text-purple-600',
    orange: 'bg-orange-100 text-orange-600',
  };
  return (
    <button className="bg-white rounded-2xl shadow-sm p-4 text-left active:bg-gray-50">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colorMap[color]}`}>
        <Icon size={20} />
      </div>
      <p className="font-bold mt-3 text-sm">{title}</p>
      <p className="text-xs text-gray-500 mt-1">{desc}</p>
    </button>
  );
}

function ContactCard({ icon: Icon, title, value, color }) {
  const colorMap = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    orange: 'bg-orange-100 text-orange-600',
    purple: 'bg-purple-100 text-purple-600',
  };
  return (
    <div className="bg-white rounded-2xl p-3 flex items-center gap-3">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${colorMap[color]}`}>
        <Icon size={18} />
      </div>
      <div className="flex-1">
        <p className="text-xs text-gray-500">{title}</p>
        <p className="font-bold text-sm">{value}</p>
      </div>
      <Phone className="text-gray-400" size={16} />
    </div>
  );
}
