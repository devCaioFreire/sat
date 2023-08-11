import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const API_BASE = process.env.BASE_TEST_API;

export const AxiosProduct = axios.create({
  baseURL: 'http://localhost:8081/datasnap/rest/TSMProdutos/GetProdutos/',
  headers: {
    'Content-Type': 'application/json',
  }
});

export const AxiosAuth = axios.create({
  baseURL: 'http://localhost:8083/datasnap/rest/TSMIdentificacao/Login',
  headers: {
    'Content-Type': 'application/json',
  }
});

export const AxiosNode = axios.create({
  baseURL: 'http://localhost:3333',
  headers: {
    'Content-Type': 'application/json',
  }
});