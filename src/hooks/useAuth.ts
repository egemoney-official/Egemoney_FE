import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { useTokenCookies } from '@/utils/cookie';

/**
 * 인증 관련 훅
 * Zustand store의 상태와 액션을 컴포넌트에 제공합니다.
 *
 * 초기화 및 쿠키 동기화는 AuthProvider에서 전역으로 처리됩니다.
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
  } = useAuthStore();

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
