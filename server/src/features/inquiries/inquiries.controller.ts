import type { Request, Response } from "express";
import { sendOk } from "../../core/http/response.js";
import { inquirySubmission } from "./inquiries.service.js";

export async function httpInquirySubmission(_req: Request, res: Response) {
  const result = await inquirySubmission();
  return sendOk(res, { data: result });
}
