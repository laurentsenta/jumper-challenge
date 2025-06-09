import cors from 'cors';
import express, { Express } from 'express';
import helmet from 'helmet';
import { pino } from 'pino';

import { healthCheckRouter } from '@/api/healthCheck/healthCheckRouter';
import { openAPIRouter } from '@/api-docs/openAPIRouter';
import errorHandler from '@/common/middleware/errorHandler';
import rateLimiter from '@/common/middleware/rateLimiter';
import requestLogger from '@/common/middleware/requestLogger';
import viemClient from '@/common/middleware/viemClient';
import { env } from '@/common/utils/envConfig';

import { accountRouter } from './api/account/accountRouter';
import { tokenBalanceRouter } from './api/tokenBalance/tokenBalanceRouter';
import nonceService from './common/middleware/nonceService';

const logger = pino({ name: 'server start' });
const app: Express = express();

// Set the application to trust the reverse proxy
app.set('trust proxy', true);

// Middlewares
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(helmet());
app.use(rateLimiter);

app.use(requestLogger);
app.use(viemClient);
app.use(nonceService);

// Routes
app.use('/health-check', healthCheckRouter);
app.use('/token-balance', tokenBalanceRouter);
app.use('/account', accountRouter);

// Swagger UI
app.use(openAPIRouter);

// Error handlers
app.use(errorHandler());

export { app, logger };
