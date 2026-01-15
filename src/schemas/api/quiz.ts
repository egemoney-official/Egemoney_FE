/**
 * 퀴즈 관련 API 스키마
 * 퀴즈 목록, 퀴즈 상세, 퀴즈 제출, 복습 퀴즈 등의 API 응답/요청 검증
 */

import { z } from 'zod';

/**
 * 퀴즈 문제 타입 enum
 */
const questionTypeSchema = z.enum(['OX', 'MULTIPLE_CHOICE', 'SHORT_ANSWER']);

/**
 * 퀴즈 난이도 enum
 */
const difficultyLevelSchema = z.enum(['EASY', 'MEDIUM', 'HARD']);

/**
 * 복습 단계 enum
 */
const reviewStepSchema = z.string();

/**
 * 객관식 선택지 스키마
 */
const choiceSchema = z.object({
  text: z.string().min(1, '선택지 텍스트는 필수입니다'),
  correctAnswer: z.boolean(),
});

/**
 * 퀴즈 문제 데이터 스키마 (OX, 객관식, 주관식)
 */
const questionDataSchema = z.object({
  correctAnswer: z.boolean().optional(),
  choices: z.array(choiceSchema).optional(),
});

/**
 * 퀴즈 상세 데이터 스키마 (퀴즈 풀기 페이지용)
 */
export const quizDataSchema = z.object({
  quizId: z.number().int().positive('퀴즈 ID는 양수여야 합니다'),
  questionTitle: z.string().min(1, '문제 제목은 필수입니다'),
  questionType: questionTypeSchema,
  questionData: questionDataSchema,
  difficultyLevel: difficultyLevelSchema,
  explanation: z.string(),
  questionOrder: z.number().int().nonnegative('문제 순서는 0 이상이어야 합니다'),
  correctRate: z.number().min(0).max(100, '정답률은 0-100 사이여야 합니다'),
  topicId: z.number().int().positive('토픽 ID는 양수여야 합니다'),
  topicName: z.string().min(1, '토픽 이름은 필수입니다'),
  isBookmarked: z.boolean(),
  createdAt: z.string().datetime('생성일은 유효한 날짜 형식이어야 합니다'),
  updatedAt: z.string().datetime('수정일은 유효한 날짜 형식이어야 합니다'),
});

/**
 * 퀴즈 목록 항목 스키마 (퀴즈 목록 페이지용)
 */
const quizSchema = z.object({
  quizId: z.number().int().positive('퀴즈 ID는 양수여야 합니다'),
  questionOrder: z.number().int().nonnegative('문제 순서는 0 이상이어야 합니다'),
  questionTitle: z.string().min(1, '문제 제목은 필수입니다'),
  difficultyLevel: difficultyLevelSchema,
  isSolved: z.boolean(),
  isBookMarked: z.boolean(),
});

/**
 * 퀴즈 목록 응답 스키마
 */
export const quizListResponseSchema = z.object({
  quizzes: z.array(quizSchema),
});

/**
 * 복습 퀴즈 스키마
 */
const reviewQuizSchema = z.object({
  quizId: z.number().int().positive('퀴즈 ID는 양수여야 합니다'),
  topicId: z.number().int().positive('토픽 ID는 양수여야 합니다'),
  questionTitle: z.string().min(1, '문제 제목은 필수입니다'),
  questionType: questionTypeSchema,
  questionData: z.string().min(1, '문제 데이터는 필수입니다'),
  difficultyLevel: difficultyLevelSchema,
  explanation: z.string(),
  correctRate: z.number().min(0).max(100, '정답률은 0-100 사이여야 합니다'),
  reviewStep: reviewStepSchema,
});

/**
 * 복습 퀴즈 목록 응답 스키마
 */
export const reviewQuizResponseSchema = z.object({
  reviewQuizzes: z.array(reviewQuizSchema),
});

/**
 * 퀴즈 제출 요청 스키마
 */
export const quizSubmitRequestSchema = z.object({
  isCorrect: z.boolean(),
});

// 타입 추론을 위한 export
export type QuizData = z.infer<typeof quizDataSchema>;
export type Quiz = z.infer<typeof quizSchema>;
export type QuizListResponse = z.infer<typeof quizListResponseSchema>;
export type ReviewQuiz = z.infer<typeof reviewQuizSchema>;
export type ReviewQuizResponse = z.infer<typeof reviewQuizResponseSchema>;
export type QuizSubmitRequest = z.infer<typeof quizSubmitRequestSchema>;

