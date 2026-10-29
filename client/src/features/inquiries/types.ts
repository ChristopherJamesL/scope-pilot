import type { Budget, CreateInquiryInput, Timeline } from "@scopepilot/shared";

// What the form holds while the client is typing: the validated shape, except
// the required selects start empty until a choice is made.
export type InquiryFormValues = Omit<CreateInquiryInput, "budget" | "timeline"> & {
  budget: Budget | "";
  timeline: Timeline | "";
};
