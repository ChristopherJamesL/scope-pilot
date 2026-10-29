import type { ErrorRequestHandler, RequestHandler } from "express";
import { AppError, NotFoundError } from "../http/errors.js";
import { sendError } from "../http/response.js";

// Runs after all routes: anything that reached here matched no route.
export const notFoundHandler: RequestHandler = (req, _res, next) => {
  next(new NotFoundError(`Route not found: ${req.method} ${req.originalUrl}`));
};

// Express recognizes an error handler by its four parameters, so _next must stay.
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

  // Malformed JSON body, raised by express.json()
  if (err?.type === "entity.parse.failed") {
    sendError(res, {
      status: 400,
      code: "INVALID_JSON",
      message: "Request body is not valid JSON",
    });
    return;
  }

  // Unknown error: log it, but do not leak internals to the client.
  console.error(err);
  sendError(res, {
    status: 500,
    code: "INTERNAL_ERROR",
    message: "Something went wrong",
  });
};
