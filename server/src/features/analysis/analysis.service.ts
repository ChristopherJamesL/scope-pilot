import { analysisSchema } from "@scopepilot/shared";
import { MockAIProvider } from "./mock-ai-provider.js";
import type { Analysis, CreateInquiryInput } from "@scopepilot/shared";
import type { AIProvider, AnalysisSource } from "./ai-provider.js";

const mockProvider = new MockAIProvider();

function selectProvider(): AIProvider {
  return mockProvider;
}

export async function analyzeInquiry(
  inquiry: CreateInquiryInput,
): Promise<{ analysis: Analysis; source: AnalysisSource }> {
  const provider = selectProvider();
  const result = await provider.analyze(inquiry);

  return {
    analysis: analysisSchema.parse(result),
    source: provider.source,
  };
}
