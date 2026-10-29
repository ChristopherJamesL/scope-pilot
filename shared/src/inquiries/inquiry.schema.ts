import { z } from "zod";

export const companySizes = ["1-10", "11-50", "51-200", "200+"] as const;
export const budgets = [
  "under-5k",
  "5k-15k",
  "15k-50k",
  "50k-plus",
  "not-sure",
] as const;
export const timelines = [
  "asap",
  "1-3-months",
  "3-6-months",
  "flexible",
] as const;

export type CompanySize = (typeof companySizes)[number];
export type Budget = (typeof budgets)[number];
export type Timeline = (typeof timelines)[number];

// The form submits "" for fields the client leaves empty, so optional fields accept "".
const optionalText = (max: number) =>
  z.string().trim().max(max, `Keep this under ${max} characters`);

export const createInquirySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Enter your name")
    .max(100, "Keep this under 100 characters"),
  email: z
    .email("Enter a valid email address")
    .max(254, "Keep this under 254 characters"),
  companyName: optionalText(150),
  companySize: z.enum(companySizes).or(z.literal("")),
  problem: z
    .string()
    .trim()
    .min(20, "Tell us a bit more (at least 20 characters)")
    .max(5000, "Keep this under 5000 characters"),
  desiredSolution: optionalText(1000),
  existingTools: optionalText(500),
  websiteUrl: z
    .url("Enter a valid URL, including https://")
    .max(300, "Keep this under 300 characters")
    .or(z.literal("")),
  budget: z.enum(budgets, { error: "Select a budget" }),
  timeline: z.enum(timelines, { error: "Select a timeline" }),
});

export type CreateInquiryInput = z.infer<typeof createInquirySchema>;
