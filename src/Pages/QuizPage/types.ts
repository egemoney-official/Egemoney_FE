export interface QuizData {
  quizId: number;
  questionTitle: string;
  questionType: 'OX' | 'MULTIPLE_CHOICE' | 'SHORT_ANSWER';
  questionData: {
    correctAnswer?: boolean;
    choices?: {
      text: string;
      correctAnswer: boolean;
    }[];
  };
  difficultyLevel: 'EASY' | 'MEDIUM' | 'HARD';
  explanation: string;
  questionOrder: number;
  correctRate: number;
  topicId: number;
  topicName: string;
  isBookmarked: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Quiz {
  quizId: number;
  questionOrder: number;
  questionTitle: string;
  difficultyLevel: 'EASY' | 'MEDIUM' | 'HARD';
  isSolved: boolean;
  isBookMarked: boolean;
}

export interface QuizListResponse {
  quizzes: Quiz[];
}

// ReviewQuiz와 ReviewQuizResponse는 스키마에서 추론한 타입을 사용 (src/schemas/api/quiz.ts)
// questionData는 JSON 문자열에서 파싱되어 객체로 변환됨
import type { ReviewQuiz } from '@/schemas';
export type { ReviewQuiz, ReviewQuizResponse } from '@/schemas';

export interface QuizResultState {
  selectedAnswer: string | boolean | number;
  isCorrect: boolean;
  quizData: QuizData;
  isReview?: boolean;
  reviewQuizzes?: ReviewQuiz[];
  currentReviewIndex?: number;
}

export interface QuizSubmitRequest {
  isCorrect: boolean;
}
