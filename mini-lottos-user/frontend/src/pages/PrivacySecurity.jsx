import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileLayout from '../components/MobileLayout';
import BottomNav from '../components/BottomNav';
import {
  ArrowLeft, Key, Fingerprint, Smartphone, ShieldCheck, Landmark,
  Eye, Monitor, Clock, Trash2, ChevronRight, CheckCircle, AlertTriangle,
  Mail, Bell, FileText, Lock
} from 'lucide-react';

export default function PrivacySecurity() {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(null);

  const [biometric, setBiometric] = useState(false);
  const [twoFA, setTwoFA] = useState(true);
  const [hideBalance, setHideBalance] = useState(false);
  const [marketing, setMarketing] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);

  return (
    <MobileLayout>
      <div className="flex items-center gap-3 px-4 py-4 bg-white shadow-sm">
        <button onClick={() => navigate(-1)}><ArrowLeft size={22} /></button>
        <h1 className="text-lg font-bold flex-1 text-center">Privacy & Security</h1>
        <div className="w-6" />
      </div>

      <div className="px-4 py-4 space-y-6">
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl p-5 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
              <ShieldCheck size={26} />
            </div>
            <div>
              <p className="font-bold text-lg">Account Secured</p>
              <p className="text-xs opacity-90 mt-0.5">Last security check: Today</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-4 text-center">
            <div className="bg-white/15 rounded-xl py-2">
              <p className="text-xl font-bold">95%</p>
              <p className="text-[10px] opacity-90">Security Score</p>
            </div>
            <div className="bg-white/15 rounded-xl py-2">
              <p className="text-xl font-bold">2</p>
              <p className="text-[10px] opacity-90">Active Devices</p>
            </div>
            <div className="bg-white/15 rounded-xl py-2">
              <p className="text-xl font-bold">{'\u2713'}</p>
              <p className="text-[10px] opacity-90">KYC Verified</p>
            </div>
          </div>
        </div>

        <Section title={'\uD83D\uDD12'} subtitle="ACCOUNT SECURITY">
          <Row icon={Key} label="Change App PIN" sub="Last changed 12 days ago" onClick={() => setOpenModal('pin')} />
          <Toggle icon={Fingerprint} label="Biometric Login" sub="Use Face ID or Fingerprint" value={biometric} onChange={setBiometric} />
          <Toggle icon={Smartphone} label="Two-Factor Authentication" sub="OTP on every login" value={twoFA} onChange={setTwoFA} />
          <Row icon={Lock} label="Change Password" sub="Recommended every 90 days" onClick={() => setOpenModal('password')} />
        </Section>

        <Section title={'\uD83D\uDCB0'} subtitle="PAYMENT SECURITY">
          <Row icon={ShieldCheck} label="KYC Verification" badge={{ text: 'Verified', color: 'green' }} onClick={() => setOpenModal('kyc')} />
          <Row icon={Landmark} label="Bank Account" value={'\u2022\u2022\u2022\u2022 4521'} onClick={() => setOpenModal('bank')} />
          <Row icon={Key} label="Transaction PIN" sub="Required for withdrawals" onClick={() => setOpenModal('tpin')} />
        </Section>

        <Section title={'\uD83D\uDEE1'} subtitle="PRIVACY">
          <Toggle icon={Eye} label="Hide Balance on Home" sub="Mask \u20B9 amount on cards" value={hideBalance} onChange={setHideBalance} />
          <Toggle icon={Mail} label="Email Notifications" sub="Receive emails about draws" value={emailAlerts} onChange={setEmailAlerts} />
          <Toggle icon={Bell} label="SMS Notifications" sub="Get SMS for big wins" value={smsAlerts} onChange={setSmsAlerts} />
          <Toggle icon={FileText} label="Marketing Communications" sub="Promotional offers & news" value={marketing} onChange={setMarketing} />
        </Section>

        <Section title={'\uD83D\uDCCB'} subtitle="ACTIVITY">
          <Row icon={Monitor} label="Active Sessions" value="2 devices" onClick={() => setOpenModal('sessions')} />
          <Row icon={Clock} label="Login History" sub="View last 30 days" onClick={() => setOpenModal('history')} />
        </Section>

        <Section title={'\uD83D\uDCC4'} subtitle="LEGAL">
          <Row icon={FileText} label="Privacy Policy" onClick={() => setOpenModal('privacy')} />
          <Row icon={FileText} label="Terms of Service" onClick={() => setOpenModal('terms')} />
        </Section>

        <Section title={'\u26A0\uFE0F'} subtitle="DANGER ZONE">
          <Row icon={Trash2} label="Delete Account" sub="Permanently remove all data" danger onClick={() => setOpenModal('delete')} />
        </Section>

        <p className="text-center text-xs text-gray-400 pt-2 pb-4">
          {'\uD83D\uDD12'} All your data is encrypted with bank-grade security
        </p>
      </div>

      <BottomNav />

      {openModal && <DemoModal type={openModal} onClose={() => setOpenModal(null)} />}
    </MobileLayout>
  );
}

