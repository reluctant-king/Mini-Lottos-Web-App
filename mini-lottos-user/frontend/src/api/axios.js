import axios from 'axios';

const api = axios.create({
  baseURL: 'https://mini-lottos-web-app.onrender.com/api',
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('ml_user_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('ml_user_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
