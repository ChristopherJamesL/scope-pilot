import type { Response } from "express";

type SendOptions<T> = {
  data: T;
  meta?: Record<string, unknown> | null;
  status?: number;
};

export function sendOk<T>(
  res: Response,
  { data, meta = null, status = 200 }: SendOptions<T>,
) {
  return res.status(status).json({ success: true, data, meta });
}

export function sendCreated<T>(
  res: Response,
  { data, meta = null }: Omit<SendOptions<T>, "status">,
) {
  return sendOk(res, { data, meta, status: 201 });
}

type ErrorOptions = {
  status: number;
  code: string;
  message: string;
  details?: unknown;
};

export function sendError(
  res: Response,
  { status, code, message, details = null }: ErrorOptions,
) {
  return res.status(status).json({
    success: false,
    error: { code, message, details },
  });
}
