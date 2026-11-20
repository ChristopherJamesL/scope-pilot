import { createInquiry, saveAnalysis } from "./inquiries.repository.js";
import { analyzeInquiry } from "../analysis/index.js";
import type { CreateInquiryInput } from "@scopepilot/shared";

export async function inquirySubmission(inquiryData: CreateInquiryInput) {
  const inquiry = await createInquiry(inquiryData);

  try {
    const { analysis, source } = await analyzeInquiry(inquiryData);

    return await saveAnalysis(inquiry.id, analysis, source);
  } catch (e) {
    console.error(
      `Inquiry submission success, failure on inquiry analysis with inquiry id: ${inquiry.id}`,
      e,
    );
    return inquiry;
  }
}
