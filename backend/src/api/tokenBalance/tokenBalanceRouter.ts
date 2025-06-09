import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import express, { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { formatEther, isAddress, PublicClient } from 'viem';
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

    try {
      const viemClient: PublicClient = req.app.locals.viem;

      if (!viemClient) {
        throw new Error('Viem client not initialized');
      }

      // Fetch ETH balance
      const ethBalance = await viemClient.getBalance({ address });
      const formattedEthBalance = formatEther(ethBalance);

      // TODO: Fetch ERC20 token balances
      const responseData: TokenBalance = {
        eth: formattedEthBalance,
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
