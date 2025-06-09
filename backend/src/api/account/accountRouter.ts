import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import express, { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { isAddress, verifyMessage } from 'viem';
import { generateSiweNonce } from 'viem/siwe';
import { z } from 'zod';

import { createApiResponse } from '@/api-docs/openAPIResponseBuilders';
import { AccountAuthRequestSchema } from '@/common/models/accountAuthRequest';
import { AccountAuthResponse, AccountAuthSchema } from '@/common/models/accountAuthResponse';
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

  accountRegistry.registerPath({
    method: 'post',
    path: '/account/',
    tags: ['Account'],
    request: {
      body: {
        content: {
          'application/json': {
            schema: AccountAuthRequestSchema,
          },
        },
      },
    },
    responses: createApiResponse(AccountAuthSchema, 'Account authenticated successfully'),
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

  router.post('/', async (req: Request, res: Response) => {
    const { address, signature } = req.body;

    if (!isAddress(address)) {
      const serviceResponse = new AccountAuthResponse(
        ResponseStatus.Failed,
        'Invalid Ethereum address',
        { token: '', expiresAt: 0 },
        StatusCodes.BAD_REQUEST
      );
      return handleServiceResponse(serviceResponse, res);
    }

    try {
      const nonce = await res.locals.nonceService.getNonce(address);

      if (!nonce) {
        const serviceResponse = new AccountAuthResponse(
          ResponseStatus.Failed,
          'No nonce found for this address',
          { token: '', expiresAt: 0 },
          StatusCodes.BAD_REQUEST
        );
        return handleServiceResponse(serviceResponse, res);
      }

      const isValid = await verifyMessage({
        address,
        message: nonce,
        signature,
      });

      if (!isValid) {
        const serviceResponse = new AccountAuthResponse(
          ResponseStatus.Failed,
          'Invalid signature',
          { token: '', expiresAt: 0 },
          StatusCodes.BAD_REQUEST
        );
        return handleServiceResponse(serviceResponse, res);
      }

      const token = 'dummy-token';
      const expiresAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hours

      // Get or create account
      const account = await res.locals.accountService.getAccount(address);
      if (!account) {
        await res.locals.accountService.createAccount(address, token);
      } else {
        await res.locals.accountService.updateLastSignIn(address, token);
      }

      const serviceResponse = new AccountAuthResponse(
        ResponseStatus.Success,
        'Account authenticated successfully',
        { token, expiresAt },
        StatusCodes.OK
      );

      handleServiceResponse(serviceResponse, res);
    } catch (error) {
      console.error('Error authenticating account:', error);

      const serviceResponse = new AccountAuthResponse(
        ResponseStatus.Failed,
        'Failed to authenticate account',
        { token: '', expiresAt: 0 },
        StatusCodes.INTERNAL_SERVER_ERROR
      );
      handleServiceResponse(serviceResponse, res);
    }
  });

  return router;
})();
