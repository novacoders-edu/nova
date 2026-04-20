import axios from "axios";

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/'
});

// Add a request interceptor to attach the token
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;