import {
  budgetLabels,
  budgets,
  companySizeLabels,
  companySizes,
  timelineLabels,
  timelines,
} from "@scopepilot/shared";

// Dropdown options, built from the shared values and labels so the form can't drift from the schema.
export const companySizeOptions = companySizes.map((value) => ({
  value,
  label: companySizeLabels[value],
}));

export const budgetOptions = budgets.map((value) => ({
  value,
  label: budgetLabels[value],
}));

export const timelineOptions = timelines.map((value) => ({
  value,
  label: timelineLabels[value],
}));
