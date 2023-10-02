import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const API_BASE = process.env.BASE_TEST_API;

export const AxiosNode = axios.create({
  // baseURL: 'https://soft-api.onrender.com',
  baseURL: 'http://localhost:3333',
  headers: {
    'Content-Type': 'application/json',
  }
});