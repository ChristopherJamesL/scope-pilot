import type { InquiryFormValues } from "./types";

// Deliberately messy, like real inquiries. Used by the "Try a sample inquiry" button.
export const sampleInquiries: InquiryFormValues[] = [
  {
    name: "Dana Whitfield",
    email: "dana@ironhousegym.example",
    companyName: "Ironhouse Gym",
    companySize: "11-50",
    problem:
      "so we run a small gym and our booking is a mess. people double book classes all the time, we take bookings on whatsapp and some on a spreadsheet that my manager updates when she remembers. members complain and we've lost a few. need something better asap, maybe an app?? not sure what's even possible",
    desiredSolution: "an app where people can book classes, maybe pay too",
    budget: "not-sure",
    timeline: "asap",
    existingTools: "WhatsApp, Google Sheets, Square for payments at the desk",
    websiteUrl: "",
  },
  {
    name: "Marcus Lee",
    email: "marcus@lee-and-sons.example",
    companyName: "Lee & Sons Logistics",
    companySize: "51-200",
    problem:
      "Our dispatchers spend half the day calling drivers for status updates and then retyping everything into our old ERP. Invoices go out late because proof-of-delivery photos arrive by email and someone has to match them by hand. We lose maybe 2 days of cash flow on every invoice. Looking for a way to automate the delivery update -> invoice step without replacing the ERP, which we're locked into until 2028.",
    desiredSolution: "Driver mobile app that sends status + photo, auto-attached to the right job and invoice",
    budget: "15k-50k",
    timeline: "3-6-months",
    existingTools: "Legacy ERP (SQL Server backend), Outlook, Excel",
    websiteUrl: "https://lee-and-sons.example",
  },
  {
    name: "Priya",
    email: "priya@example.com",
    companyName: "",
    companySize: "",
    problem: "I need a website for my business. Something modern.",
    desiredSolution: "",
    budget: "not-sure",
    timeline: "flexible",
    existingTools: "",
    websiteUrl: "",
  },
];
