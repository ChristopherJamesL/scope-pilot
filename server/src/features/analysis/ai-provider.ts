import type { Analysis, CreateInquiryInput } from "@scopepilot/shared";

// Matches the AnalysisSource enum in schema.prisma.
export type AnalysisSource = "MOCK" | "LLM";

// The contract every analysis backend must follow. The rest of the app depends on this
// interface only, so the mock and the real LLM can be swapped without touching callers.
export interface AIProvider {
  readonly source: AnalysisSource;
  analyze(inquiry: CreateInquiryInput): Promise<Analysis>;
}
