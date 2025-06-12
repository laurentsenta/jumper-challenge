import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import express, { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { isAddress } from 'viem';
import { z } from 'zod';

import { createApiResponse } from '@/api-docs/openAPIResponseBuilders';
import { ResponseStatus } from '@/common/models/serviceResponse';
import { TokenBalance, TokenBalanceResponse, TokenBalanceSchema } from '@/common/models/tokenBalanceResponse';
import { handleServiceResponse } from '@/common/utils/httpHandlers';

export const tokenBalanceRegistry = new OpenAPIRegistry();

export const tokenBalanceRouter: Router = (() => {
  const router = express.Router();

  tokenBalanceRegistry.registerPath({
    method: 'get',
    path: '/token-balance/{address}',
    tags: ['Token Balance'],
    request: {
      params: z.object({
        address: z.string().describe('Ethereum address'),
      }),
    },
    responses: createApiResponse(TokenBalanceSchema, 'Token balances retrieved successfully'),
  });

  router.get('/:address', async (req: Request, res: Response) => {
    const { address } = req.params;

    // Validate Ethereum address
    if (!isAddress(address)) {
      const serviceResponse = new TokenBalanceResponse(
        ResponseStatus.Failed,
        'Invalid Ethereum address format',
        {},
        StatusCodes.BAD_REQUEST
      );
      return handleServiceResponse(serviceResponse, res);
    }

    // Allow other backend and auth'd users
    let isAllowed = res.locals.isBackend;
    if (!isAllowed && res.locals.iron?.siwe?.address.toLowerCase() === address.toLowerCase()) {
      isAllowed = true;
    }

    if (!isAllowed) {
      const serviceResponse = new TokenBalanceResponse(
        ResponseStatus.Failed,
        'Unauthorized',
        {},
        StatusCodes.UNAUTHORIZED
      );
      return handleServiceResponse(serviceResponse, res);
    }

    try {
      // TODO: Fetch ERC20 token balances
      const responseData: TokenBalance = {
        eth: '42780000000000000000',
      };

      const serviceResponse = new TokenBalanceResponse(
        ResponseStatus.Success,
        'Token balances retrieved successfully',
        responseData,
        StatusCodes.OK
      );

      handleServiceResponse(serviceResponse, res);
    } catch (error) {
      console.error('Error fetching token balances:', error);

      const serviceResponse = new TokenBalanceResponse(
        ResponseStatus.Failed,
        'Failed to fetch token balances',
        {},
        StatusCodes.SERVICE_UNAVAILABLE
      );
      handleServiceResponse(serviceResponse, res);
    }
  });

  return router;
})();
