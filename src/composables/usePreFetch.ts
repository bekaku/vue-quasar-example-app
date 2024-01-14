import { api } from 'boot/axios';
import { Cookies } from 'quasar';
import { LocaleKey, AppAuthTokenKey, SucureDeviceIdAtt, AppAuthRefeshTokenKey, ExpireCookieDays } from '@/utils/constant';
import { RequestType } from '@/types/common';
import { isAppException } from '@/utils/appUtil';
import { useExceptionStore } from '@/stores/exceptionStore';
import { AxiosResponse } from 'axios';
import { RefreshTokenResponse } from '@/types/models';
import { addDateByDays } from '@/utils/dateUtil';
import { canRefreshToken } from '@/utils/jwtUtil';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const usePreFetch = (ssrContext: any, redirect: any) => {
  const ck: any = process.env.SERVER ? Cookies.parseSSR(ssrContext) : Cookies;
  const exceptionStore = useExceptionStore();

  const callAxios = async <T>(req: RequestType): Promise<T> => {
    //TODO implement refresh token hear 
    await refeshTokenCheckProcess();
    return new Promise(async (resolve, /*reject*/) => {
      const response = await callAxiosProcess<T>(req);
      if (isAppException(response.data)) {
        // exceptionStore.setException(response.data);
        // redirect({
        //   name: 'ErrorPage',
        //   params: {
        //     code: response.data.status,
        //     message: response.data.message,
        //   },
        // });
        // redirect({
        //   path: `/error?code=${response.data.status}&message=${response.data.message}`,
        // });
        // redirect({ path: '/error' })
      }
      resolve(response.data as T);
    });
  };
  const refeshTokenCheckProcess = async () => {
    return new Promise(async (resolve, /*reject*/) => {
      const token = ck.get(AppAuthTokenKey);
      if (token) {
        const refreshIt = await canRefreshToken(token);
        if (refreshIt) {
          await refeshTokenToServerProcess();
        }
      }
      resolve(true);
    });
  };
  const refeshTokenToServerProcess = async () => {
    const response = await callAxiosProcess<RefreshTokenResponse>({
      API: '/api/auth/refreshToken',
      method: 'POST',
    });
    if (response && response.status == 200 && response.data && response.data.refreshToken && response.data.authenticationToken) {
      const isDevMode = process.env.NODE_ENV == 'development';
      ck.set(SucureDeviceIdAtt, response.data.refreshToken, {
        expires: addDateByDays(ExpireCookieDays),
        path: '/',
        domain: isDevMode ? undefined : 'givedeefive.com',
        secure: true,
        httpOnly: true,
        sameSite: 'None'
      });

      ck.set(AppAuthRefeshTokenKey, response.data.refreshToken, {
        expires: addDateByDays(ExpireCookieDays),
        path: '/',
        domain: isDevMode ? undefined : 'givedeefive.com',
        secure: !isDevMode
      });

      ck.set(AppAuthTokenKey, response.data.authenticationToken, {
        expires: addDateByDays(ExpireCookieDays),
        path: '/',
        domain: isDevMode ? undefined : 'givedeefive.com',
        secure: !isDevMode
      });
    }
    return new Promise(async (resolve, /*reject*/) => {
      resolve(true);
    });
  };

  const callAxiosProcess = <T>(req: RequestType): Promise<AxiosResponse<T>> => {
    return new Promise((resolve, /*reject*/) => {
      if (api.defaults.headers != null) {
        api.defaults.headers.common['Accept-Language'] = ck.get(LocaleKey);
        api.defaults.headers.common.Authorization = `Bearer ${ck.get(
          AppAuthTokenKey
        )}`;
      }
      const secureDeviceId = ck.get(AppAuthRefeshTokenKey);
      const _gd5_secure_jid = ck.get(SucureDeviceIdAtt);
      // api.defaults.headers.Cookie = 'ookie1=value; cookie2=value; cookie3=value;';
      if (_gd5_secure_jid) {
        api.defaults.headers.Cookie = `${SucureDeviceIdAtt}=${_gd5_secure_jid};`;
      } else if (secureDeviceId) {
        api.defaults.headers.Cookie = `${SucureDeviceIdAtt}=${secureDeviceId};`;
      }
      // api.defaults.headers['Accept-Language'] = ck.get(LocaleKey);
      // console.log('callAxiosProcess : defaults', api.defaults);
      if (req.baseURL) {
        api.defaults.baseURL = req.baseURL;
      } else {
        api.defaults.baseURL = process.env.API;
      }
      if (process.env.NODE_ENV == 'development') {
        console.log(`usePrefecth > api ${api.defaults.baseURL}${req.API}`);
      }
      api({
        method: req.method,
        url: req.API,
        data: req.body ? req.body : undefined,
      })
        .then((response) => {
          resolve(response as AxiosResponse<T>);
        })
        .catch((error) => {
          exceptionStore.setException({
            status: error.code,
            message: error.message,
          });
          // redirect({
          //   name: 'ErrorPage',
          //   params: { code: error.code, message: error.message },
          // });
          // redirect({ path: '/error' })
          const exeption: any = {
            status: error.code,
            message: error.message,
            errors: 'Error'
          }
          resolve(exeption);
        });
    });
  };

  return {
    callAxios,
  };
};
