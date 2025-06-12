import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import express, { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { z } from 'zod';

import { createApiResponse } from '@/api-docs/openAPIResponseBuilders';
import { LeaderboardResponse, LeaderboardSchema } from '@/common/models/leaderboardResponse';
import { ResponseStatus } from '@/common/models/serviceResponse';
import { handleServiceResponse } from '@/common/utils/httpHandlers';
import { walletService } from '@/data/wallet';

export const leaderboardRegistry = new OpenAPIRegistry();

export const leaderboardRouter: Router = (() => {
  const router = express.Router();

  leaderboardRegistry.registerPath({
    method: 'get',
    path: '/leaderboard',
    tags: ['Leaderboard'],
    request: {
      query: z.object({
        chainId: z.string().transform(Number).optional().default('1'),
        limit: z.string().transform(Number).optional().default('10'),
      }),
    },
    responses: createApiResponse(LeaderboardSchema, 'Leaderboard retrieved successfully'),
  });

  router.get('/', async (req: Request, res: Response) => {
    try {
      const chainId = Number(req.query.chainId) || 1;
      const limit = Math.min(30, Number(req.query.limit) || 10);

      const leaderboard = await walletService.getLeaderboard(chainId, limit);

      const serviceResponse = new LeaderboardResponse(
        ResponseStatus.Success,
        'Leaderboard retrieved successfully',
        leaderboard,
        StatusCodes.OK
      );

      handleServiceResponse(serviceResponse, res);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);

      const serviceResponse = new LeaderboardResponse(
        ResponseStatus.Failed,
        'Failed to fetch leaderboard',
        [],
        StatusCodes.SERVICE_UNAVAILABLE
      );
      handleServiceResponse(serviceResponse, res);
    }
  });

  return router;
})();
