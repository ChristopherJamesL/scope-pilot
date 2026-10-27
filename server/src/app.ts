import express from 'express';
import { healthRouter } from './features/health/index.js';
import { errorHandler, notFoundHandler } from './core/http/error-handler.js';

export const app = express();

app.use(express.json());

app.use('/api/health', healthRouter);

// Must come after all routes
app.use(notFoundHandler);
app.use(errorHandler);
