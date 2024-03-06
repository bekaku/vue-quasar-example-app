import { api } from 'boot/axios';
import { Cookies } from 'quasar';
import { LocaleKey, AppAuthTokenKey, SucureDeviceIdAtt, AppAuthRefeshTokenKey, ExpireCookieDays } from '@/utils/constant';
import { RequestType } from '@/types/common';
import { isAppException } from '@/utils/appUtil';
import { useExceptionStore } from '@/stores/exceptionStore';
import { AxiosResponse } from 'axios';
export const usePreFetch = (ssrContext: any, redirect: any) => {
  const ck: any = process.env.SERVER ? Cookies.parseSSR(ssrContext) : Cookies;
  const exceptionStore = useExceptionStore();

  const callAxios = async <T>(req: RequestType): Promise<T> => {
    //TODO implement refresh token hear 
    // await refeshTokenCheckProcess();
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
  const callAxiosProcess = <T>(req: RequestType): Promise<AxiosResponse<T>> => {
    return new Promise((resolve, /*reject*/) => {
      if (api.defaults.headers != null) {
        api.defaults.headers.common['Accept-Language'] = ck.get(LocaleKey);
        api.defaults.headers.common.Authorization = `Bearer ${ck.get(AppAuthTokenKey)}`;
      }
      const refreshTokenKey = ck.get(AppAuthRefeshTokenKey);
      const deviceId = ck.get(SucureDeviceIdAtt);
      // api.defaults.headers.Cookie = 'ookie1=value; cookie2=value; cookie3=value;';
      if (deviceId || refreshTokenKey) {
        api.defaults.headers.Cookie = `${SucureDeviceIdAtt}=${deviceId ? deviceId : refreshTokenKey};`;
      }
      // else if (refreshTokenKey) {
      //   api.defaults.headers.Cookie = `${SucureDeviceIdAtt}=${refreshTokenKey};`;
      // }
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
    callAxiosProcess
  };
};
