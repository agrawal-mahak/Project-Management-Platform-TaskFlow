import axios from "axios";

const axiosInstance = axios.create({
  baseURL: '/api',
  headers: {
    "Content-Type": "application/json"
  },
});

// Request interceptor: attach JWT automatically .
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export default axiosInstance;