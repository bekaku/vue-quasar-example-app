import { UserDto, RefreshTokenResponse } from '@/types/models';
import { usePreFetch } from '@/composables/usePreFetch';
import {
  AppAuthTokenKey,
  AppAuthTokenCreatedKey,
  AppAuthRefeshTokenKey,
  autoRefeshTokenDays,
} from '@/utils/constant';
import { Cookies, date } from 'quasar';
import { setAuthCookies } from '@/utils/appUtil';

export const useInitAuth = (ssrContext: any, redirect: any) => {
  const cookies = process.env.SERVER ? Cookies.parseSSR(ssrContext) : Cookies; // otherwise we're on client
  const { callAxios } = usePreFetch(ssrContext, redirect);
  const init = async (): Promise<UserDto | null> => {
    if (cookies && cookies.get(AppAuthTokenKey)) {
      const userData = await getAndSetCurrentUserData();
      await checkRefreshToken(userData);
      return new Promise((resolve) => {
        resolve(userData);
      });
    }
    return new Promise((resolve) => {
      resolve(null);
    });
  };
  const getAndSetCurrentUserData = async (): Promise<UserDto> => {
    const data = await callAxios<UserDto>({
      API: '/api/user/currentUserData',
      method: 'GET',
    });
    return new Promise((resolve) => {
      resolve(data);
    });
  };
  const checkRefreshToken = async (userData: UserDto) => {
    if (!cookies) {
      return new Promise((resolve) => {
        resolve(false);
      });
    }
    const createdDateCk = cookies.get(AppAuthTokenCreatedKey);
    if (createdDateCk) {
      const createdDate = new Date(parseInt(createdDateCk));

      const createdTokenDate = date.formatDate(createdDate, 'YYYY-MM-DD');
      const currentDate = date.formatDate(new Date(), 'YYYY-MM-DD');
      const diff = date.getDateDiff(currentDate, createdTokenDate, 'days');

      // force refesh token if diff greater than 7 days
      if (diff >= autoRefeshTokenDays) {
        const refreshResponse = await callAxios<RefreshTokenResponse>({
          API: '/api/auth/refreshToken',
          method: 'POST',
          body: {
            refreshToken: {
              refreshToken: cookies.get(AppAuthRefeshTokenKey),
              email: userData.email,
            },
          },
        });

        if (refreshResponse.authenticationToken) {
          setAuthCookies(cookies, refreshResponse);
        }
      }
    }
  };
  return { init };
};
