import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { useTokenCookies } from '@/utils/cookie';

/**
 * 인증 관련 훅
 * Zustand store를 사용하여 전역 인증 상태를 관리합니다.
 */
export const useAuth = () => {
  const navigate = useNavigate();
  const { clearTokens } = useTokenCookies();
  const {
    isAuthenticated,
    isLoading,
    accessToken,
    refreshToken,
    checkAuth,
    logout: storeLogout,
    initialize,
  } = useAuthStore();

  // 컴포넌트 마운트 시 쿠키에서 토큰을 읽어서 상태 초기화
  useEffect(() => {
    initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 쿠키 변경 감지를 위한 구독 (react-cookie의 cookies 변경 감지)
  const { accessToken: cookieAccessToken, refreshToken: cookieRefreshToken } = useTokenCookies();
  useEffect(() => {
    // 쿠키의 토큰이 변경되면 store 상태도 업데이트
    useAuthStore.getState().setTokens(cookieAccessToken, cookieRefreshToken);
  }, [cookieAccessToken, cookieRefreshToken]);

  /**
   * 로그아웃 처리
   * 쿠키 삭제 및 상태 초기화 후 로그인 페이지로 이동
   */
  const logout = () => {
    clearTokens();
    storeLogout();
    navigate('/login');
  };

  return {
    isAuthenticated,
    isLoading,
    accessToken,
    refreshToken,
    logout,
    checkAuth,
  };
};
