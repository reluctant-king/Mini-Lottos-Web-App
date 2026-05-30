import { createContext, useContext, useState, useCallback } from 'react';
import api from '../api/axios';

const DataContext = createContext();

export function DataProvider({ children }) {
  const [tickets, setTickets] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [winners, setWinners] = useState([]);

  const refreshTickets = useCallback(async () => {
    try {
      const res = await api.get('/tickets');
      setTickets(res.data.tickets || res.data || []);
    } catch (e) {
      console.error('refreshTickets error', e);
    }
  }, []);

  const refreshNotifications = useCallback(async () => {
    try {
      const res = await api.get('/notifications');
      setNotifications(res.data.notifications || res.data || []);
    } catch (e) {
      console.error('refreshNotifications error', e);
    }
  }, []);

  const playGame = useCallback(async (gameId) => {
    const res = await api.post('/rewards/play', { gameId });
    return res.data;
  }, []);

  const redeemCoins = useCallback(async (coins) => {
    const res = await api.post('/rewards/redeem', { coins });
    return res.data;
  }, []);

  return (
    <DataContext.Provider value={{ tickets, notifications, winners, refreshTickets, refreshNotifications, playGame, redeemCoins }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}

export default DataContext;
