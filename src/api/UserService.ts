import { useAxios } from '@/composables/useAxios';
import {
  UserDto,
  AppLocale,
  UserChangePasswordRequest,
  AccessTokenDto,
  UserPersonalEditRequest,
} from '@/types/models';
import { ResponseMessage } from '@/types/common';
export default () => {
  const { callAxiosV2 } = useAxios();
  const findCurrentUserData = async (): Promise<UserDto | null> => {
    return await callAxiosV2<UserDto>({
      API: '/api/user/currentUserData',
      method: 'GET',
    });
  };
  const updateUserAvatar = async (
    fileManagerId: number
  ): Promise<ResponseMessage | null> => {
    return await callAxiosV2<ResponseMessage>({
      API: `/api/user/updateUserAvatar?fileManagerId=${fileManagerId}`,
      method: 'PUT',
    });
  };
  const updateUserCover = async (
    fileManagerId: number
  ): Promise<ResponseMessage | null> => {
    return await callAxiosV2<ResponseMessage>({
      API: `/api/user/updateUserCover?fileManagerId=${fileManagerId}`,
      method: 'PUT',
    });
  };
  const updateDefaultLocale = async (locale: AppLocale): Promise<UserDto | null> => {
    return await callAxiosV2<UserDto>({
      API: `/api/user/updateDefaultLocale/?locale=${locale}`,
      method: 'PUT',
    });
  };
  const selfUpdatePassword = async (
    req: UserChangePasswordRequest
  ): Promise<ResponseMessage | null> => {
    return await callAxiosV2<ResponseMessage>({
      API: '/api/user/selfUpdatePassword',
      method: 'PUT',
      body: req,
    });
  };
  const updateUserPassword = async (
    req: UserChangePasswordRequest,
    userId: number
  ): Promise<ResponseMessage | null> => {
    return await callAxiosV2<ResponseMessage>({
      API: `/api/user/updateUserPassword/${userId}`,
      method: 'PUT',
      body: req,
    });
  };
  const updateUserPasswordByAdmin = async (
    req: UserChangePasswordRequest,
    userId: number
  ): Promise<ResponseMessage | null> => {
    return await callAxiosV2<ResponseMessage>({
      API: `/api/user/updateUserPasswordByAdmin/${userId}`,
      method: 'PUT',
      body: req,
    });
  };
  const currentAuthSession = async (q: string): Promise<AccessTokenDto[] | null> => {
    return await callAxiosV2<AccessTokenDto[]>({
      API: `/api/user/currentAuthSession${q}`,
      method: 'GET',
    });
  };

  const updatePersonalData = async (
    req: UserPersonalEditRequest
  ): Promise<ResponseMessage | null> => {

    // return await callAxiosV2<ResponseMessage>({
    //   API: '/api/user/updatePersonalData',
    //   method: 'PUT',
    //   body: {
    //     user: req,
    //   },
    // });
    console.log('updatePersonalData', req);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(null)
      }, 1500);
    })
  };
  // const updatePersonalData = async (
  //   req: UserPersonalEditRequest
  // ): Promise<ResponseMessage | null> => {
  //   return await callAxiosV2<ResponseMessage>({
  //     API: '/api/user/updatePersonalData',
  //     method: 'PUT',
  //     body: {
  //       user: req,
  //     },
  //   });
  // };
  const updateEmail = async (
    req: UserPersonalEditRequest
  ): Promise<ResponseMessage | null> => {
    return await callAxiosV2<ResponseMessage>({
      API: '/api/user/updateEmail',
      method: 'PUT',
      body: {
        user: req,
      },
    });
  };
  return {
    findCurrentUserData,
    updateUserAvatar,
    updateUserCover,
    selfUpdatePassword,
    currentAuthSession,
    updateUserPassword,
    updateDefaultLocale,
    updatePersonalData,
    updateEmail,
    updateUserPasswordByAdmin
  };
};
