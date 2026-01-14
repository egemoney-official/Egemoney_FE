import { DEFAULT_API_TIMEOUT, DEFAULT_API_BASE_URL, CONTENT_TYPES } from './constants';
import type { ApiConfig } from './types';

const createBaseURL = (): string => {
  const envUrl = import.meta.env.VITE_API_URL;

  if (envUrl) {
    return envUrl;
  }

  return DEFAULT_API_BASE_URL;
};

export const apiConfig: ApiConfig = {
  getBaseURL: createBaseURL,
  timeout: DEFAULT_API_TIMEOUT,
  withCredentials: true,
  defaultHeaders: {
    'Content-Type': CONTENT_TYPES.JSON,
  },
};
