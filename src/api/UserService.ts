import { useAxios } from '@/composables/useAxios';
import type {
  UserDto,
  AppLocale,
  UserChangePasswordRequest,
  AccessTokenDto,
  UserPersonalEditRequest,
  IApiListResponse,
} from '@/types/models';
import type { ResponseMessage } from '@/types/common';
export default () => {
  const { callAxios } = useAxios();

  const findAll = async (q: string): Promise<IApiListResponse<UserDto> | null> => {
    console.log('UserService.ts > findAll > ', `/api/user${q}`);
    return await callAxios<IApiListResponse<UserDto>>({
      API: `/api/user${q}`,
      method: 'GET',
    });
  };
  const findCurrentUserData = async (): Promise<UserDto | null> => {
    return await callAxios<UserDto>({
      API: '/api/user/currentUserData',
      method: 'GET',
    });
  };
  const updateUserAvatar = async (
    fileManagerId: number
  ): Promise<ResponseMessage | null> => {
    return await callAxios<ResponseMessage>({
      API: `/api/user/updateUserAvatar?fileManagerId=${fileManagerId}`,
      method: 'PUT',
    });
  };
  const updateUserCover = async (
    fileManagerId: number
  ): Promise<ResponseMessage | null> => {
    return await callAxios<ResponseMessage>({
      API: `/api/user/updateUserCover?fileManagerId=${fileManagerId}`,
      method: 'PUT',
    });
  };
  const updateDefaultLocale = async (locale: AppLocale): Promise<UserDto | null> => {
    return await callAxios<UserDto>({
      API: `/api/user/updateDefaultLocale/?locale=${locale}`,
      method: 'PUT',
    });
  };
  const selfUpdatePassword = async (
    req: UserChangePasswordRequest
  ): Promise<ResponseMessage | null> => {
    return await callAxios<ResponseMessage>({
      API: '/api/user/selfUpdatePassword',
      method: 'PUT',
      body: req,
    });
  };
  const updateUserPassword = async (
    req: UserChangePasswordRequest,
    userId: number
  ): Promise<ResponseMessage | null> => {
    return await callAxios<ResponseMessage>({
      API: `/api/user/updateUserPassword/${userId}`,
      method: 'PUT',
      body: req,
    });
  };
  const updateUserPasswordByAdmin = async (
    req: UserChangePasswordRequest,
    userId: number
  ): Promise<ResponseMessage | null> => {
    return await callAxios<ResponseMessage>({
      API: `/api/user/updateUserPasswordByAdmin/${userId}`,
      method: 'PUT',
      body: req,
    });
  };
  const currentAuthSession = async (q: string): Promise<AccessTokenDto[] | null> => {
    return await callAxios<AccessTokenDto[]>({
      API: `/api/user/currentAuthSession${q}`,
      method: 'GET',
    });
  };

  const updatePersonalData = async (
    req: UserPersonalEditRequest
  ): Promise<ResponseMessage | null> => {
    // return await callAxios<ResponseMessage>({
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
  //   return await callAxios<ResponseMessage>({
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
    return await callAxios<ResponseMessage>({
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
    updateUserPasswordByAdmin,
    findAll
  };
};
