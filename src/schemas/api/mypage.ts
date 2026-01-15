/**
 * 마이페이지 관련 API 스키마
 * 마이페이지 데이터 및 투자 성향 정보 검증
 */

import { z } from 'zod';

/**
 * 마이페이지 응답 스키마
 */
export const myPageResponseSchema = z.object({
  // characterUri는 상대 경로를 받아서 toAbsoluteUrl()로 변환하므로, 여기서는 단순 문자열로 검증
  characterUri: z.string().min(1, '캐릭터 URI는 필수입니다'),
  nickname: z.string().min(1, '닉네임은 필수입니다'),
  tierName: z.string().min(1, '티어 이름은 필수입니다'),
  ratingPoint: z.number().int().nonnegative('평점 포인트는 0 이상이어야 합니다'),
  // 테스트를 아직 하지 않은 경우 빈 문자열이 올 수 있음
  testResult: z.string(),
  testResultDescription: z.string(),
});

/**
 * 투자 성향 결과 스키마
 */
export const testResultSchema = z.object({
  propensity: z.string().optional(),
  propensityKoreanName: z.string().optional(),
  isTested: z.boolean(),
});

// 타입 추론을 위한 export
export type MyPageResponse = z.infer<typeof myPageResponseSchema>;
export type TestResult = z.infer<typeof testResultSchema>;