function Section({ title, subtitle, children }) {
  return (
    <div>
      <h3 className="text-xs uppercase tracking-wider font-bold text-gray-500 mb-2 px-1">{title} {subtitle}</h3>
      <div className="bg-white rounded-2xl shadow divide-y divide-gray-100 overflow-hidden">
        {children}
      </div>
    </div>
  );
}

function Row({ icon: Icon, label, sub, value, badge, onClick, danger }) {
  return (
    <button onClick={onClick} className={`w-full p-4 flex items-center gap-3 active:bg-gray-50 ${danger ? 'text-red-500' : ''}`}>
      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${danger ? 'bg-red-100' : 'bg-gray-100'}`}>
        <Icon size={18} className={danger ? 'text-red-500' : 'text-gray-600'} />
      </div>
      <div className="flex-1 text-left">
        <p className="font-semibold">{label}</p>
        {sub && <p className="text-xs text-gray-500 mt-0.5">{sub}</p>}
      </div>
      {value && <span className="text-gray-400 text-sm mr-1">{value}</span>}
      {badge && (
        <span className={`px-2.5 py-1 rounded-full text-xs font-bold mr-1 flex items-center gap-1 ${badge.color === 'green' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
          <CheckCircle size={10} /> {badge.text}
        </span>
      )}
      <ChevronRight size={18} className="text-gray-400" />
    </button>
  );
}

