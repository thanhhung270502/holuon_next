// import axios, { AxiosResponse } from 'axios'
import { Token } from '@/utils/localStorage';
import axios, { AxiosResponse } from 'axios';

let isRefreshing = false;

let failedQueue: any[] = [];

const baseURL: string = String(process.env.REACT_APP_LOCAL_SERVER_URL);
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
      console.log(refreshToken);
      const config = {
        headers: { Authorization: `Bearer ${refreshToken}` },
      };

      const { data } = await axios.post(`${baseURL}/auth/refresh-token`, null, config);
      console.log(data.data);

      token.setAccessToken(data.data.accessToken);

      token.setRefreshToken(data.data.refreshToken);

      axios.defaults.headers.common['Authorization'] = `Bearer ${data.data.accessToken}`;
      originalRequest.headers['Authorization'] = `Bearer ${data.data.accessToken}`;
      processQueue(null, data.data.accessToken);

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

export const getInfo = async () => {
  return await axiosClient
    .get(`${process.env.REACT_APP_LOCAL_SERVER_URL}/auth/me`)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
      return error.response;
    });
};

export default axiosClient;
