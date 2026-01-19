import type { InternalAxiosRequestConfig } from 'axios';
import { api } from '@/Apis/axios';
import { useAuthStore } from '@/stores/authStore';

/**
 * 토큰 갱신 함수
 * 성공 시 Zustand store도 업데이트합니다.
 */
export const refreshAccessToken = async (): Promise<string | null> => {
  try {
    const cookies = document.cookie.split(';');
    const refreshTokenCookie = cookies.find((cookie) => cookie.trim().startsWith('refresh_token='));

    if (!refreshTokenCookie) {
      return null;
    }

    const refreshToken = refreshTokenCookie.split('=')[1];

    const response = await api.post('/auth/refresh', {
      refreshToken,
    });

    const { accessToken, refreshToken: newRefreshToken } = response.data;

    // 쿠키에 토큰 저장
    document.cookie = `access_token=${accessToken}; path=/; max-age=${7 * 24 * 60 * 60}; secure; samesite=strict`;
    document.cookie = `refresh_token=${newRefreshToken}; path=/; max-age=${30 * 24 * 60 * 60}; secure; samesite=strict`;

    // Zustand store 업데이트
    useAuthStore.getState().setTokens(accessToken, newRefreshToken);

    return accessToken;
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error('토큰 갱신 실패:', error);
    }
    return null;
  }
};

/**
 * 로그아웃 처리 함수
 * 쿠키 삭제 및 Zustand store 상태 초기화
 */
export const handleLogout = () => {
  // 쿠키 삭제
  document.cookie = 'access_token=; path=/; max-age=0';
  document.cookie = 'refresh_token=; path=/; max-age=0';

  // Zustand store 상태 초기화
  useAuthStore.getState().logout();

  window.location.href = '/login';
};

/**
 * 401 에러 처리 함수
 */
export const handle401Error = async (
  originalRequest: InternalAxiosRequestConfig,
): Promise<unknown> => {
  const newAccessToken = await refreshAccessToken();

  if (newAccessToken) {
    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
    return api(originalRequest);
  } else {
    handleLogout();
    return Promise.reject(new Error('토큰 갱신 실패'));
  }
};
