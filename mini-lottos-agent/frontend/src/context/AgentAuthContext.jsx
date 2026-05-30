import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

const AgentAuthContext = createContext();

export function AgentAuthProvider({ children }) {
  const [agent, setAgent] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('ml_agent_token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      api.get('/auth/me')
        .then((res) => setAgent(res.data.agent || res.data))
        .catch(() => {
          localStorage.removeItem('ml_agent_token');
          setToken(null);
          setAgent(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [token]);

  const login = useCallback(async (agentId, password) => {
    const res = await api.post('/auth/login', { agentId, password });
    const { token: newToken, agent: agentData } = res.data;
    localStorage.setItem('ml_agent_token', newToken);
    setToken(newToken);
    setAgent(agentData);
    return agentData;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('ml_agent_token');
    setToken(null);
    setAgent(null);
  }, []);

  const refreshAgent = useCallback(async () => {
    try {
      const res = await api.get('/auth/me');
      setAgent(res.data.agent || res.data);
    } catch {
      logout();
    }
  }, [logout]);

  return (
    <AgentAuthContext.Provider value={{ agent, token, loading, login, logout, refreshAgent }}>
      {children}
    </AgentAuthContext.Provider>
  );
}

export function useAgentAuth() {
  const context = useContext(AgentAuthContext);
  if (!context) throw new Error('useAgentAuth must be used within AgentAuthProvider');
  return context;
}
