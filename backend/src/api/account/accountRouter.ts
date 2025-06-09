import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import express, { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { isAddress } from 'viem';
import { generateSiweNonce } from 'viem/siwe';
import { z } from 'zod';

import { createApiResponse } from '@/api-docs/openAPIResponseBuilders';
import { AccountNonceResponse, AccountNonceSchema } from '@/common/models/accountNonceResponse';
import { ResponseStatus } from '@/common/models/serviceResponse';
import { handleServiceResponse } from '@/common/utils/httpHandlers';

export const accountRegistry = new OpenAPIRegistry();

export const accountRouter: Router = (() => {
  const router = express.Router();

  accountRegistry.registerPath({
    method: 'get',
    path: '/account/nonce/{address}',
    tags: ['Account'],
    request: {
      params: z.object({
        address: z.string().describe('Ethereum address'),
      }),
    },
    responses: createApiResponse(AccountNonceSchema, 'Account nonce retrieved successfully'),
  });

  router.get('/nonce/:address', async (req: Request, res: Response) => {
    const { address } = req.params;

    if (!isAddress(address)) {
      const serviceResponse = new AccountNonceResponse(
        ResponseStatus.Failed,
        'Invalid Ethereum address format',
        null,
        StatusCodes.BAD_REQUEST
      );
      return handleServiceResponse(serviceResponse, res);
    }

    const nonceService = res.locals.nonceService;
    let nonce = await nonceService.getNonce(address);

    if (!nonce) {
      nonce = generateSiweNonce();
      await nonceService.setNonce(address, nonce);
    }

    const serviceResponse = new AccountNonceResponse(
      ResponseStatus.Success,
      'Account nonce retrieved successfully',
      { nonce },
      StatusCodes.OK
    );

    handleServiceResponse(serviceResponse, res);
  });

  return router;
})();
