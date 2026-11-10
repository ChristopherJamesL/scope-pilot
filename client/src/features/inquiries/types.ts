import type { Budget, CreateInquiryInput, Timeline } from "@scopepilot/shared";

export type InquiryFormValues = Omit<
  CreateInquiryInput,
  "budget" | "timeline"
> & {
  budget: Budget | "";
  timeline: Timeline | "";
};
