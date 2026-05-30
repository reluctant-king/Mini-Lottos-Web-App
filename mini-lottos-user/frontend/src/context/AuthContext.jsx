import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('ml_user_token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      api.get('/auth/me')
        .then((res) => setUser(res.data.user || res.data))
        .catch(() => {
          localStorage.removeItem('ml_user_token');
          setToken(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [token]);

  const sendOtp = async (phone) => {
    const res = await api.post('/auth/send-otp', { phone });
    return res.data;
  };

  const verifyOtp = async (phone, code) => {
    const res = await api.post('/auth/verify-otp', { phone, code });
    const t = res.data.token;
    localStorage.setItem('ml_user_token', t);
    setToken(t);
    setUser(res.data.user || res.data);
    return res.data;
  };

  const logout = () => {
    localStorage.removeItem('ml_user_token');
    setToken(null);
    setUser(null);
  };

  const refreshUser = async () => {
    try {
      const res = await api.get('/auth/me');
      setUser(res.data.user || res.data);
    } catch (e) {
      console.error('refresh user failed', e);
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, sendOtp, verifyOtp, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthContext;
