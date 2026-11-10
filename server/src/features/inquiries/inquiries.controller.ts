import type { Request, Response } from "express";
import { sendCreated } from "../../core/http/response.js";
import { inquirySubmission } from "./inquiries.service.js";

import type { CreateInquiryInput } from "@scopepilot/shared";

export async function httpInquirySubmission(
  req: Request<unknown, unknown, CreateInquiryInput>,
  res: Response,
) {
  const inquiryData = req.body;

  const result = await inquirySubmission(inquiryData);

  return sendCreated(res, { data: result });
}
