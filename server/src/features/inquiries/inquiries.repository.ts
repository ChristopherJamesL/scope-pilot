import { prisma } from "../../core/db/prisma.js";
import type { AnalysisSource } from "../../generated/prisma/enums.js";
import type { CreateInquiryInput, Analysis } from "@scopepilot/shared";

const optionalFields = [
  "companyName",
  "companySize",
  "desiredSolution",
  "existingTools",
  "websiteUrl",
] as const;

function emptyToNull(value: string): string | null {
  return value === "" ? null : value;
}

export function createInquiry(inquiryData: CreateInquiryInput) {
  const formattedFields = Object.fromEntries(
    optionalFields.map((field) => [field, emptyToNull(inquiryData[field])]),
  );

  return prisma.inquiry.create({
    data: { ...inquiryData, ...formattedFields },
  });
}

export function saveAnalysis(
  id: string,
  analysis: Analysis,
  source: AnalysisSource,
) {
  return prisma.inquiry.update({
    where: { id },
    data: { analysis, analysisSource: source, status: "ANALYZED" },
  });
}
