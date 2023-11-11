/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  RefreshTokenRequest,
  NotificationCount,
  NotificationDto,
} from '@/types/models';
import { useAxios } from '@/composables/useAxios';
export default () => {
  const { callAxiosV2 } = useAxios();
  const updateFcmSetting = async (
    refreshToken: RefreshTokenRequest
  ): Promise<void> => {
    await callAxiosV2<void>({
      API: '/api/userNotify/updateFcmSetting',
      method: 'PUT',
      body: refreshToken,
    });
  };
  const refreshFcmToken = async (
    refreshToken: RefreshTokenRequest
  ): Promise<void> => {
    await callAxiosV2<void>({
      API: '/api/userNotify/refreshFcmToken',
      method: 'PUT',
      body: refreshToken,
    });
  };

  const findAllByUser = async (
    page: number,
    size: number
  ): Promise<NotificationDto[] | null> => {
    // return await callAxiosV2<NotificationDto[]>({
    //   API: `/api/userNotify/findAllByUser?page=${page}&size=${size}`,
    //   method: 'GET',
    // });
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([]);
      }, 1500);
    });
  };
  const findCountAllNotRead = async (
    lastNOtifyId: number
  ): Promise<NotificationCount | null> => {
    return await callAxiosV2<NotificationCount>({
      API: `/api/userNotify/findCountAllNotRead?lastestNotifyId=${lastNOtifyId}`,
      method: 'GET',
    });
  };
  const updateReadNotify = async (notifyId: number): Promise<void | null> => {
    return await callAxiosV2<void>({
      API: `/api/userNotify/updateReadNotify/${notifyId}`,
      method: 'PUT',
    });
  };
  const updateReadNotifyAll = async (): Promise<void | null> => {
    return await callAxiosV2<void>({
      API: '/api/userNotify/updateReadNotifyAll',
      method: 'PUT',
    });
  };
  return {
    updateFcmSetting,
    refreshFcmToken,
    findAllByUser,
    findCountAllNotRead,
    updateReadNotify,
    updateReadNotifyAll,
  };
};
