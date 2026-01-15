/**
 * 카카오 인증 관련 API 스키마
 * 로그인, 회원가입, 토큰 갱신 등의 API 응답/요청 검증
 */

import { z } from 'zod';

/**
 * 카카오 로그인 요청 스키마
 */
export const kakaoLoginRequestSchema = z.object({
  code: z.string().min(1, '인증 코드는 필수입니다'),
});

/**
 * 카카오 로그인 응답 스키마
 */
export const kakaoLoginResponseSchema = z.object({
  accessToken: z.string().min(1, '액세스 토큰은 필수입니다'),
});

/**
 * 카카오 회원가입 요청 스키마
 */
export const kakaoRegisterRequestSchema = z.object({
  code: z.string().min(1, '인증 코드는 필수입니다'),
  nickname: z
    .string()
    .min(1, '닉네임은 필수입니다')
    .max(20, '닉네임은 20자 이하여야 합니다')
    .regex(/^[가-힣a-zA-Z0-9\s]+$/, '닉네임은 한글, 영문, 숫자만 사용 가능합니다'),
});

/**
 * 카카오 회원가입 응답 스키마
 */
export const kakaoRegisterResponseSchema = z.object({
  accessToken: z.string().min(1, '액세스 토큰은 필수입니다'),
});

/**
 * 토큰 갱신 요청 스키마
 */
export const refreshTokenRequestSchema = z.object({
  refreshToken: z.string().min(1, '리프레시 토큰은 필수입니다'),
});

/**
 * 토큰 갱신 응답 스키마
 */
export const refreshTokenResponseSchema = z.object({
  accessToken: z.string().min(1, '액세스 토큰은 필수입니다'),
  refreshToken: z.string().min(1, '리프레시 토큰은 필수입니다'),
});

// 타입 추론을 위한 export
export type KakaoLoginRequest = z.infer<typeof kakaoLoginRequestSchema>;
export type KakaoLoginResponse = z.infer<typeof kakaoLoginResponseSchema>;
export type KakaoRegisterRequest = z.infer<typeof kakaoRegisterRequestSchema>;
export type KakaoRegisterResponse = z.infer<typeof kakaoRegisterResponseSchema>;
export type RefreshTokenRequest = z.infer<typeof refreshTokenRequestSchema>;
export type RefreshTokenResponse = z.infer<typeof refreshTokenResponseSchema>;
