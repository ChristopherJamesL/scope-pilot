import type { RequestHandler } from "express";
import { z } from "zod";
import { ValidationError } from "../http/errors.js";

export function validateBody(schema: z.ZodType): RequestHandler {
  return (req, _res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      throw new ValidationError(
        "Invalid request body",
        z.flattenError(result.error),
      );
    }

    req.body = result.data;
    next();
  };
}
