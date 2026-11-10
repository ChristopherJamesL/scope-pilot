import { Router } from "express";
import { httpInquirySubmission } from "./inquiries.controller.js";
import { validateBody } from "../../core/middleware/validate.js";
import { createInquirySchema } from "@scopepilot/shared";

export const inquiriesRouter = Router();

inquiriesRouter.post(
  "/",
  validateBody(createInquirySchema),
  httpInquirySubmission,
);
