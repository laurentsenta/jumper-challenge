import { RequestHandler } from 'express';
import { createPublicClient, http, PublicClient } from 'viem';
import { mainnet } from 'viem/chains';

const publicClient: PublicClient = createPublicClient({
  chain: mainnet,
  transport: http(),
});

const viemClient: RequestHandler = (_req, res, next) => {
  res.locals.viem = publicClient;
  next();
};

export default viemClient;
