import { apiGet } from "../../lib/api-client";

export type HealthData = {
  status: string;
  timestamp: string;
};

export function fetchHealth() {
  return apiGet<HealthData>("/health");
}
