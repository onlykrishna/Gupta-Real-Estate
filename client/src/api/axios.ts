/// <reference types="vite/client" />
import axios from 'axios';
import { useAuthStore } from '../store/authStore';

// Create a custom Axios instance
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5001/api',
  withCredentials: true, // Crucial for sending/receiving httpOnly cookies
});

// Request interceptor: attach token if we were using localStorage (fallback)
axiosInstance.interceptors.request.use(
  (config) => {
    // Note: Since we prefer httpOnly cookies, cookies are sent automatically.
    // However, if we fall back to a Bearer token in localStorage:
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor: gracefully handle 401 Unauthorized errors globally
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // If the server returns a 401 error, the user token is invalid/expired.
    if (error.response && error.response.status === 401) {
      // Clear local auth state
      useAuthStore.getState().logout();
      
      // Redirect to login page
      // Make sure not to redirect if already on login page to avoid loops
      if (window.location.pathname !== '/admin/login') {
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
