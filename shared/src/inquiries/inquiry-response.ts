import type { AnalysisSource } from "../analysis/analysis.schema.js";
import type { Budget, CompanySize, Timeline } from "./inquiry.schema.js";

export type PublicInquirySummary = {
  id: string;
  submittedAt: string;
  analysisSource: AnalysisSource | null;
  summary: string | null;
  goals: string[];
  answers: {
    name: string;
    email: string;
    companyName: string | null;
    companySize: CompanySize | null;
    problem: string;
    desiredSolution: string | null;
    existingTools: string | null;
    websiteUrl: string | null;
    budget: Budget;
    timeline: Timeline;
  };
};
