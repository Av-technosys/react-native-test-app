/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { decodeIdToken } from '../utils/decodeToken';

const BASE_URL ='https://751ue73p4j.execute-api.ap-south-1.amazonaws.com/v1';

const REFRESH_THRESHOLD_SEC = 120;

export const publicApi = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

publicApi.interceptors.request.use(config => {
  delete config.headers.Authorization;
  delete config.headers.authorization;
  return config;
});

export const privateApi = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

let isRefreshing = false;
let failedQueue: {
  resolve: (token: string) => void;
  reject: (error: any) => void;
}[] = [];

const processQueue = (error: any, token: string | null) => {
  failedQueue.forEach(p => {
    if (error) {
      p.reject(error);
    } else {
      p.resolve(token as string);
    }
  });
  failedQueue = [];
};

const refreshIdToken = async () => {
  const refreshToken = await AsyncStorage.getItem('refreshToken');
  const username = await AsyncStorage.getItem('username');

  if (!refreshToken || !username) {
    throw new Error('Missing refresh credentials');
  }

  const { data } = await axios.post(
    `${BASE_URL}/auth/refresh_token`,
    {
      refreshToken,
      username,
    },
  );

  const newIdToken =
    data?.response?.AuthenticationResult?.IdToken;

  if (!newIdToken) {
    throw new Error('Invalid refresh response');
  }

  await AsyncStorage.setItem('idToken', newIdToken);

  return newIdToken;
};

privateApi.interceptors.request.use(
  async config => {
    const idToken = await AsyncStorage.getItem('idToken');

    if (!idToken) {
      return config;
    }

    const decoded = decodeIdToken(idToken);
    const now = Math.floor(Date.now() / 1000);
    const expiresIn = decoded.exp - now;

    if (expiresIn <= REFRESH_THRESHOLD_SEC) {
      if (!isRefreshing) {
        isRefreshing = true;

        try {
          const newToken = await refreshIdToken();
          processQueue(null, newToken);
        } catch (err) {
          processQueue(err, null);
          throw err;
        } finally {
          isRefreshing = false;
        }
      }

      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve: token => {
            config.headers.Authorization = `Bearer ${token}`;
            resolve(config);
          },
          reject,
        });
      });
    }

    config.headers.Authorization = `Bearer ${idToken}`;
    return config;
  },
  error => Promise.reject(error),
);

privateApi.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes('/auth/refresh_token')
    ) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: token => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(privateApi(originalRequest));
            },
            reject,
          });
        });
      }

      isRefreshing = true;

      try {
        const newToken = await refreshIdToken();
        processQueue(null, newToken);

        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return privateApi(originalRequest);
      } catch (err) {
        processQueue(err, null);
        await AsyncStorage.multiRemove(['idToken', 'refreshToken']);
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);
