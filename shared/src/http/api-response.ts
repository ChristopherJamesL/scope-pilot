// The JSON envelope every API response uses.

export type ApiSuccessBody<T> = {
  success: true;
  data: T;
  meta: Record<string, unknown> | null;
};

export type ApiErrorBody = {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
};

export type ApiResponseBody<T> = ApiSuccessBody<T> | ApiErrorBody;
