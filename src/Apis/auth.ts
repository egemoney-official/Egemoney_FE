import { usePostApi } from './useMutationApi';
import {
  refreshTokenRequestSchema,
  refreshTokenResponseSchema,
  type RefreshTokenRequest,
  type RefreshTokenResponse,
} from '@/schemas';

export type { RefreshTokenRequest, RefreshTokenResponse };

/**
 * 토큰 갱신 API 훅
 */
export const useRefreshToken = () => {
  return usePostApi<RefreshTokenResponse, RefreshTokenRequest>('/auth/refresh', {
    requestSchema: refreshTokenRequestSchema,
    responseSchema: refreshTokenResponseSchema,
  });
};

/**
 * 로그아웃 API 훅
 */
export const useLogout = () => {
  return usePostApi<void, void>('/auth/logout');
};
