import { createInquiry, saveAnalysis } from "./inquiries.repository.js";
import { analyzeInquiry } from "../analysis/index.js";
import type { CreateInquiryInput } from "@scopepilot/shared";

export async function inquirySubmission(inquiryData: CreateInquiryInput) {
  console.log("Server inquiry endpoint hit, running function...");

  const inquiry = await createInquiry(inquiryData);

  const { analysis, source } = await analyzeInquiry(inquiryData);

  return saveAnalysis(inquiry.id, analysis, source);
}
