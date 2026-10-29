import type { RequestHandler } from "express";
import { z } from "zod";
import { ValidationError } from "../http/errors.js";

// Route-level guard: checks req.body against a Zod schema before the controller runs.
// Usage: router.post("/", validateBody(createInquirySchema), httpCreateInquiry);
export function validateBody(schema: z.ZodType): RequestHandler {
  return (req, _res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      // { formErrors: string[], fieldErrors: { [field]: string[] } }
      throw new ValidationError("Invalid request body", z.flattenError(result.error));
    }

    // Replace the raw body with the parsed one (trimmed strings, unknown keys dropped).
    req.body = result.data;
    next();
  };
}
