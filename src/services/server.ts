import axios from 'axios';

const baseURL = process.env.API_URL;

const api = axios.create({ baseURL });

api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export { api };
