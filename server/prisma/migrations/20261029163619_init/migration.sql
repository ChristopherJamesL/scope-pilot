-- CreateEnum
CREATE TYPE "InquiryStatus" AS ENUM ('NEW', 'ANALYZED', 'CONTACTED', 'PROPOSAL_SENT', 'WON', 'LOST');

-- CreateEnum
CREATE TYPE "AnalysisSource" AS ENUM ('MOCK', 'LLM');

-- CreateTable
CREATE TABLE "inquiries" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "companyName" TEXT,
    "companySize" TEXT,
    "problem" TEXT NOT NULL,
    "desiredSolution" TEXT,
    "existingTools" TEXT,
    "websiteUrl" TEXT,
    "budget" TEXT NOT NULL,
    "timeline" TEXT NOT NULL,
    "status" "InquiryStatus" NOT NULL DEFAULT 'NEW',
    "analysis" JSONB,
    "analysisSource" "AnalysisSource",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "inquiries_pkey" PRIMARY KEY ("id")
);
