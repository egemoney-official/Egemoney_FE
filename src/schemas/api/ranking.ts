/**
 * 랭킹 관련 API 스키마
 * 점수 랭킹, 성실 랭킹 등의 API 응답 검증
 */

import { z } from 'zod';

/**
 * 랭킹 사용자 스키마
 */
const rankingUserSchema = z.object({
  // 서버 응답에서 일부 필드가 null로 올 수 있음
  nickname: z.string().min(1, '닉네임은 필수입니다').nullable(),
  point: z.number().int().nonnegative('점수는 0 이상이어야 합니다'),
  rank: z.number().int().positive('순위는 양수여야 합니다'),
  kongSkinUrl: z.string().min(1, '캐릭터 스킨 URL은 필수입니다').nullable(),
});

/**
 * 랭킹 응답 스키마
 */
export const rankingResponseSchema = z.object({
  currentUser: rankingUserSchema,
  topRankingUsers: z.array(rankingUserSchema),
  aboveUsers: z.array(rankingUserSchema),
  belowUsers: z.array(rankingUserSchema),
});

// 타입 추론을 위한 export
export type RankingUser = z.infer<typeof rankingUserSchema>;
export type RankingResponse = z.infer<typeof rankingResponseSchema>;
