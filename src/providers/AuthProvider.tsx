import { useEffect } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { useTokenCookies } from '@/utils/cookie';

/**
 * 인증 상태 초기화 및 쿠키 동기화를 담당하는 Provider
 * 앱 최상위에서 한 번만 실행되어 불필요한 중복 실행을 방지합니다.
 */
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { initialize } = useAuthStore();
  const { accessToken: cookieAccessToken, refreshToken: cookieRefreshToken } = useTokenCookies();

  // 앱 시작 시 한 번만 초기화
  useEffect(() => {
    initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 쿠키 변경 감지 및 store 동기화 (전역에서 한 번만 실행)
  useEffect(() => {
    useAuthStore.getState().setTokens(cookieAccessToken, cookieRefreshToken);
  }, [cookieAccessToken, cookieRefreshToken]);

  return <>{children}</>;
};
