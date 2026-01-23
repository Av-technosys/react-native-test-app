
import axios from 'axios';

export const BASE_URL ='https://751ue73p4j.execute-api.ap-south-1.amazonaws.com/v1';

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
