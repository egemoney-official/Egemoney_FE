import { usePostApi } from '../useMutationApi';
import { getKakaoLoginUrl } from './utils';
import type {
  KakaoLoginRequest,
  KakaoLoginResponse,
  KakaoRegisterRequest,
  KakaoRegisterResponse,
} from './types';
import {
  kakaoLoginRequestSchema,
  kakaoLoginResponseSchema,
  kakaoRegisterRequestSchema,
  kakaoRegisterResponseSchema,
} from '@/schemas';

/**
 * 카카오 로그인 API 호출 훅
 */
export const useKakaoLogin = () => {
  return usePostApi<KakaoLoginResponse, KakaoLoginRequest>('/user/login', {
    requestSchema: kakaoLoginRequestSchema,
    responseSchema: kakaoLoginResponseSchema,
  });
};

/**
 * 카카오 회원가입 API 호출 훅
 */
export const useKakaoRegister = () => {
  return usePostApi<KakaoRegisterResponse, KakaoRegisterRequest>('/user/register', {
    requestSchema: kakaoRegisterRequestSchema,
    responseSchema: kakaoRegisterResponseSchema,
  });
};

/**
 * 카카오 로그인 전체 프로세스 훅
 */
export const useKakaoAuth = () => {
  const { mutateAsync: kakaoLogin, isPending, data, error } = useKakaoLogin();

  /**
   * 카카오 로그인 시작
   */
  const startKakaoLogin = () => {
    const loginUrl = getKakaoLoginUrl();
    window.location.href = loginUrl;
  };

  /**
   * authorization code로 백엔드에 로그인 요청
   */
  const loginWithCode = (authorizationCode: string) => {
    return kakaoLogin({ code: authorizationCode });
  };

  return {
    startKakaoLogin,
    loginWithCode,
    isPending,
    data,
    error,
  };
};
