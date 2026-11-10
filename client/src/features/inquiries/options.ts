import {
  budgetLabels,
  budgets,
  companySizeLabels,
  companySizes,
  timelineLabels,
  timelines,
} from "@scopepilot/shared";

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
