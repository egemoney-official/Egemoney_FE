/**
 * 홈 페이지 관련 API 스키마
 * 홈 페이지 데이터 및 투자 성향 정보 검증
 */

import { z } from 'zod';

/**
 * 홈 페이지 응답 스키마
 */
export const homeResponseSchema = z.object({
  // characterUri는 상대 경로(예: "/costumes/costume_default_on.png")를 받아서
  // toAbsoluteUrl() 함수로 절대 URL로 변환하므로, 여기서는 단순 문자열로 검증
  characterUri: z.string().min(1, '캐릭터 URI는 필수입니다'),
  nickname: z.string().min(1, '닉네임은 필수입니다'),
  tierName: z.string().min(1, '티어 이름은 필수입니다'),
  testResult: z.string().min(1, '테스트 결과는 필수입니다'),
});

/**
 * 투자 성향 응답 스키마
 */
export const propensityResponseSchema = z.object({
  isTested: z.boolean(),
  propensityKoreanName: z.string().optional(),
});

// 타입 추론을 위한 export
export type HomeResponse = z.infer<typeof homeResponseSchema>;
export type PropensityResponse = z.infer<typeof propensityResponseSchema>;
