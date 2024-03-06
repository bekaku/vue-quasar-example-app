import { useAxios } from '@/composables/useAxios';
import {
  LoginRequest,
  RefreshTokenRequest,
  RefreshTokenResponse,
} from '@/types/models';
import { AppException, ForgotPasswordRequest, ResponseMessage, } from '@/types/common';
import { AxiosResponse } from 'axios';
export default () => {
  const { callAxios, callAxiosProcess } = useAxios();
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
  //Forgot password
  const requestVerifyCodeToResetPwd = async (
    req: ForgotPasswordRequest
  ): Promise<AxiosResponse<ResponseMessage | AppException>> => {
    return await callAxiosProcess<ResponseMessage | AppException>({
      API: '/api/auth/requestVerifyCodeToResetPwd',
      method: 'POST',
      body: {
        forgotPasswordRequest: req
      },
    });
  };
  const sendVerifyCodeToResetPwd = async (
    req: ForgotPasswordRequest
  ): Promise<AxiosResponse<ResponseMessage | AppException>> => {
    return await callAxiosProcess<ResponseMessage | AppException>({
      API: '/api/auth/sendVerifyCodeToResetPwd',
      method: 'POST',
      body: {
        forgotPasswordRequest: req
      },
    });
  };
  const resetPassword = async (
    req: ForgotPasswordRequest
  ): Promise<AxiosResponse<ResponseMessage | AppException>> => {
    return await callAxiosProcess<ResponseMessage | AppException>({
      API: '/api/auth/resetPassword',
      method: 'POST',
      body: {
        forgotPasswordRequest: req
      },
    });
  };
  return {
    singin,
    singoutToServer,
    refreshToken,
    removeAccessTokenSession,
    requestVerifyCodeToResetPwd,
    sendVerifyCodeToResetPwd,
    resetPassword
  };
};
