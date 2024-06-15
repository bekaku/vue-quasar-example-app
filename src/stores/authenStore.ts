import { defineStore } from 'pinia';
import { RefreshTokenResponse, UserDto } from '@/types/models';
import { canRefreshToken, getRefreshTokenTimeout } from '@/utils/jwtUtil';
import { RefeshTokenStatus } from '@/types/common';
import { AppAuthRefeshTokenKey, AppAuthTokenKey, AppDomain, ExpireCookieDays, LocaleKey, SucureDeviceIdAtt } from '@/utils/constant';
import { Cookies } from 'quasar';
import { api } from 'boot/axios';
import { addDateByDays } from '@/utils/dateUtil';
export const useAuthenStore = defineStore('authenStore', {
  state: () => {
    return {
      auth: undefined as UserDto | undefined,
      refreshTokenTimeout: null as any,
      refreshTokenTimeoutNo: 0,
      devMode: process.env.NODE_ENV == 'development',
      sessionExpired: false,
    };
  },
  getters: {
    tokenKey: (state) => state.auth?.token,
    loginedCover: (state) =>
      state.auth && state.auth.cover?.image ? state.auth.cover?.image : '',
    loginedAvatar: (state) => state.auth?.avatar?.image,
  },
  actions: {
    async refreshToken(ssrContext: any | undefined = undefined): Promise<RefeshTokenStatus> {
      return new Promise(async (resolve /*reject*/) => {
        const isServerMode = process.env.SERVER;
        if (this.devMode) {
          console.log('refreshToken SERVER mode ', isServerMode);
        }
        const ck: any = isServerMode && ssrContext ? Cookies.parseSSR(ssrContext) : Cookies;
        if (ck) {
          const authTokenKey = ck.get(AppAuthTokenKey);
          if (authTokenKey) {
            const refreshIt = await canRefreshToken(authTokenKey, this.devMode, 'authenStore > refreshToken');
            if (refreshIt) {
              const refreshRes = await this.refreshTokenProcess(ssrContext);
              if (refreshRes && refreshRes.status) {
                if (!isServerMode) {
                  await this.startRefreshTokenTimer();
                }
              }
              resolve(refreshRes);
            }
          }
        }
        resolve({
          status: true,
          fourceLogout: false
        });
      });
    },
    async refreshTokenProcess(ssrContext: any): Promise<RefeshTokenStatus> {
      return new Promise(async (resolve /*reject*/) => {
        const ck: any = process.env.SERVER && ssrContext ? Cookies.parseSSR(ssrContext) : Cookies;
        const refreshTokenKey = ck.get(AppAuthRefeshTokenKey);
        // const deviceId = ck.get(SucureDeviceIdAtt);
        // if (isServerMode) {
        //   if (deviceId || refreshTokenKey) {
        //     api.defaults.headers.Cookie = `${SucureDeviceIdAtt}=${deviceId ? deviceId : refreshTokenKey};`;
        //   }
        // }
        api.defaults.headers.Authorization = `Bearer ${ck.get(AppAuthTokenKey)}`;
        api.defaults.baseURL = process.env.API;
        api.defaults.headers['Content-Type'] = 'application/json';
        api.defaults.responseType = 'json';
        api.defaults.headers['Accept-Language'] = ck.get(LocaleKey);
        const response = await api({
          method: 'POST',
          url: '/api/auth/refreshToken',
          data: {
            refreshToken: {
              refreshToken: refreshTokenKey
            }
          }
        });
        if (this.devMode) {
          console.log(`api ${api.defaults.baseURL}/api/auth/refreshToken`, response);
        }
        if (response && response.status == 200 && response.data && response.data.refreshToken && response.data.authenticationToken) {
          await this.setRefreshTokenCookie(ssrContext, response.data);

          this.sessionExpired = false;
          resolve({
            status: true,
            token: response.data.authenticationToken,
            fourceLogout: false
          });
        } else if (response && response.status == 401) {
          this.sessionExpired = true;
          resolve({
            status: false,
            fourceLogout: true
          });
        } else {
          resolve({
            status: true,
            fourceLogout: false
          });
        }
      });
    },
    async setRefreshTokenCookie(ssrContext: any, responseData: RefreshTokenResponse) {
      return new Promise(async (resolve /*reject*/) => {
        const ck: any = process.env.SERVER && ssrContext ? Cookies.parseSSR(ssrContext) : Cookies;
        const isDevMode = process.env.NODE_ENV == 'development';
        // if (isServerMode) {
        //   ck.set(SucureDeviceIdAtt, response.data.refreshToken, {
        //     expires: addDateByDays(ExpireCookieDays),
        //     path: '/',
        //     domain: isDevMode ? undefined : AppDomain,
        //     secure: true,
        //     httpOnly: true,
        //     sameSite: 'None'
        //   });
        // }
        ck.set(AppAuthRefeshTokenKey, responseData.refreshToken, {
          expires: addDateByDays(ExpireCookieDays),
          path: '/',
          // domain: isDevMode ? undefined : AppDomain,
          secure: !isDevMode,
          sameSite: 'Strict'
        });

        ck.set(AppAuthTokenKey, responseData.authenticationToken, {
          expires: addDateByDays(ExpireCookieDays),
          path: '/',
          // domain: isDevMode ? undefined : AppDomain,
          secure: !isDevMode,
          sameSite: 'Lax'
        });

        resolve(true);
      });
    },
    async startRefreshTokenTimer(ssrContext: any | undefined = undefined) {
      // return new Promise(async (resolve) => {
      //   const isServerMode = process.env.SERVER;
      //   const ck: any = isServerMode && ssrContext ? Cookies.parseSSR(ssrContext) : Cookies;
      //   if (ck) {
      //     const authTokenKey = ck.get(AppAuthTokenKey);
      //     if (authTokenKey) {
      //       this.refreshTokenTimeoutNo = await getRefreshTokenTimeout(authTokenKey);
      //       if (this.devMode) {
      //         console.log('startRefreshTokenTimer :', this.refreshTokenTimeoutNo, 'isServerMode', isServerMode);
      //       }
      //       if (this.refreshTokenTimeoutNo > 0) {
      //         if (this.devMode) {
      //           console.log('startRefreshTokenTimer : setTimer');
      //         }
      //         this.refreshTokenTimeout = setTimeout(() => {
      //           this.refreshToken();
      //         }, this.refreshTokenTimeoutNo);
      //       }
      //     }
      //   }
      //   resolve(true);
      // });

      return new Promise((resove) => resove(true));
    },
    async stopAndRestartRefreshTokenTimer() {
      this.stopRefreshTokenTimer();
      await this.refreshToken();
      return new Promise(async (resolve /*reject*/) => {
        resolve(true);
      });
    },
    stopRefreshTokenTimer() {
      if (this.refreshTokenTimeout) {
        clearTimeout(this.refreshTokenTimeout);
        this.refreshTokenTimeout = null;
      }
    },
    setAuthen(item: UserDto) {
      this.auth = item;
    },
    logout() {
      this.auth = undefined;
    },
  },
});
