import type { Analysis, CreateInquiryInput } from "@scopepilot/shared";

export type AnalysisSource = "MOCK" | "LLM";

export interface AIProvider {
  readonly source: AnalysisSource;
  analyze(inquiry: CreateInquiryInput): Promise<Analysis>;
}
