import type { UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import type { z } from 'zod';

export interface ApiResponse<T = unknown> {
  data: T;
  message?: string;
  status: number;
}

export interface ApiError {
  message: string;
  status: number;
  code?: string;
}

export interface QueryOptions {
  enabled?: boolean;
  refetchOnWindowFocus?: boolean;
  retry?: number;
  staleTime?: number;
  cacheTime?: number;
}

export interface QueryApiOptions<TData>
  extends Omit<UseQueryOptions<TData, AxiosError>, 'queryKey' | 'queryFn'> {
  headers?: Record<string, string>;
  /**
   * API 응답 검증을 위한 Zod 스키마
   * 성공 응답(200)에만 적용되며, 에러 응답(4xx, 5xx)은 검증하지 않음
   */
  schema?: z.ZodSchema<TData>;
}
export interface MutationOptions<TData = unknown, TVariables = unknown> {
  onSuccess?: (data: TData, variables: TVariables) => void;
  onError?: (error: ApiError, variables: TVariables) => void;
  onSettled?: (data: TData | undefined, error: ApiError | null, variables: TVariables) => void;
}

export interface ApiConfig {
  getBaseURL: () => string;
  timeout: number;
  withCredentials: boolean;
  defaultHeaders: {
    'Content-Type': string;
  };
}

export type HttpMethod = 'post' | 'put' | 'delete' | 'patch';

export type MutationApiOptions<TData, TVariables> = Omit<
  UseMutationOptions<TData, AxiosError, TVariables>,
  'mutationFn'
> & {
  /**
   * 요청 데이터 검증을 위한 Zod 스키마
   * API 호출 전 클라이언트에서 검증
   */
  requestSchema?: z.ZodSchema<TVariables>;
  /**
   * 응답 데이터 검증을 위한 Zod 스키마
   * 성공 응답(200)에만 적용되며, 에러 응답(4xx, 5xx)은 검증하지 않음
   */
  responseSchema?: z.ZodSchema<TData>;
};
