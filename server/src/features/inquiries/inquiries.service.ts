import type { CreateInquiryInput } from "@scopepilot/shared";

export async function inquirySubmission(inquiryData: CreateInquiryInput) {
  console.log("Server inquiry endpoint hit, returning data...");
  return {
    status: "ok",
    timestamp: new Date().toISOString(),
    message:
      "Message from server, inquiry submitted, no database connection at this time",
    data: inquiryData,
  };
}
