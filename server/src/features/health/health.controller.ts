import type { Request, Response } from "express";
import { sendOk } from "../../core/http/response.js";
import { healthCheck } from "./health.service.js";

export function httpHealthCheck(_req: Request, res: Response) {
  const result = healthCheck();

  return sendOk(res, { data: result });
}
