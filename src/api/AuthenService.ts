import { useAxios } from '@/composables/useAxios';
import type {
  LoginRequest,
  RefreshTokenRequest,
  RefreshTokenResponse,
} from '@/types/models';
import type { AppException, ForgotPasswordRequest, ResponseMessage, } from '@/types/common';
import type { AxiosResponse } from 'axios';
export default () => {
  const { callAxios, callAxiosProcess } = useAxios();
  const singin = async (
    loginRequest: LoginRequest
  ): Promise<RefreshTokenResponse | null> => {
    return await callAxios<RefreshTokenResponse>({
      API: '/api/auth/login',
      method: 'POST',
      body: loginRequest,
    });

    // return {
    //   'userId': 1,
    //   'authenticationToken': 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJlNmM1ZmVhMi1iODU4LTQ5ZWQtOWViOS0wMjc3YTNiNzQ5M2YtMTc0MTg0MDUwMTA3MCIsImV4cCI6MTc0MTg0MTQwMSwiaWF0IjoxNzQxODQwNTAxLCJ1dWlkIjoiMGQxYWYwNjMtZWQ1Yy00Mzg3LTkxYjItMDQyOTI3OTliMDZjIn0.XLnamWBWipqEmKEfD-BHsVZQQmgO0qx0SutCIeMvTzg5UsMtV0MDQpx5h2fVe1OKUfyAgfRl3FVDeUaQN5SFnQ',
    //   'refreshToken': 'e6c5fea2-b858-49ed-9eb9-0277a3b7493f-1741840501070',
    //   'expiresAt': '2025-03-13T04:50:01.087+00:00'
    // }
  };
  const singoutToServer = async (
    refreshToken: RefreshTokenRequest
  ): Promise<ResponseMessage | null> => {
    return await callAxios<ResponseMessage>({
      API: '/api/auth/logout',
      method: 'POST',
      body: refreshToken,
    });
  };
  const refreshToken = async (
    refreshToken: RefreshTokenRequest
  ): Promise<RefreshTokenResponse | null> => {
    return await callAxios<RefreshTokenResponse>({
      API: '/api/auth/refreshToken',
      method: 'POST',
      body: refreshToken,
    });
  };
  const removeAccessTokenSession = async (
    id: number
  ): Promise<ResponseMessage | null> => {
    return await callAxios<ResponseMessage>({
      API: `/api/auth/removeAccessTokenSession?id=${id}`,
      method: 'DELETE',
    });
  };
  // Forgot password
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
