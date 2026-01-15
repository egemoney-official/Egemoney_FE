import { QueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { z } from 'zod';

const isClientError = (error: unknown): boolean => {
  return (
    error instanceof AxiosError &&
    error.response?.status != null &&
    error.response.status >= 400 &&
    error.response.status < 500
  );
};
const shouldRetry = (failureCount: number, error: unknown): boolean => {
  if (isClientError(error)) {
    return false;
  }
  return failureCount < 1;
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    },
    mutations: {
      retry: shouldRetry,
    },
  },
});

export const handleApiError = (error: unknown) => {
  const errorMessage =
    error instanceof AxiosError
      ? error.response?.data?.message || error.message
      : error instanceof Error
        ? error.message
        : '알 수 없는 오류가 발생했습니다.';

  console.error('API Error:', errorMessage);

  return { shouldRedirect: false };
};

export const processApiError = (error: unknown): AxiosError => {
  const axiosError = error as AxiosError;
  handleApiError(axiosError);
  return axiosError;
};

/**
 * Zod 스키마를 사용하여 데이터를 검증하는 공통 유틸리티 함수
 * @param schema - 검증에 사용할 Zod 스키마
 * @param data - 검증할 데이터
 * @param context - 검증 컨텍스트 정보 (url, type 등)
 * @returns 검증된 데이터
 * @throws 검증 실패 시 Error
 */
export const validateWithSchema = <T>(
  schema: z.ZodSchema<T>,
  data: unknown,
  context: { url: string; type: 'request' | 'response' },
): T => {
  try {
    return schema.parse(data);
  } catch (validationError: unknown) {
    if (validationError instanceof z.ZodError) {
      const errorType = context.type === 'request' ? '요청 데이터' : '서버 응답';
      const logContext = {
        url: context.url,
        errors: validationError.issues,
        ...(context.type === 'request' ? { variables: data } : { data }),
      };

      console.error(`${errorType} 검증 실패:`, logContext);

      throw new Error(
        `${errorType} 형식이 올바르지 않습니다: ${validationError.issues.map((issue) => issue.message).join(', ')}`,
      );
    }
    throw validationError;
  }
};
