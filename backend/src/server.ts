import express, { Express } from 'express';
import helmet from 'helmet';
import { pino } from 'pino';

import { healthCheckRouter } from '@/api/healthCheck/healthCheckRouter';
import { leaderboardRouter } from '@/api/leaderboard/leaderboardRouter';
import { openAPIRouter } from '@/api-docs/openAPIRouter';
import errorHandler from '@/common/middleware/errorHandler';
import rateLimiter from '@/common/middleware/rateLimiter';
import requestLogger from '@/common/middleware/requestLogger';

import { tokenBalanceRouter } from './api/tokenBalance/tokenBalanceRouter';
import authMiddleware from './common/middleware/auth';
import corsMiddleware from './common/middleware/cors';

const logger = pino({ name: 'server start' });
const app: Express = express();

// Set the application to trust the reverse proxy
app.set('trust proxy', true);

// Middlewares
app.use(corsMiddleware);
app.use(helmet());
app.use(rateLimiter);
app.use(express.json());

app.use(requestLogger);
app.use(authMiddleware);

// Routes
app.use('/health-check', healthCheckRouter);
app.use('/token-balance', tokenBalanceRouter);
app.use('/leaderboard', leaderboardRouter);

// Swagger UI
app.use(openAPIRouter);

// Error handlers
app.use(errorHandler());

export { app, logger };
