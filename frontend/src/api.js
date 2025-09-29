import axios from 'axios';

// Create an instance of axios with a base URL for your backend
const api = axios.create({
  baseURL: 'http://localhost:4000/api' // Your backend URL
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default api;
