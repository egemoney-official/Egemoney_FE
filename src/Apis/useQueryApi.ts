import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { api } from './axios';
import { processApiError, validateWithSchema } from './queryClient';
import type { QueryApiOptions } from './types';

const queryFnFactory =
  <TData>(url: string, options?: QueryApiOptions<TData>) =>
  async () => {
    try {
      const response = await api.get<TData>(url, {
        headers: options?.headers,
      });

      // 성공 응답(200)에만 Zod 검증 적용
      // 에러 응답(4xx, 5xx)은 catch 블록으로 이동하여 검증하지 않음
      if (options?.schema) {
        return validateWithSchema(options.schema, response.data, { url, type: 'response' });
      }

      return response.data;
    } catch (error) {
      // AxiosError(4xx, 5xx)는 그대로 통과하여 기존 에러 처리 로직 유지
      // ZodError는 위에서 처리되므로 여기서는 AxiosError만 처리
      processApiError(error);
      throw error;
    }
  };

export const useQueryApi = <TData>(
  queryKey: (string | number)[],
  url: string,
  options?: QueryApiOptions<TData>,
) => {
  return useQuery<TData, AxiosError>({
    queryKey,
    queryFn: queryFnFactory<TData>(url, options),
    refetchOnWindowFocus: false, // 쿼리 클라이언트 기본값과 다른 값만 명시
    ...options,
  });
};