function Toggle({ icon: Icon, label, sub, value, onChange }) {
  return (
    <div className="p-4 flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
        <Icon size={18} className="text-gray-600" />
      </div>
      <div className="flex-1">
        <p className="font-semibold">{label}</p>
        {sub && <p className="text-xs text-gray-500 mt-0.5">{sub}</p>}
      </div>
      <button
        onClick={() => onChange(!value)}
        className={`w-12 h-7 rounded-full transition-all relative ${value ? 'bg-orange-500' : 'bg-gray-300'}`}
      >
        <span className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-all ${value ? 'left-6' : 'left-1'}`} />
      </button>
    </div>
  );
}

function DemoModal({ type, onClose }) {
  const content = {
    pin: {
      title: 'Change App PIN',
      icon: Key,
      color: 'orange',
      body: (
        <div className="text-center">
          <p className="text-gray-600 mb-6">Enter your 4-digit PIN to secure the app</p>
          <div className="flex gap-3 justify-center mb-6">
            {[1,2,3,4].map(i => <div key={i} className="w-14 h-14 rounded-2xl border-2 border-orange-300 bg-orange-50 flex items-center justify-center text-2xl font-bold text-orange-500">{'\u2022'}</div>)}
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[1,2,3,4,5,6,7,8,9].map(n => <div key={n} className="h-14 bg-gray-100 rounded-2xl flex items-center justify-center text-xl font-bold">{n}</div>)}
            <div /><div className="h-14 bg-gray-100 rounded-2xl flex items-center justify-center text-xl font-bold">0</div><div className="h-14 flex items-center justify-center">{'\u232B'}</div>
          </div>
        </div>
      )
    },
    password: {
      title: 'Change Password',
      icon: Lock, color: 'blue',
      body: (
        <div className="space-y-4">
          <DemoField label="Current Password" placeholder={'\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022'} />
          <DemoField label="New Password" placeholder={'\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022'} />
          <DemoField label="Confirm New Password" placeholder={'\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022'} />
        </div>
      )
    },
    kyc: {
      title: 'KYC Verification',
      icon: ShieldCheck, color: 'green',
      body: (
        <div>
          <div className="bg-green-50 border border-green-200 rounded-2xl p-4 flex gap-3 mb-4">
            <CheckCircle className="text-green-500 shrink-0" />
            <div>
              <p className="font-bold text-green-700">KYC Verified {'\u2705'}</p>
              <p className="text-sm text-green-600 mt-1">You can claim prizes up to {'\u20B9'}10,00,000</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl divide-y border border-gray-100">
            <DemoDataRow label="Aadhaar" value={'\u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 4521'} />
            <DemoDataRow label="PAN" value="ABC{'\u2022\u2022\u2022\u2022'}4F" />
            <DemoDataRow label="Status" value="Verified" valueColor="green" />
            <DemoDataRow label="Verified On" value="Jan 15, 2024" />
          </div>
        </div>
      )
    },
    bank: {
      title: 'Bank Account',
      icon: Landmark, color: 'blue',
      body: (
        <div>
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-2xl p-5">
            <div className="flex justify-between"><Landmark size={28} /><span className="bg-green-400 text-green-900 px-2 py-1 rounded-full text-xs font-bold">VERIFIED</span></div>
            <p className="text-xs opacity-70 mt-4 uppercase tracking-wider">Account Number</p>
            <p className="text-xl font-bold tracking-widest mt-1">{'\u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 4521'}</p>
            <div className="flex justify-between mt-4">
              <div><p className="text-xs opacity-70 uppercase">Holder</p><p className="font-bold">Arjun Kumar</p></div>
              <div className="text-right"><p className="text-xs opacity-70 uppercase">IFSC</p><p className="font-bold">SBIN0001234</p></div>
            </div>
            <p className="mt-3 text-sm opacity-90">State Bank of India</p>
          </div>
          <button className="w-full mt-4 border-2 border-blue-500 text-blue-500 py-3 rounded-2xl font-bold">Change Account</button>
        </div>
      )
    },
    tpin: {
      title: 'Transaction PIN',
      icon: Key, color: 'purple',
      body: (
        <div className="text-center">
          <p className="text-gray-600 mb-6">A separate PIN required when withdrawing or redeeming prizes</p>
          <div className="bg-purple-50 border border-purple-200 rounded-2xl p-4 mb-4">
            <p className="text-sm text-purple-800">{'\u2713'} Transaction PIN is currently set</p>
          </div>
          <button className="w-full bg-purple-500 text-white py-3 rounded-2xl font-bold">Reset Transaction PIN</button>
        </div>
      )
    },
    sessions: {
      title: 'Active Sessions',
      icon: Monitor, color: 'blue',
      body: (
        <div className="space-y-3">
          {[
            { device: 'iPhone 14 Pro', loc: 'Kochi, Kerala', time: 'Active now', current: true },
            { device: 'Chrome \u00B7 Windows', loc: 'Trivandrum, Kerala', time: '2 hours ago' },
          ].map((s, i) => (
            <div key={i} className="bg-gray-50 rounded-2xl p-4 flex gap-3">
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${s.current ? 'bg-green-100' : 'bg-gray-200'}`}>
                <Smartphone size={18} className={s.current ? 'text-green-600' : 'text-gray-600'} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-bold text-sm">{s.device}</p>
                  {s.current && <span className="bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full text-[9px] font-bold">CURRENT</span>}
                </div>
                <p className="text-xs text-gray-500 mt-0.5">{s.loc} {'\u00B7'} {s.time}</p>
              </div>
            </div>
          ))}
          <button className="w-full bg-red-50 text-red-500 py-3 rounded-2xl font-bold text-sm">Logout from all other devices</button>
        </div>
      )
    },
    history: {
      title: 'Login History',
      icon: Clock, color: 'gray',
      body: (
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {[
            { device: 'iPhone 14 Pro', loc: 'Kochi', time: 'Today, 10:32 AM', ok: true },
            { device: 'Chrome \u00B7 Windows', loc: 'Trivandrum', time: 'Today, 8:15 AM', ok: true },
            { device: 'Unknown Device', loc: 'Mumbai', time: 'Oct 22, 3:12 AM', ok: false },
            { device: 'iPhone 14 Pro', loc: 'Kochi', time: 'Oct 21, 6:30 PM', ok: true },
            { device: 'iPad Air', loc: 'Kochi', time: 'Oct 20, 9:00 AM', ok: true },
          ].map((h, i) => (
            <div key={i} className="bg-gray-50 rounded-xl p-3 flex gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${h.ok ? 'bg-green-100' : 'bg-red-100'}`}>
                {h.ok ? <CheckCircle size={14} className="text-green-600" /> : <AlertTriangle size={14} className="text-red-600" />}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm">{h.device}</p>
                <p className="text-xs text-gray-500">{h.loc} {'\u00B7'} {h.time}</p>
                {!h.ok && <p className="text-xs text-red-500 font-bold mt-1">{'\u26A0\uFE0F'} Login blocked</p>}
              </div>
            </div>
          ))}
        </div>
      )
    },
    privacy: {
      title: 'Privacy Policy',
      icon: FileText, color: 'blue',
      body: (
        <div className="text-sm text-gray-700 space-y-3 max-h-96 overflow-y-auto">
          <p><b>Last Updated: October 2024</b></p>
          <p>Mini Lottos is committed to protecting your privacy. This policy explains how we collect, use, and safeguard your information.</p>
          <p><b>Data We Collect:</b> Name, phone, district, KYC documents (Aadhaar/PAN), bank details, ticket purchase history.</p>
          <p><b>How We Use It:</b> To process tickets, send win notifications, verify identity, and comply with government lottery regulations.</p>
          <p><b>Data Security:</b> All data is encrypted using AES-256 and stored on secure servers. We never sell your data to third parties.</p>
          <p><b>Your Rights:</b> You can access, edit, or delete your data anytime from this app.</p>
        </div>
      )
    },
    terms: {
      title: 'Terms of Service',
      icon: FileText, color: 'blue',
      body: (
        <div className="text-sm text-gray-700 space-y-3 max-h-96 overflow-y-auto">
          <p><b>Last Updated: October 2024</b></p>
          <p>By using Mini Lottos, you agree to these terms.</p>
          <p><b>Eligibility:</b> You must be 18+ years old and a resident of India.</p>
          <p><b>Tickets:</b> All tickets are issued by authorized government agents. Once purchased, they cannot be refunded.</p>
          <p><b>Prizes:</b> Winnings must be claimed within 30 days of the draw. KYC verification is mandatory for prizes above {'\u20B9'}10,000.</p>
          <p><b>Responsible Gaming:</b> Play within your limits. We support self-exclusion if needed.</p>
        </div>
      )
    },
    delete: {
      title: 'Delete Account',
      icon: Trash2, color: 'red',
      body: (
        <div>
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4 flex gap-3 mb-5">
            <AlertTriangle className="text-red-500 shrink-0" />
            <div>
              <p className="font-bold text-red-700">This action is permanent</p>
              <p className="text-sm text-red-600 mt-1">All your tickets, balance, coins, and history will be deleted forever.</p>
            </div>
          </div>
          <DemoField label="Reason (Optional)" placeholder="Tell us why you're leaving..." textarea />
          <div className="mt-4">
            <label className="text-xs uppercase tracking-wider font-bold text-gray-600 mb-2 block">Type <span className="text-red-500">DELETE</span> to confirm</label>
            <input placeholder="DELETE" className="w-full px-4 py-3 border-2 border-red-200 rounded-2xl outline-none font-bold" />
          </div>
          <button className="w-full mt-5 bg-red-500 text-white py-3 rounded-2xl font-bold">Permanently Delete Account</button>
        </div>
      )
    },
  }[type];

  if (!content) return null;
  const Icon = content.icon;
  const colorMap = { orange: 'bg-orange-100 text-orange-500', blue: 'bg-blue-100 text-blue-500', green: 'bg-green-100 text-green-500', red: 'bg-red-100 text-red-500', purple: 'bg-purple-100 text-purple-500', gray: 'bg-gray-100 text-gray-500' };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center" onClick={onClose}>
      <div onClick={e => e.stopPropagation()} className="bg-white w-full max-w-[430px] rounded-t-3xl max-h-[85vh] overflow-y-auto animate-slideup">
        <div className="sticky top-0 bg-white border-b border-gray-100 p-4 flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${colorMap[content.color]}`}>
            <Icon size={20} />
          </div>
          <h2 className="text-lg font-bold flex-1">{content.title}</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold">{'\u2715'}</button>
        </div>
        <div className="p-5">{content.body}</div>
      </div>
    </div>
  );
}

function DemoField({ label, placeholder, textarea }) {
  return (
    <div>
      <label className="text-xs uppercase tracking-wider font-bold text-gray-600 mb-2 block">{label}</label>
      {textarea ? (
        <textarea rows={3} placeholder={placeholder} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl outline-none resize-none" />
      ) : (
        <input placeholder={placeholder} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl outline-none" />
      )}
    </div>
  );
}

function DemoDataRow({ label, value, valueColor }) {
  return (
    <div className="p-3 flex justify-between">
      <span className="text-gray-500 text-sm">{label}</span>
      <span className={`font-bold text-sm ${valueColor === 'green' ? 'text-green-600' : ''}`}>{value}</span>
    </div>
  );
}
