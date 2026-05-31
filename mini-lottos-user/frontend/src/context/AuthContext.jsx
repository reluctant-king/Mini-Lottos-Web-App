import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../api/axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const initAuth = useCallback(async () => {
    const token = localStorage.getItem('ml_user_token');
    if (!token) {
      setLoading(false);
      return;
    }
    try {
      const res = await api.get('/auth/me');
      setUser(res.data.user || res.data);
    } catch {
      localStorage.removeItem('ml_user_token');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  const login = useCallback((token, userData) => {
    localStorage.setItem('ml_user_token', token);
    setUser(userData);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('ml_user_token');
    setUser(null);
  }, []);

  const refreshUser = useCallback(async () => {
    try {
      const { data } = await api.get('/auth/me');
      const userData = data.user || data;
      setUser(userData);
      return userData;
    } catch (err) {
      console.error('Refresh user failed:', err);
      return null;
    }
  }, []);

  const sendOtp = useCallback(async (phone) => {
    const res = await api.post('/auth/send-otp', { phone });
    return res.data;
  }, []);

  const verifyOtp = useCallback(async (phone, code) => {
    const res = await api.post('/auth/verify-otp', { phone, code });
    if (res.data.token && res.data.user) {
      login(res.data.token, res.data.user);
    }
    return res.data;
  }, [login]);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, refreshUser, sendOtp, verifyOtp }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthContext;
