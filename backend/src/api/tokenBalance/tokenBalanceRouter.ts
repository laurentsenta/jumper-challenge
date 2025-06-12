import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { Alchemy, Network } from 'alchemy-sdk';
import express, { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { isAddress } from 'viem';
import { z } from 'zod';

import { createApiResponse } from '@/api-docs/openAPIResponseBuilders';
import { ResponseStatus } from '@/common/models/serviceResponse';
import { TokenBalance, TokenBalanceResponse, TokenBalanceSchema } from '@/common/models/tokenBalanceResponse';
import { handleServiceResponse } from '@/common/utils/httpHandlers';
import { tokenService } from '@/data/token';

import { env } from '../../common/utils/envConfig';

export const tokenBalanceRegistry = new OpenAPIRegistry();

const ETH_METADATA = {
  symbol: 'ETH',
  decimals: 18,
  logo: 'https://etherscan.io/images/svg/brands/ethereum-original.svg',
  name: 'Ethereum',
};

const hasValidBalance = <T extends { balance: string | null }>(x: T): x is T & { balance: string } => {
  return x.balance !== null && BigInt(x.balance) > BigInt(0);
};

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
        [],
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
        [],
        StatusCodes.UNAUTHORIZED
      );
      return handleServiceResponse(serviceResponse, res);
    }

    try {
      const chainId = 1; // Always assume Ethereum mainnet for now
      const alchemy = new Alchemy({
        apiKey: env.ALCHEMY_API_KEY,
        network: Network.ETH_MAINNET,
      });

      // TODO: process through pagination
      const balancesResponse = await alchemy.core.getTokenBalances(address);

      const balances = balancesResponse.tokenBalances
        .map((token) => ({
          contract: token.contractAddress,
          balance: token.tokenBalance,
        }))
        .filter(hasValidBalance);

      // get metadata
      const balancesWithMetadata = await Promise.all(
        balances.map(async (token) => {
          // Try to get metadata from cache first
          let metadata = await tokenService.getTokenMetadata(token.contract, chainId);

          if (!metadata) {
            const metadataResponse = await alchemy.core.getTokenMetadata(token.contract);

            metadata = {
              name: metadataResponse.name,
              symbol: metadataResponse.symbol,
              decimals: metadataResponse.decimals,
              logo: metadataResponse.logo,
            };

            await tokenService.setTokenMetadata({
              ...metadata,
              address: token.contract,
              chainId,
            });
          }

          return {
            contract: token.contract,
            balance: token.balance,
            metadata,
          };
        })
      );
      console.log(`The metadata of ${address} address are:`, balancesWithMetadata);

      // add ethereum
      const ethBalance = await alchemy.core.getBalance(address);
      balancesWithMetadata.push({
        contract: '0x0',
        balance: ethBalance.toString(),
        metadata: ETH_METADATA,
      });

      // sort by symbol name (nulls last) then by contract address
      balancesWithMetadata.sort((a, b) => {
        if (a.metadata.symbol && b.metadata.symbol) {
          return a.metadata.symbol.toLowerCase() < b.metadata.symbol.toLowerCase() ? -1 : 1;
        }
        return a.contract.toLowerCase() < b.contract.toLowerCase() ? -1 : 1;
      });

      // add the ethereum balance
      console.log(`The ETH balance of ${address} address is:`, ethBalance);

      const responseData: TokenBalance = balancesWithMetadata;

      // TODO: with the response, return a cache ttl
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
        [],
        StatusCodes.SERVICE_UNAVAILABLE
      );
      handleServiceResponse(serviceResponse, res);
    }
  });

  return router;
})();
