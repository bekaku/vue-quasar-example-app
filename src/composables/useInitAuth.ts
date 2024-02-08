import { usePreFetch } from '@/composables/usePreFetch';
import { UserDto } from '@/types/models';
import {
  AppAuthTokenKey
} from '@/utils/constant';
import { Cookies } from 'quasar';

export const useInitAuth = (ssrContext: any, redirect: any) => {
  const cookies = process.env.SERVER ? Cookies.parseSSR(ssrContext) : Cookies; // otherwise we're on client
  const { callAxios } = usePreFetch(ssrContext, redirect);
  const init = async (): Promise<UserDto | null> => {
    if (cookies && cookies.get(AppAuthTokenKey)) {
      const userData = await getAndSetCurrentUserData();
      // await checkRefreshToken(userData);
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
  return { init };
};
