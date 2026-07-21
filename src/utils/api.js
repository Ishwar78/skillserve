import axios from 'axios';

export const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL,
});

// Request interceptor to add token to headers
api.interceptors.request.use(
  (config) => {
    const adminInfo = localStorage.getItem('adminInfo');
    if (adminInfo) {
      const parsedInfo = JSON.parse(adminInfo);
      if (parsedInfo.token) {
        config.headers.Authorization = `Bearer ${parsedInfo.token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
