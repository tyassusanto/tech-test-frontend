import axios from 'axios';
import { Modal } from 'antd';

const getToken = () => localStorage.getItem('token');

const handleSessionExpired = () => {
  Modal.error({
    title: "Sesi anda sudah berakhir",
    content: "Silakan login kembali untuk melanjutkan.",
    onOk: () => {
      localStorage.clear();
      window.location.href = '/login';
    },
  });
};

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || 'http://localhost:8080/api',
});

apiClient.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      handleSessionExpired();
    }
    return Promise.reject(error);
  }
);

export default apiClient;
