import { z } from "zod";

export const featurePriorities = ["must-have", "nice-to-have"] as const;
export const completenessLevels = ["low", "medium", "high"] as const;

export type FeaturePriority = (typeof featurePriorities)[number];
export type Completeness = (typeof completenessLevels)[number];

const proposedFeatureSchema = z.object({
  name: z.string().trim().min(1).max(100),
  description: z.string().trim().min(1).max(500),
  priority: z.enum(featurePriorities),
});

// Short list of short strings, used for goals, constraints, questions and next steps.
const stringList = (maxItems: number) =>
  z.array(z.string().trim().min(1).max(300)).max(maxItems);

// The shape of the AI's output. Both the mock and the real LLM provider must return this,
// and it is stored as JSON in inquiries.analysis.
export const analysisSchema = z.object({
  clientSummary: z.string().trim().min(1).max(600),
  problemSummary: z.string().trim().min(1).max(1500),
  goals: stringList(10),
  proposedFeatures: z.array(proposedFeatureSchema).max(15),
  constraints: stringList(10),
  openQuestions: stringList(10),
  suggestedNextSteps: stringList(10),
  completeness: z.enum(completenessLevels),
});

export type ProposedFeature = z.infer<typeof proposedFeatureSchema>;
export type Analysis = z.infer<typeof analysisSchema>;
