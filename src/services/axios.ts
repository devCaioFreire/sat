import axios from 'axios';

// declare global {
//   interface Window {
//     sessionStorage: Storage;
//   }
// }

export const AxiosNode = axios.create({
  // baseURL: 'https://soft-api.onrender.com',
  // url: 'http://localhost:3333',
  baseURL: 'http://177.131.142.37:8099',
  // baseURL: 'http://177.131.142.37:3333',
  // baseURL: 'http://192.168.0.183:3333',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
    'Access-Control-Allow-Credentials': 'true'
  }
});

// Interceptor de requisição para adicionar o token dinamicamente
AxiosNode.interceptors.request.use(config => {
  const token = sessionStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});