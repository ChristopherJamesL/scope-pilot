import type { CreateInquiryInput } from "@scopepilot/shared";
import { apiPost } from "../../lib/api-client";

export type InquirySubmissionResponse = {
  message: string;
};

export function submitInquiry(input: CreateInquiryInput) {
  return apiPost<InquirySubmissionResponse>("/inquiries", input);
}
