import { useState } from 'react';
import MobileLayout from '../components/MobileLayout';
import BottomNav from '../components/BottomNav';
import TopHeader from '../components/TopHeader';
import {
  Key, Fingerprint, Smartphone, ShieldCheck, Eye, Monitor, Clock,
  Trash2, ChevronRight, CheckCircle, AlertTriangle, Lock, FileText, Building2
} from 'lucide-react';

export default function AgentPrivacy() {
  const [openModal, setOpenModal] = useState(null);
  const [biometric, setBiometric] = useState(true);
  const [twoFA, setTwoFA] = useState(true);
  const [autoLock, setAutoLock] = useState(true);

  return (
    <MobileLayout>
      <TopHeader title="Privacy & Security" showBack showAvatar={false} showLocation={false} />

      <div className="px-4 py-4 space-y-6">
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl p-5 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
              <ShieldCheck size={26} />
            </div>
            <div>
              <p className="font-bold text-lg">Account Secured</p>
              <p className="text-xs opacity-90">Government-verified agent portal</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-4 text-center">
            <Stat label="Security" value="98%" />
            <Stat label="Devices" value="1" />
            <Stat label="2FA" value="ON" />
          </div>
        </div>

        <Section title="LOGIN SECURITY">
          <Row icon={Key} label="Change Password" sub="Last changed 30 days ago" onClick={() => setOpenModal('password')} />
          <Row icon={Lock} label="Change Agent PIN" sub="Quick access PIN" onClick={() => setOpenModal('pin')} />
          <Toggle icon={Fingerprint} label="Biometric Login" sub="Face ID / Fingerprint" value={biometric} onChange={setBiometric} />
          <Toggle icon={Smartphone} label="Two-Factor Authentication" sub="OTP on every login" value={twoFA} onChange={setTwoFA} />
          <Toggle icon={Eye} label="Auto-Lock After 5 min" sub="Lock when idle" value={autoLock} onChange={setAutoLock} />
        </Section>

        <Section title="ACTIVITY">
          <Row icon={Monitor} label="Active Sessions" value="1 device" onClick={() => setOpenModal('sessions')} />
          <Row icon={Clock} label="Login History" sub="View last 30 days" onClick={() => setOpenModal('history')} />
        </Section>

        <Section title="GOVERNMENT COMPLIANCE">
          <Row icon={Building2} label="Agent License Status" badge={{ text: 'Verified', color: 'green' }} onClick={() => setOpenModal('license')} />
          <Row icon={FileText} label="KYC Documents" badge={{ text: 'Verified', color: 'green' }} onClick={() => setOpenModal('kyc')} />
        </Section>

        <Section title="LEGAL">
          <Row icon={FileText} label="Privacy Policy" onClick={() => setOpenModal('privacy')} />
          <Row icon={FileText} label="Terms of Service" onClick={() => setOpenModal('terms')} />
          <Row icon={FileText} label="Agent Code of Conduct" onClick={() => setOpenModal('conduct')} />
        </Section>

        <Section title="DANGER ZONE">
          <Row icon={Trash2} label="Request Account Deactivation" sub="Contact administrator" danger onClick={() => setOpenModal('deactivate')} />
        </Section>

        <p className="text-center text-xs text-gray-400 pb-4">
          Encrypted with government-grade security
        </p>
      </div>

      <BottomNav />
      {openModal && <DemoModal type={openModal} onClose={() => setOpenModal(null)} />}
    </MobileLayout>
  );
}

