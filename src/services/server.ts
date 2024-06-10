import axios from 'axios';

const baseURL = process.env.API_URL;

const server = axios.create({ baseURL });

server.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export { server };
