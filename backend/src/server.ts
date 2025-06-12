import express, { Express } from 'express';
import helmet from 'helmet';
import { pino } from 'pino';

import { healthCheckRouter } from '@/api/healthCheck/healthCheckRouter';
import { openAPIRouter } from '@/api-docs/openAPIRouter';
import errorHandler from '@/common/middleware/errorHandler';
import rateLimiter from '@/common/middleware/rateLimiter';
import requestLogger from '@/common/middleware/requestLogger';
import viemClient from '@/common/middleware/viemClient';

import { accountRouter } from './api/account/accountRouter';
import { tokenBalanceRouter } from './api/tokenBalance/tokenBalanceRouter';
import accountService from './common/middleware/accountService';
import authMiddleware from './common/middleware/auth';
import corsMiddleware from './common/middleware/cors';
import nonceService from './common/middleware/nonceService';

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
app.use(viemClient);
app.use(authMiddleware);
app.use(nonceService(app));
app.use(accountService(app));

// Routes
app.use('/health-check', healthCheckRouter);
app.use('/token-balance', tokenBalanceRouter);
app.use('/account', accountRouter);

// Swagger UI
app.use(openAPIRouter);

// Error handlers
app.use(errorHandler());

export { app, logger };