function Stat({ label, value }) {
  return (
    <div className="bg-white/15 rounded-xl py-2">
      <p className="text-lg font-bold">{value}</p>
      <p className="text-[10px] opacity-90">{label}</p>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div>
      <h3 className="text-xs uppercase tracking-wider font-bold text-gray-500 mb-2 px-1">{title}</h3>
      <div className="bg-white rounded-2xl shadow divide-y divide-gray-100 overflow-hidden">{children}</div>
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
      <button onClick={() => onChange(!value)} className={`w-12 h-7 rounded-full transition-all relative ${value ? 'bg-blue-600' : 'bg-gray-300'}`}>
        <span className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-all ${value ? 'left-6' : 'left-1'}`} />
      </button>
    </div>
  );
}

function DemoModal({ type, onClose }) {
  const content = {
    password: {
      title: 'Change Password',
      body: (
        <div className="space-y-3">
          <DemoField label="Current Password" placeholder="••••••••" />
          <DemoField label="New Password" placeholder="••••••••" />
          <DemoField label="Confirm Password" placeholder="••••••••" />
          <button className="w-full bg-blue-600 text-white py-3 rounded-2xl font-bold mt-2">Update Password</button>
        </div>
      )
    },
    pin: {
      title: 'Change Agent PIN',
      body: (
        <div className="text-center">
          <p className="text-gray-600 mb-5">Enter your 4-digit Agent PIN</p>
          <div className="flex gap-3 justify-center mb-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="w-14 h-14 rounded-2xl border-2 border-blue-300 bg-blue-50 flex items-center justify-center text-2xl font-bold text-blue-500">&bull;</div>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => (
              <div key={n} className="h-14 bg-gray-100 rounded-2xl flex items-center justify-center text-xl font-bold">{n}</div>
            ))}
            <div />
            <div className="h-14 bg-gray-100 rounded-2xl flex items-center justify-center text-xl font-bold">0</div>
            <div className="h-14 flex items-center justify-center">&larr;</div>
          </div>
        </div>
      )
    },
    sessions: {
      title: 'Active Sessions',
      body: (
        <div className="space-y-3">
          {[{ device: 'iPhone 14 Pro', loc: 'Kochi, Kerala', time: 'Active now', current: true }].map((s, i) => (
            <div key={i} className="bg-gray-50 rounded-2xl p-4 flex gap-3">
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${s.current ? 'bg-green-100' : 'bg-gray-200'}`}>
                <Smartphone size={18} className={s.current ? 'text-green-600' : 'text-gray-600'} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-bold text-sm">{s.device}</p>
                  {s.current && <span className="bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full text-[9px] font-bold">CURRENT</span>}
                </div>
                <p className="text-xs text-gray-500 mt-0.5">{s.loc} &middot; {s.time}</p>
              </div>
            </div>
          ))}
        </div>
      )
    },
    history: {
      title: 'Login History',
      body: (
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {[
            { device: 'iPhone 14 Pro', loc: 'Kochi', time: 'Today, 10:32 AM', ok: true },
            { device: 'iPhone 14 Pro', loc: 'Kochi', time: 'Yesterday, 9:00 AM', ok: true },
            { device: 'Unknown', loc: 'Mumbai', time: 'Oct 22, 3:12 AM', ok: false },
            { device: 'iPhone 14 Pro', loc: 'Kochi', time: 'Oct 21, 8:00 AM', ok: true },
          ].map((h, i) => (
            <div key={i} className="bg-gray-50 rounded-xl p-3 flex gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${h.ok ? 'bg-green-100' : 'bg-red-100'}`}>
                {h.ok ? <CheckCircle size={14} className="text-green-600" /> : <AlertTriangle size={14} className="text-red-600" />}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm">{h.device}</p>
                <p className="text-xs text-gray-500">{h.loc} &middot; {h.time}</p>
                {!h.ok && <p className="text-xs text-red-500 font-bold mt-1">Login blocked</p>}
              </div>
            </div>
          ))}
        </div>
      )
    },
    license: {
      title: 'Agent License',
      body: (
        <div>
          <div className="bg-green-50 border border-green-200 rounded-2xl p-4 flex gap-3 mb-4">
            <CheckCircle className="text-green-500 shrink-0" />
            <div>
              <p className="font-bold text-green-700">License Verified</p>
              <p className="text-sm text-green-600 mt-1">Authorized by Kerala State Lottery Department</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl divide-y border border-gray-100">
            <DemoDataRow label="License No." value="KSL-2024-88291020" />
            <DemoDataRow label="Issue Date" value="Jan 15, 2024" />
            <DemoDataRow label="Valid Till" value="Jan 14, 2029" />
            <DemoDataRow label="Jurisdiction" value="North Central District" />
            <DemoDataRow label="Status" value="Active" valueColor="green" />
          </div>
        </div>
      )
    },
    kyc: {
      title: 'KYC Documents',
      body: (
        <div className="space-y-3">
          {[
            { name: 'Aadhaar Card', num: '**** **** 4521', status: 'Verified' },
            { name: 'PAN Card', num: 'ABC****4F', status: 'Verified' },
            { name: 'Agent ID Proof', num: 'KSL-2024', status: 'Verified' },
          ].map((d, i) => (
            <div key={i} className="bg-gray-50 rounded-2xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="text-green-500" size={18} />
              </div>
              <div className="flex-1">
                <p className="font-bold text-sm">{d.name}</p>
                <p className="text-xs text-gray-500">{d.num}</p>
              </div>
              <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-bold">{d.status}</span>
            </div>
          ))}
        </div>
      )
    },
    privacy: {
      title: 'Privacy Policy',
      body: (
        <div className="text-sm text-gray-700 space-y-3 max-h-96 overflow-y-auto">
          <p><b>Last Updated: October 2024</b></p>
          <p>Mini Lottos Agent Portal is committed to protecting agent and player privacy. We collect minimal data necessary for ticket sales operations.</p>
          <p><b>Data We Collect:</b> Agent profile, license info, transaction records, player registration data.</p>
          <p><b>Data Security:</b> All data encrypted with AES-256, stored on government-approved secure servers.</p>
          <p><b>Compliance:</b> We follow Kerala State Lottery Department guidelines and Indian IT Act 2000.</p>
        </div>
      )
    },
    terms: {
      title: 'Terms of Service',
      body: (
        <div className="text-sm text-gray-700 space-y-3 max-h-96 overflow-y-auto">
          <p><b>Agent Terms of Service &mdash; October 2024</b></p>
          <p>By using this portal, you agree to act as an authorized agent of Kerala State Lottery.</p>
          <p><b>Responsibilities:</b> Sell tickets only to verified players above 18, maintain accurate records, report winning tickets within 24 hours.</p>
          <p><b>Commission:</b> 5% on every ticket sold, paid weekly.</p>
          <p><b>Violations:</b> Any breach may result in license suspension.</p>
        </div>
      )
    },
    conduct: {
      title: 'Agent Code of Conduct',
      body: (
        <div className="text-sm text-gray-700 space-y-3 max-h-96 overflow-y-auto">
          <p><b>1. Ethical Sales:</b> Never sell tickets to minors or impaired individuals.</p>
          <p><b>2. Honest Dealings:</b> Always provide accurate information about tickets and prizes.</p>
          <p><b>3. Player Confidentiality:</b> Keep all player data private and secure.</p>
          <p><b>4. Prize Claims:</b> Assist winners promptly with claim procedures.</p>
          <p><b>5. Reporting:</b> Report any suspicious activity to authorities immediately.</p>
        </div>
      )
    },
    deactivate: {
      title: 'Account Deactivation',
      body: (
        <div>
          <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-4 flex gap-3 mb-4">
            <AlertTriangle className="text-red-500 shrink-0" />
            <div>
              <p className="font-bold text-red-700">Contact Administrator</p>
              <p className="text-sm text-red-600 mt-1">Account deactivation requires approval from Kerala State Lottery Department.</p>
            </div>
          </div>
          <DemoField label="Reason for Deactivation" placeholder="Please explain..." textarea />
          <DemoField label="Contact Email" placeholder="admin@kslottery.gov.in" />
          <button className="w-full mt-4 bg-red-500 text-white py-3 rounded-2xl font-bold">Submit Request</button>
        </div>
      )
    },
  }[type];

  if (!content) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center" onClick={onClose}>
      <div onClick={e => e.stopPropagation()} className="bg-white w-full max-w-[430px] rounded-t-3xl max-h-[85vh] overflow-y-auto animate-slideup">
        <div className="sticky top-0 bg-white border-b border-gray-100 p-4 flex items-center justify-between">
          <h2 className="text-lg font-bold">{content.title}</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold">&times;</button>
        </div>
        <div className="p-5">{content.body}</div>
      </div>
    </div>
  );
}

function DemoField({ label, placeholder, textarea }) {
  return (
    <div className="mb-3">
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
