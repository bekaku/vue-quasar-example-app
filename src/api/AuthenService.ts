import { useAxios } from '@/composables/useAxios';
import {
  LoginRequest,
  RefreshTokenRequest,
  RefreshTokenResponse,
} from '@/types/models';
import { ResponseMessage } from '@/types/common';
export default () => {
  const { callAxios } = useAxios();
  const singin = async (
    loginRequest: LoginRequest
  ): Promise<RefreshTokenResponse> => {
    return await callAxios<RefreshTokenResponse>({
      API: '/api/auth/login',
      method: 'POST',
      body: loginRequest,
    });
  };
  const singoutToServer = async (
    refreshToken: RefreshTokenRequest
  ): Promise<ResponseMessage> => {
    return await callAxios<ResponseMessage>({
      API: '/api/auth/logout',
      method: 'POST',
      body: refreshToken,
    });
  };
  const refreshToken = async (
    refreshToken: RefreshTokenRequest
  ): Promise<RefreshTokenResponse> => {
    return await callAxios<RefreshTokenResponse>({
      API: '/api/auth/refreshToken',
      method: 'POST',
      body: refreshToken,
    });
  };
  const removeAccessTokenSession = async (
    id: number
  ): Promise<ResponseMessage> => {
    return await callAxios<ResponseMessage>({
      API: `/api/auth/removeAccessTokenSession?id=${id}`,
      method: 'DELETE',
    });
  };

  return {
    singin,
    singoutToServer,
    refreshToken,
    removeAccessTokenSession,
  };
};
