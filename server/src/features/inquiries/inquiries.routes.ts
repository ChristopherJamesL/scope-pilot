import { Router } from "express";
import { httpInquirySubmission } from "./inquiries.controller.js";

export const inquiriesRouter = Router();

inquiriesRouter.post("/", httpInquirySubmission);
