import { defineStore } from 'pinia';
import { UserDto } from '@/types/models';
import { canRefreshToken, getRefreshTokenTimeout } from '@/utils/jwtUtil';
import { RefeshTokenStatus } from '@/types/common';
import { AppAuthRefeshTokenKey, AppAuthTokenKey, AppDomain, ExpireCookieDays, SucureDeviceIdAtt } from '@/utils/constant';
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
      const isServerMode = process.env.SERVER;
      console.log('refreshToken SERVER mode ', isServerMode);
      const ck: any = isServerMode && ssrContext ? Cookies.parseSSR(ssrContext) : Cookies;
      if (ck) {
        const authTokenKey = ck.get(AppAuthTokenKey);
        if (authTokenKey) {
          const refreshIt = await canRefreshToken(authTokenKey, this.devMode, 'authenStore > refreshToken');
          if (refreshIt) {
            if (isServerMode) {
              // const refreshTokenKey = ck.get(AppAuthRefeshTokenKey);
              // const deviceId = ck.get(SucureDeviceIdAtt);
              // if (deviceId) {
              //   api.defaults.headers.Cookie = `${SucureDeviceIdAtt}=${deviceId};`;
              // }
            }
            const response = await api({
              method: 'POST',
              url: '/api/auth/refreshToken',
            });
            if (this.devMode) {
              console.log(`api ${api.defaults.baseURL}/api/auth/refreshToken`, response);
            }
            if (response && response.status == 200 && response.data && response.data.refreshToken && response.data.authenticationToken) {
              const isDevMode = process.env.NODE_ENV == 'development';
              ck.set(SucureDeviceIdAtt, response.data.refreshToken, {
                expires: addDateByDays(ExpireCookieDays),
                path: '/',
                domain: isDevMode ? undefined : AppDomain,
                secure: true,
                httpOnly: true,
                sameSite: 'None'
              });

              ck.set(AppAuthRefeshTokenKey, response.data.refreshToken, {
                expires: addDateByDays(ExpireCookieDays),
                path: '/',
                domain: isDevMode ? undefined : AppDomain,
                secure: !isDevMode
              });

              ck.set(AppAuthTokenKey, response.data.authenticationToken, {
                expires: addDateByDays(ExpireCookieDays),
                path: '/',
                domain: isDevMode ? undefined : AppDomain,
                secure: !isDevMode
              });
              this.sessionExpired = false;
            } else if (response && response.status == 401) {
              this.sessionExpired = true;
              return new Promise((resolve, /*reject*/) => {
                resolve({
                  status: false,
                  fourceLogout: true
                });
              });
            }
          }
        }
      }
      return new Promise((resolve, /*reject*/) => {
        if (!isServerMode) {
          this.startRefreshTokenTimer();
        }
        resolve({
          status: true,
          fourceLogout: false
        });
      });
    },
    async startRefreshTokenTimer(ssrContext: any | undefined = undefined) {
      const isServerMode = process.env.SERVER;
      const ck: any = isServerMode && ssrContext ? Cookies.parseSSR(ssrContext) : Cookies;
      if (ck) {
        const authTokenKey = ck.get(AppAuthTokenKey);
        if (authTokenKey) {
          this.refreshTokenTimeoutNo = await getRefreshTokenTimeout(authTokenKey);
          // this.refreshTokenTimeout = setTimeout(this.refreshToken, 10 * 1000);
          if (this.devMode) {
            console.log('startRefreshTokenTimer {}', this.refreshTokenTimeoutNo, 'isServerMode', isServerMode);
          }
          if (this.refreshTokenTimeoutNo > 0) {
            this.refreshTokenTimeout = setTimeout(this.refreshToken, this.refreshTokenTimeoutNo);
            // this.refreshTokenTimeout = setTimeout(this.refreshToken, 10 * 1000);
          }
        }
      }
    },
    stopRefreshTokenTimer() {
      if (this.refreshTokenTimeout) {
        clearTimeout(this.refreshTokenTimeout);
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
