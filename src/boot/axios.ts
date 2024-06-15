import { useAuthenStore } from '@/stores/authenStore';
import { AppAuthRefeshTokenKey, DefaultApiCLient, LocaleKey } from '@/utils/constant';
import axios, { AxiosInstance } from 'axios';
import { Cookies } from 'quasar';
import { boot } from 'quasar/wrappers';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $api: AxiosInstance;
  }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({
  // baseURL: process.env.NODE_ENV == 'development' ? 'http://192.168.7.249:8080' : 'https://api.example.com',
  baseURL: process.env.API,
  withCredentials: false,
  timeout: process.env.TIME_OUT ? +process.env.TIME_OUT : 3 * 60000, // 60000 = 1 minute, 0 = no timeout
  headers: {
    // Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
    'Accept-Apiclient': process.env.API_CLIENT || DefaultApiCLient
    // 'Accept-Language': DefaultLocale,
  },
  validateStatus: (status) => status < 400 // Resolve only if the status code is less than 400
  // validateStatus: (status) => status <= 500 // Resolve only if the status code is less than 500
});


// for multiple requests
let isRefreshing = false;
let failedQueue: any[] = [];
const processQueue = (error: any, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

export default boot(({ app, redirect, ssrContext, store }) => {
  const authenStore = useAuthenStore(store);
  // Check if interceptors are already set up
  const isServer = process.env.SERVER;
  if (!isServer) {
    api.interceptors.request.use(async (config) => {
      const ck = isServer ? Cookies.parseSSR(ssrContext) : Cookies;
      // const jwtKey = ck.get(AppAuthTokenKey);
      config.headers['Accept-Language'] = ck.get(LocaleKey);
      console.log('appAxiosInstance.interceptors.request', config.url);
      return config;
    }, error => {
      return Promise.reject(error);
    });
    api.interceptors.response.use(function (response) {
      return response;
    }, async (error) => {

      const originalRequest = error.config;

      if (error.response && error.response.status === 403 && !originalRequest._retry) {

        if (isRefreshing) {
          return new Promise(function (resolve, reject) {
            console.warn('isRefreshing > failedQueue.push', originalRequest.url);
            failedQueue.push({ resolve, reject });
          }).then(token => {
            originalRequest.headers['Authorization'] = 'Bearer ' + token;
            return api(originalRequest);
          }).catch(err => {
            return Promise.reject(err);
          });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        const ck = isServer ? Cookies.parseSSR(ssrContext) : Cookies;
        const refreshToken = ck.get(AppAuthRefeshTokenKey);
        originalRequest.baseURL = process.env.API;
        return new Promise(function (resolve, reject) {
          api.post('/api/auth/refreshToken', {
            refreshToken: {
              refreshToken: refreshToken
            }
          })
            .then(async ({ data }) => {
              if (data && data.refreshToken && data.authenticationToken) {
                await authenStore.setRefreshTokenCookie(ssrContext, data);
                api.defaults.headers.common['Authorization'] = 'Bearer ' + data.authenticationToken;
                originalRequest.headers['Authorization'] = 'Bearer ' + data.authenticationToken;
                processQueue(null, data.authenticationToken);
                resolve(api(originalRequest));
              }
            })
            .catch((err) => {
              processQueue(err, null);
              redirect({ path: '/auth/login' });
              resolve(err);
            })
            .finally(() => {
              isRefreshing = false;
            });
        });
      }

      return Promise.reject(error);
    });
  }
  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$api = api;
});

export { api };
