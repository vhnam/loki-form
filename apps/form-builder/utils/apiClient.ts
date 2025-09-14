import axios from 'axios';

import { PUBLIC_ROUTES } from '@/constants/routes';

import { useAuthStore } from '@/stores/auth';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT || 'http://localhost:4000',
  withCredentials: true,
  headers: {
    common: {
      'Content-Type': 'application/json',
    },
  },
});

apiClient.interceptors.request.use((config) => {
  const { token } = useAuthStore.getState();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().clearAuth();
      window.location.href = PUBLIC_ROUTES.auth.signIn;
    }
    return Promise.reject(error);
  }
);

export default apiClient;
