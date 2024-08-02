// import axios, { AxiosResponse } from 'axios'
import { Token } from '@/utils/localStorage';
import axios, { AxiosResponse } from 'axios';

let isRefreshing = false;

let failedQueue: any[] = [];

const baseURL: string = String(process.env.REACT_APP_LOCAL_CLIENT_URL);
const token = new Token();

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });

  failedQueue = [];
};

const axiosClient = axios.create({
  baseURL: baseURL,
});

// Request Interceptor
axiosClient.interceptors.request.use(
  (config) => {
    const access_token: string = token.getAccessToken();
    if (access_token) {
      config.headers['Authorization'] = `Bearer ${access_token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// // Response Interceptor
axiosClient.interceptors.response.use(
  (response) => handleResponse(response),
  (error) => handleErrorResponse(error),
);

const handleErrorResponse = async (error: any) => {
  const originalRequest = error.config;
  const isAuthError = [400, 401, 403].includes(error?.response?.status);

  if (isAuthError && !originalRequest._retry) {
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then((token) => {
          originalRequest.headers['Authorization'] = `Bearer ${token}`;
          return axiosClient(originalRequest);
        })
        .catch((err) => Promise.reject(err));
    }

    originalRequest._retry = true;

    isRefreshing = true;

    const refreshToken = token.getRefreshToken();
    try {
      const { data } = await axios.post(`${baseURL}/auth/refresh-token`, {
        refresh_token: refreshToken,
      });

      token.setAccessToken(data.access_token);

      token.setRefreshToken(data.refresh_token);

      axios.defaults.headers.common['Authorization'] = `Bearer ${data.access_token}`;
      originalRequest.headers['Authorization'] = `Bearer ${data.access_token}`;
      processQueue(null, data.access_token);

      return axiosClient(originalRequest);
    } catch (err) {
      processQueue(err, null);
      return Promise.reject(err);
    } finally {
      isRefreshing = false;
    }
  }

  return handleError(error);
};

const handleResponse = (response: AxiosResponse<any>) => response;

const handleError = (error: any) => {
  const { data } = error.response;
  console.error({ error });
  return data;
};

export default axiosClient;
