import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';



export const publicApi = axios.create({
  baseURL: 'https://751ue73p4j.execute-api.ap-south-1.amazonaws.com/v1',
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
  baseURL: 'https://751ue73p4j.execute-api.ap-south-1.amazonaws.com/v1', // change later
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

privateApi.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('idToken');
    console.log("idToken  ", token)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  error => Promise.reject(error)
);



let isRefreshing = false;
let failedQueue: {
  resolve: (token: string) => void;
  reject: (error: any) => void;
}[] = [];

const processQueue = (
  error: any,
  token: string | null = null
) => {
  failedQueue.forEach(promise => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token as string);
    }
  });

  failedQueue = [];
};

privateApi.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return privateApi(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = await AsyncStorage.getItem('refreshToken');
         // i will put this url in env
         
        const { data } = await axios.post(
          'https://751ue73p4j.execute-api.ap-south-1.amazonaws.com/v1/auth/refresh_token',
          { refreshToken }
        );

        await AsyncStorage.setItem(
          'accessToken',
          data.accessToken
        );

        privateApi.defaults.headers.Authorization = `Bearer ${data.accessToken}`;
        processQueue(null, data.accessToken);

        return privateApi(originalRequest);
      } catch (err) {
        processQueue(err, null);

        await AsyncStorage.multiRemove([
          'accessToken',
          'refreshToken',
        ]);

        // store.dispatch(logout())

        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

