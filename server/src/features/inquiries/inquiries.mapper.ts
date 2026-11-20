import { analysisSchema } from "@scopepilot/shared";
import type {
  PublicInquirySummary,
  Budget,
  CompanySize,
  Timeline,
} from "@scopepilot/shared";
import type { Inquiry } from "../../generated/prisma/client.js";

export function toPublicSummary(inquiry: Inquiry): PublicInquirySummary {
  const parsed = analysisSchema.safeParse(inquiry.analysis);
  const analysis = parsed.success ? parsed.data : null;

  return {
    id: inquiry.id,
    submittedAt: inquiry.createdAt.toISOString(),
    analysisSource: inquiry.analysisSource,
    summary: analysis?.clientSummary ?? null,
    goals: analysis?.goals ?? [],
    answers: {
      name: inquiry.name,
      email: inquiry.email,
      companyName: inquiry.companyName,
      companySize: inquiry.companySize as CompanySize | null,
      problem: inquiry.problem,
      desiredSolution: inquiry.desiredSolution,
      existingTools: inquiry.existingTools,
      websiteUrl: inquiry.websiteUrl,
      budget: inquiry.budget as Budget,
      timeline: inquiry.timeline as Timeline,
    },
  };
}
