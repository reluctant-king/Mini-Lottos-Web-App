import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { ToastProvider } from './components/Toast';
import Splash from './pages/Splash';
import Login from './pages/Login';
import Verify from './pages/Verify';
import Home from './pages/Home';
import Tickets from './pages/Tickets';
import TicketDetail from './pages/TicketDetail';
import Winning from './pages/Winning';
import ClaimDetails from './pages/ClaimDetails';
import Results from './pages/Results';
import Rewards from './pages/Rewards';
import RewardsBalance from './pages/RewardsBalance';
import Help from './pages/Help';
import Notifications from './pages/Notifications';
import Profile from './pages/Profile';

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <DataProvider>
            <Routes>
              <Route path="/" element={<Splash />} />
              <Route path="/login" element={<Login />} />
              <Route path="/verify" element={<Verify />} />
              <Route path="/home" element={<Home />} />
              <Route path="/tickets" element={<Tickets />} />
              <Route path="/tickets/:id" element={<TicketDetail />} />
              <Route path="/winning/:id" element={<Winning />} />
              <Route path="/winning/:id/claim" element={<ClaimDetails />} />
              <Route path="/results" element={<Results />} />
              <Route path="/rewards" element={<Rewards />} />
              <Route path="/rewards/balance" element={<RewardsBalance />} />
              <Route path="/help" element={<Help />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </DataProvider>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}
