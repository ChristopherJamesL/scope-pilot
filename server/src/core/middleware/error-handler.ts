import type { ErrorRequestHandler, RequestHandler } from "express";
import { AppError, NotFoundError } from "../http/errors.js";
import { sendError } from "../http/response.js";

export const notFoundHandler: RequestHandler = (req, _res, next) => {
  next(new NotFoundError(`Route not found: ${req.method} ${req.originalUrl}`));
};

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof AppError) {
    sendError(res, {
      status: err.statusCode,
      code: err.code,
      message: err.message,
      details: err.details,
    });
    return;
  }

  if (err?.type === "entity.parse.failed") {
    sendError(res, {
      status: 400,
      code: "INVALID_JSON",
      message: "Request body is not valid JSON",
    });
    return;
  }

  console.error(err);
  sendError(res, {
    status: 500,
    code: "INTERNAL_ERROR",
    message: "Something went wrong",
  });
};
