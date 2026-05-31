import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AgentAuthProvider } from './context/AgentAuthContext';
import { ToastProvider } from './components/Toast';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ScanTicket from './pages/ScanTicket';
import CreateEntry from './pages/CreateEntry';
import LinkUser from './pages/LinkUser';
import RegisterUser from './pages/RegisterUser';
import LinkedSuccess from './pages/LinkedSuccess';
import TicketRecords from './pages/TicketRecords';
import TicketDetail from './pages/TicketDetail';
import Reports from './pages/Reports';
import WinnerAlert from './pages/WinnerAlert';
import Settings from './pages/Settings';
import EditAgentProfile from './pages/EditAgentProfile';
import UsersList from './pages/UsersList';
import AgentLanguage from './pages/AgentLanguage';
import AgentPrivacy from './pages/AgentPrivacy';
import AgentHelp from './pages/AgentHelp';

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AgentAuthProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/scan" element={<ProtectedRoute><ScanTicket /></ProtectedRoute>} />
            <Route path="/create-entry" element={<ProtectedRoute><CreateEntry /></ProtectedRoute>} />
            <Route path="/link" element={<ProtectedRoute><LinkUser /></ProtectedRoute>} />
            <Route path="/register-user" element={<ProtectedRoute><RegisterUser /></ProtectedRoute>} />
            <Route path="/linked-success" element={<ProtectedRoute><LinkedSuccess /></ProtectedRoute>} />
            <Route path="/tickets" element={<ProtectedRoute><TicketRecords /></ProtectedRoute>} />
            <Route path="/tickets/:id" element={<ProtectedRoute><TicketDetail /></ProtectedRoute>} />
            <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
            <Route path="/winner-alert/:id" element={<ProtectedRoute><WinnerAlert /></ProtectedRoute>} />
            <Route path="/users" element={<ProtectedRoute><UsersList /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            <Route path="/settings/edit" element={<ProtectedRoute><EditAgentProfile /></ProtectedRoute>} />
            <Route path="/settings/language" element={<ProtectedRoute><AgentLanguage /></ProtectedRoute>} />
            <Route path="/settings/privacy" element={<ProtectedRoute><AgentPrivacy /></ProtectedRoute>} />
            <Route path="/settings/help" element={<ProtectedRoute><AgentHelp /></ProtectedRoute>} />
          </Routes>
        </AgentAuthProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}
