import { api } from 'boot/axios';
import { RequestType, AppException, ResponseMessage } from '@/types/common';
import { RefreshTokenResponse } from '@/types/models';
import { biX } from '@quasar/extras/bootstrap-icons';
import { Cookies } from 'quasar';
import { useBase } from '@/composables/useBase';
import { useLang } from '@/composables/useLang';
import { AxiosResponse } from 'axios';
import {
  isAppException,
  isServerResponseMessage,
  isServerException,
} from '@/utils/appUtil';
import { useSSRContext } from 'vue';
import { AppAuthTokenKey, SucureDeviceIdAtt, AppAuthRefeshTokenKey, ExpireCookieDays } from '@/utils/constant';
import { formatRelativeFromNow, addDateByDays } from '@/utils/dateUtil';
export const useAxios = () => {
  const { WeeToast, WeeLoader, isDevMode } = useBase();
  const { locale } = useLang();
  const ssrContext = process.env.SERVER ? useSSRContext() : null;
  const cookies = process.env.SERVER ? Cookies.parseSSR(ssrContext) : Cookies; // otherwise we're on client
  // const reqHeader = () => {
  //   return {
  //     Authorization: `Bearer ${token}`,
  //     'Content-Type': 'application/json',
  //     'Accept-Apiclient': 'default',
  //     'Accept-Language': locale.value,
  //   };
  // };
  const validateServerResponse = <T>(res: T): Promise<T | null> => {
    if (!res) {
      return new Promise((resolve) => {
        resolve(null);
      });
    }
    if (isAppException(res) || isServerException(res)) {
      return new Promise((resolve) => {
        resolve(null);
      });
    }
    return new Promise((resolve) => {
      resolve(res);
    });
  };
  const notifyMessage = (response: AppException): void => {
    WeeLoader(false);
    WeeToast(
      `<strong>${response.message}</strong><br> ${response.errors?.join(
        '<br>'
      )}`,
      {
        multiLine: true,
        html: true,
        type: 'negative',
        timeout: 0,
        position: 'bottom',
        caption: formatRelativeFromNow(
          response.timestamp,
          locale.value as string
        ),
        actions: [{ icon: biX, color: 'white' }],
      }
    );
  };
  const notifyServerMessage = (response: ResponseMessage): void => {
    if (!response.message) {
      return;
    }
    WeeLoader(false);
    WeeToast(response.message, {
      multiLine: true,
      html: true,
      type:
        response.status == 'OK' || response.status == 'CREATED'
          ? 'positive'
          : 'negative',
      timeout:
        response.status == 'OK' || response.status == 'CREATED'
          ? 3 * 1000
          : 10 * 1000,
      position: 'bottom',
      caption: formatRelativeFromNow(
        response.timestamp,
        locale.value as string
      ),
      actions: [{ icon: biX, color: 'white' }],
    });
  };
  const callAxiosV2 = async <T>(req: RequestType): Promise<T | null> => {
    const res = await callAxios<T>(req);
    return await validateServerResponse<T>(res);
  };
  const callAxios = async <T>(req: RequestType): Promise<T> => {
    return new Promise(async (resolve, /*reject*/) => {
      const response = await callAxiosProcess<T>(req);
      if (response.data) {
        if (isAppException(response.data)) {
          notifyMessage(response.data);
        } else if (isServerResponseMessage(response.data)) {
          notifyServerMessage(response.data);
        }
      }
      resolve(response.data as T);
    });
  };
  const callAxiosProcess = <T>(req: RequestType): Promise<AxiosResponse<T>> => {
    return new Promise((resolve, /*reject*/) => {
      // api.defaults.headers = reqHeader();
      // api.defaults.headers['Accept-Language'] = locale.value;
      // api.defaults.headers.Authorization = `Bearer ${token}`;
      // api.defaults.headers.common['Content-Type'] = 'application/json';
      // api.defaults.headers.common['Accept-Language'] = locale.value as string;
      // api.defaults.headers.common.Authorization = `Bearer ${cookies.get(
      //   AppAuthTokenKey
      // )}`;
      api.defaults.headers['Accept-Language'] = locale.value as string;
      api.defaults.headers.Authorization = `Bearer ${cookies.get(
        AppAuthTokenKey
      )}`;

      // console.log('useAxios > callAxios :', req);
      if (req.baseURL) {
        api.defaults.baseURL = req.baseURL;
      } else {
        api.defaults.baseURL = process.env.API;
      }

      if (req.contentType) {
        api.defaults.headers['Content-Type'] = req.contentType;
      } else {
        api.defaults.headers['Content-Type'] = 'application/json';
      }

      api({
        method: req.method,
        url: req.API,
        data: req.body ? req.body : undefined,
      })
        .then((response) => {
          if (isDevMode()) {
            console.log(`api ${api.defaults.baseURL}${req.API}`, response);
          }
          resolve(response as AxiosResponse<T>);
        })
        .catch((error) => {
          if (isDevMode()) {
            console.log(`api ${api.defaults.baseURL}${req.API}`, error);
          }
          resolve(error.message);
          WeeLoader(false);
          WeeToast(`<strong>${error.code}</strong><br> ${error.message}`, {
            multiLine: true,
            html: true,
            type: 'negative',
            color: 'white',
            textColor: 'negative',
            timeout: 10 * 1000,
            position: 'bottom',
            actions: [{ icon: biX, color: 'negative' }],
          });
        });

      // api
      //   .get(req.API)
      //   .then((response) => {
      //     resolve(response.data);
      //   })
      //   .catch((error) => {
      //     reject(error.message);
      //     WeeLoader(false);
      //     WeeToast(error.message, {
      //       multiLine: true,
      //       type: 'negative',
      //       timeout: 10 * 1000,
      //     });
      //   });
    });
  };
  return { callAxios, validateServerResponse, callAxiosV2 };
};
