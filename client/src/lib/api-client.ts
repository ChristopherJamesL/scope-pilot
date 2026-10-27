// Mirrors the server's response envelope (server/src/core/http/response.ts and error-handler.ts).
type SuccessBody<T> = {
  success: true;
  data: T;
  meta: Record<string, unknown> | null;
};

type ErrorBody = {
  success: false;
  error: { code: string; message: string; details: unknown };
};

export class ApiError extends Error {
  readonly status: number;
  readonly code: string;
  readonly details: unknown;

  constructor(status: number, code: string, message: string, details: unknown = null) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

export async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(`/api${path}`);

  let body: SuccessBody<T> | ErrorBody;
  try {
    body = await res.json();
  } catch {
    throw new ApiError(res.status, "INVALID_RESPONSE", "Server returned an unreadable response");
  }

  if (!body.success) {
    throw new ApiError(res.status, body.error.code, body.error.message, body.error.details);
  }

  return body.data;
}
