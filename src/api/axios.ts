
import axios from 'axios';
import Config from 'react-native-config';

const BASE_URL = Config.BACKEND_URL

export const publicApi = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

publicApi.interceptors.request.use(config => {
  delete config.headers.Authorization;
  delete config.headers.authorization;
  return config;
});

export const privateApi = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});
