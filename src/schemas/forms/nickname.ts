/**
 * 닉네임 폼 검증 스키마
 * 닉네임 입력 시 사용하는 검증 규칙
 */

import { z } from 'zod';
import Filter from 'badwords-ko';

// 비속어 필터 인스턴스 (모듈 로드 시 한 번만 생성)
const badWordsFilter = new Filter();

/**
 * 닉네임 검증 스키마
 * - 최소 1자 이상
 * - 최대 20자 이하
 * - 한글, 영문, 숫자, 공백만 허용
 * - 공백만으로 구성 불가
 * - 비속어 포함 불가
 */
export const nicknameSchema = z
  .string()
  .min(1, '닉네임을 입력해주세요')
  .max(20, '닉네임은 20자 이하여야 합니다')
  .regex(/^[가-힣a-zA-Z0-9\s]+$/, '닉네임은 한글, 영문, 숫자만 사용 가능합니다')
  .refine((val) => val.trim().length > 0, {
    message: '닉네임은 공백만으로 구성될 수 없습니다',
  })
  .refine((val) => !badWordsFilter.isProfane(val), {
    message: '부적절한 단어가 포함되어 있습니다',
  });

// 타입 추론을 위한 export
export type NicknameInput = z.infer<typeof nicknameSchema>;
