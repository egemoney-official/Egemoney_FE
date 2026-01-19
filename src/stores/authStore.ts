import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  accessToken: string | undefined;
  refreshToken: string | undefined;
  // Actions
  setAuthenticated: (value: boolean) => void;
  setLoading: (value: boolean) => void;
  setTokens: (accessToken?: string, refreshToken?: string) => void;
  checkAuth: () => boolean;
  logout: () => void;
  initialize: () => void;
}

/**
 * 인증 상태를 관리하는 Zustand store
 */
export const useAuthStore = create<AuthState>((set, get) => ({
  isAuthenticated: false,
  isLoading: true,
  accessToken: undefined,
  refreshToken: undefined,

  /**
   * 인증 상태 설정
   */
  setAuthenticated: (value: boolean) => {
    set({ isAuthenticated: value });
  },

  /**
   * 로딩 상태 설정
   */
  setLoading: (value: boolean) => {
    set({ isLoading: value });
  },

  /**
   * 토큰 설정
   */
  setTokens: (accessToken?: string, refreshToken?: string) => {
    set({
      accessToken,
      refreshToken,
      isAuthenticated: !!accessToken,
    });
  },

  /**
   * 인증 여부 확인
   */
  checkAuth: () => {
    const { accessToken } = get();
    return !!accessToken;
  },

  /**
   * 로그아웃 처리
   * 쿠키는 외부에서 clearTokens를 호출해야 함
   */
  logout: () => {
    set({
      isAuthenticated: false,
      accessToken: undefined,
      refreshToken: undefined,
    });
  },

  /**
   * 초기화: 쿠키에서 토큰을 읽어서 상태 동기화
   */
  initialize: () => {
    const cookies = document.cookie.split(';');
    const accessTokenCookie = cookies.find((cookie) => cookie.trim().startsWith('access_token='));
    const refreshTokenCookie = cookies.find((cookie) => cookie.trim().startsWith('refresh_token='));

    const accessToken = accessTokenCookie?.split('=')[1];
    const refreshToken = refreshTokenCookie?.split('=')[1];

    set({
      accessToken,
      refreshToken,
      isAuthenticated: !!accessToken,
      isLoading: false,
    });
  },
}));
