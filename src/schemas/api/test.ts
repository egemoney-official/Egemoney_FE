/**
 * 테스트 페이지 관련 API 스키마
 * 투자 성향 진단 테스트 요청/응답 검증
 */

import { z } from 'zod';

/**
 * 투자 성향 진단 요청 스키마
 */
export const diagnoseRequestSchema = z.object({
  totalScore: z.number().int().nonnegative('총 점수는 0 이상이어야 합니다'),
});

/**
 * 투자 성향 진단 응답 스키마
 */
export const diagnoseResponseSchema = z.object({
  propensityKoreanName: z.string().min(1, '투자 성향 이름은 필수입니다'),
});

// 타입 추론을 위한 export
export type DiagnoseRequest = z.infer<typeof diagnoseRequestSchema>;
export type DiagnoseResponse = z.infer<typeof diagnoseResponseSchema>;

