import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const API_BASE = process.env.BASE_TEST_API;

export const AxiosNode = axios.create({
  baseURL: 'https://soft-api.onrender.com',
  // baseURL: 'http://192.168.0.183:3333',
  headers: {
    'Content-Type': 'application/json',
  }
});