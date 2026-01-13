import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { z } from 'zod';
import { api } from './axios';
import { processApiError } from './queryClient';
import type { HttpMethod, MutationApiOptions } from './types';

export const useMutationApi = <TData, TVariables = void>(
  method: HttpMethod,
  url: string,
  options?: MutationApiOptions<TData, TVariables>,
) => {
  return useMutation<TData, AxiosError, TVariables>({
    mutationFn: async (variables: TVariables) => {
      // 요청 데이터 검증 (클라이언트 측 사전 검증)
      if (options?.requestSchema) {
        try {
          options.requestSchema.parse(variables);
        } catch (validationError: unknown) {
          if (validationError instanceof z.ZodError) {
            console.error('요청 데이터 검증 실패:', {
              url,
              errors: validationError.issues,
              variables,
            });
            throw new Error(
              `요청 데이터가 올바르지 않습니다: ${validationError.issues.map((issue) => issue.message).join(', ')}`,
            );
          }
          throw validationError;
        }
      }

      try {
        const res =
          method === 'delete'
            ? await api[method]<TData>(url, { data: variables })
            : await api[method]<TData>(url, variables);

        // 성공 응답(200)에만 Zod 검증 적용
        // 에러 응답(4xx, 5xx)은 catch 블록으로 이동하여 검증하지 않음
        if (options?.responseSchema) {
          try {
            return options.responseSchema.parse(res.data);
          } catch (validationError: unknown) {
            // Zod 검증 실패 시 에러 로깅 및 재throw
            if (validationError instanceof z.ZodError) {
              console.error('API 응답 검증 실패:', {
                url,
                errors: validationError.issues,
                data: res.data,
              });
              throw new Error(
                `서버 응답 형식이 올바르지 않습니다: ${validationError.issues.map((issue) => issue.message).join(', ')}`,
              );
            }
            throw validationError;
          }
        }

        return res.data;
      } catch (e: unknown) {
        // AxiosError(4xx, 5xx)는 그대로 통과하여 기존 에러 처리 로직 유지
        // ZodError는 위에서 처리되므로 여기서는 AxiosError만 처리
        throw processApiError(e);
      }
    },
    ...options,
  });
};

const createMethodHook = (method: HttpMethod) => {
  return <TData, TVariables = void>(url: string, options?: MutationApiOptions<TData, TVariables>) =>
    useMutationApi<TData, TVariables>(method, url, options);
};

export const usePostApi = createMethodHook('post');
export const usePutApi = createMethodHook('put');
export const usePatchApi = createMethodHook('patch');
export const useDeleteApi = createMethodHook('delete');
