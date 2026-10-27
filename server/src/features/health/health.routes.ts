import { Router } from "express";
import { httpHealthCheck } from "./health.controller.js";

export const healthRouter = Router();

healthRouter.get("/", httpHealthCheck);
