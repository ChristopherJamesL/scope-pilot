import { apiPost } from "../../lib/api-client";
import type {
  CreateInquiryInput,
  PublicInquirySummary,
} from "@scopepilot/shared";

export function submitInquiry(input: CreateInquiryInput) {
  return apiPost<PublicInquirySummary>("/inquiries", input);
}
