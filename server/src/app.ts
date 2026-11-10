import express from "express";
import { healthRouter } from "./features/health/index.js";
import { inquiriesRouter } from "./features/inquiries/inquiries.routes.js";
import {
  errorHandler,
  notFoundHandler,
} from "./core/middleware/error-handler.js";

export const app = express();

app.use(express.json());

app.use("/api/health", healthRouter);
app.use("/api/inquiries", inquiriesRouter);

// Must come after all routes
app.use(notFoundHandler);
app.use(errorHandler);
