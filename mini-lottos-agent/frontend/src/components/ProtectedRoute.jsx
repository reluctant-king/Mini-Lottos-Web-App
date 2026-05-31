import { Navigate } from 'react-router-dom';
import { useAgentAuth } from '../context/AgentAuthContext';
import Loader from './Loader';

export default function ProtectedRoute({ children }) {
  const { agent, loading } = useAgentAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!agent) {
    return <Navigate to="/" replace />;
  }

  return children;
}
