import { useAxios } from '@/composables/useAxios';
import type {
  UserDto,
  AppLocale,
  UserChangePasswordRequest,
  AccessTokenDto,
  UserPersonalEditRequest,
} from '@/types/models';
import type { ResponseMessage } from '@/types/common';
export default () => {
  const { callAxios } = useAxios();
  const findCurrentUserData = async (): Promise<UserDto | null> => {
    return await callAxios<UserDto>({
      API: '/api/user/currentUserData',
      method: 'GET',
    });
    // return {
    //   'id': 1,
    //   'email': 'admin@mydomain.com',
    //   'username': 'admin',
    //   'token': null,
    //   'fcmToken': null,
    //   'accessTokenId': null,
    //   'avatarFileId': 3413,
    //   'coverFileId': 3414,
    //   'avatar': {
    //     'image': 'https://i.pravatar.cc/450',
    //     'thumbnail': 'https://i.pravatar.cc/128'
    //   },
    //   'cover': {
    //     'image': 'https://images.unsplash.com/photo-1741568032886-18d3f2a694c2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    //     'thumbnail': 'https://images.unsplash.com/photo-1741568032886-18d3f2a694c2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    //   },
    //   'active': true,
    //   'selectedRoles': [
    //     1
    //   ],
    //   'defaultLocale': 'th',
    //   'permissions': [
    //     'api_client_view',
    //     'api_client_manage',
    //     'permission_list',
    //     'permission_view',
    //     'permission_manage',
    //     'role_list',
    //     'role_view',
    //     'role_manage',
    //     'user_list',
    //     'user_view',
    //     'user_manage',
    //     'file_manager_list',
    //     'file_manager_view',
    //     'file_manager_manage',
    //     'backend_login'
    //   ]
    // }
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
    updateUserPasswordByAdmin
  };
};
