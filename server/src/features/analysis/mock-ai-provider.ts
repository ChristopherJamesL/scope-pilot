import type {
  Analysis,
  Completeness,
  CreateInquiryInput,
  ProposedFeature,
} from "@scopepilot/shared";
import type { AIProvider } from "./ai-provider.js";

type Theme = {
  keywords: string[];
  goal: string;
  feature: ProposedFeature;
  question: string;
};

// Canned knowledge: if the inquiry mentions one of the keywords, add that theme's output.
const themes: Theme[] = [
  {
    keywords: ["spreadsheet", "excel", "google sheet", "manual", "paper"],
    goal: "Replace manual spreadsheet or paper tracking with one system",
    feature: {
      name: "Central data hub",
      description: "A single database and web app that replaces the current spreadsheets.",
      priority: "must-have",
    },
    question: "Can you share an example of the spreadsheets you use today?",
  },
  {
    keywords: ["invoice", "billing", "payment", "quote"],
    goal: "Speed up quoting, invoicing and payment tracking",
    feature: {
      name: "Quotes and invoicing",
      description: "Generate quotes and invoices from stored data and track their payment status.",
      priority: "must-have",
    },
    question: "Which accounting software, if any, do invoices need to sync with?",
  },
  {
    keywords: ["schedule", "booking", "appointment", "calendar", "dispatch"],
    goal: "Reduce scheduling errors and double bookings",
    feature: {
      name: "Scheduling calendar",
      description: "A shared calendar for bookings with conflict detection and reminders.",
      priority: "must-have",
    },
    question: "How many people or resources need to be scheduled at once?",
  },
  {
    keywords: ["inventory", "stock", "warehouse", "shipment", "delivery"],
    goal: "Get real-time visibility into stock and deliveries",
    feature: {
      name: "Inventory and delivery tracking",
      description: "Track stock levels and delivery status with low-stock alerts.",
      priority: "must-have",
    },
    question: "How many products or locations need to be tracked?",
  },
  {
    keywords: ["customer", "client", "lead", "crm", "member"],
    goal: "Keep customer information and history in one place",
    feature: {
      name: "Customer records",
      description: "A searchable customer list with contact details, notes and history.",
      priority: "must-have",
    },
    question: "Roughly how many customers would the system need to hold?",
  },
  {
    keywords: ["report", "dashboard", "analytics", "insight"],
    goal: "See key numbers without compiling reports by hand",
    feature: {
      name: "Reporting dashboard",
      description: "A dashboard with the key metrics and exportable reports.",
      priority: "nice-to-have",
    },
    question: "Which three numbers would you most want to see at a glance?",
  },
  {
    keywords: ["website", "online", "portal", "web app", "mobile"],
    goal: "Give customers an easy way to interact online",
    feature: {
      name: "Customer portal",
      description: "A login area where customers can view and update their own information.",
      priority: "nice-to-have",
    },
    question: "Should customers use this directly, or is it for your staff only?",
  },
];

const budgetLabels: Record<CreateInquiryInput["budget"], string> = {
  "under-5k": "Budget is under $5k",
  "5k-15k": "Budget is $5k to $15k",
  "15k-50k": "Budget is $15k to $50k",
  "50k-plus": "Budget is above $50k",
  "not-sure": "Budget is not yet decided",
};

const timelineLabels: Record<CreateInquiryInput["timeline"], string> = {
  asap: "Needed as soon as possible",
  "1-3-months": "Target delivery in 1 to 3 months",
  "3-6-months": "Target delivery in 3 to 6 months",
  flexible: "Timeline is flexible",
};

function firstSentence(text: string, max: number): string {
  const sentence = text.split(/(?<=[.!?])\s/)[0] ?? text;
  return sentence.length > max ? `${sentence.slice(0, max - 3).trimEnd()}...` : sentence;
}

function rateCompleteness(inquiry: CreateInquiryInput): Completeness {
  let score = 0;
  if (inquiry.problem.length >= 200) score += 2;
  else if (inquiry.problem.length >= 80) score += 1;
  if (inquiry.desiredSolution) score += 1;
  if (inquiry.existingTools) score += 1;
  if (inquiry.companyName) score += 1;
  if (inquiry.budget !== "not-sure") score += 1;
  if (inquiry.timeline !== "flexible") score += 1;

  if (score >= 5) return "high";
  if (score >= 3) return "medium";
  return "low";
}

// Deterministic, free stand-in for the real LLM. Same inquiry in, same analysis out.
// The demo labels its results "Simulated" so nobody mistakes them for real AI.
export class MockAIProvider implements AIProvider {
  readonly source = "MOCK" as const;

  async analyze(inquiry: CreateInquiryInput): Promise<Analysis> {
    const text = [inquiry.problem, inquiry.desiredSolution, inquiry.existingTools]
      .join(" ")
      .toLowerCase();
    const matched = themes.filter((theme) =>
      theme.keywords.some((keyword) => text.includes(keyword)),
    );

    const who = inquiry.companyName || inquiry.name;
    const problemHeadline = firstSentence(inquiry.problem, 150);

    const constraints = [budgetLabels[inquiry.budget], timelineLabels[inquiry.timeline]];
    if (inquiry.companySize) constraints.push(`Company size: ${inquiry.companySize} people`);
    if (inquiry.existingTools) constraints.push(`Currently uses: ${inquiry.existingTools}`);

    const openQuestions = matched.map((theme) => theme.question);
    if (!inquiry.desiredSolution) {
      openQuestions.push("What would the ideal solution look like for your team?");
    }
    if (!inquiry.existingTools) {
      openQuestions.push("Which tools or systems are you using today?");
    }
    if (inquiry.budget === "not-sure") {
      openQuestions.push("Do you have a rough budget range in mind?");
    }
    openQuestions.push("Who will use this day to day, and how many people?");

    return {
      clientSummary: `${who} needs help with: ${problemHeadline} We will review the details and follow up with you.`,
      problemSummary: `${inquiry.name}${inquiry.companyName ? ` (${inquiry.companyName})` : ""} reports: ${inquiry.problem}`,
      goals: matched.length > 0
        ? matched.map((theme) => theme.goal).slice(0, 10)
        : ["Understand the problem in more detail before proposing a solution"],
      proposedFeatures: matched.length > 0
        ? matched.map((theme) => theme.feature).slice(0, 15)
        : [
            {
              name: "Discovery workshop",
              description: "A short session to map the current process and define requirements.",
              priority: "must-have",
            },
          ],
      constraints: constraints.slice(0, 10),
      openQuestions: openQuestions.slice(0, 10),
      suggestedNextSteps: [
        "Send a confirmation email and propose times for a discovery call",
        "Review the open questions with the client",
        "Prepare a rough estimate once scope is confirmed",
      ],
      completeness: rateCompleteness(inquiry),
    };
  }
}
