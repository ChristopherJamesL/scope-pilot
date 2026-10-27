import express from 'express';
import { healthRouter } from './features/health/index.js';

export const app = express();

app.use(express.json());

app.use('/api/health', healthRouter);
