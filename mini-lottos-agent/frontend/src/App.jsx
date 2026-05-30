import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AgentAuthProvider } from './context/AgentAuthContext';
import { ToastProvider } from './components/Toast';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ScanTicket from './pages/ScanTicket';
import CreateEntry from './pages/CreateEntry';
import LinkUser from './pages/LinkUser';
import RegisterUser from './pages/RegisterUser';
import LinkedSuccess from './pages/LinkedSuccess';
import TicketRecords from './pages/TicketRecords';
import Reports from './pages/Reports';
import WinnerAlert from './pages/WinnerAlert';
import Settings from './pages/Settings';

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AgentAuthProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/scan" element={<ScanTicket />} />
            <Route path="/create-entry" element={<CreateEntry />} />
            <Route path="/link" element={<LinkUser />} />
            <Route path="/register-user" element={<RegisterUser />} />
            <Route path="/linked-success" element={<LinkedSuccess />} />
            <Route path="/tickets" element={<TicketRecords />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/winner-alert/:id" element={<WinnerAlert />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </AgentAuthProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}
