import { Redis } from 'ioredis';
import { z } from 'zod';

import { getRedisClient } from './redis';

// Token metadata schema
const TokenMetadataSchema = z.object({
  name: z.string().nullable(),
  symbol: z.string().nullable(),
  decimals: z.number().nullable(),
  logo: z.string().nullable(),
});

export type TokenMetadata = z.infer<typeof TokenMetadataSchema>;
export type TokenMetadataWithKey = TokenMetadata & {
  chainId: number;
  address: string;
};

export class TokenService {
  private redis: Redis;
  private readonly CACHE_TTL = 10 * 60 * 60; // 10 hours in seconds

  constructor() {
    this.redis = getRedisClient();
  }

  private getCacheKey(address: string, chainId: number): string {
    return `token:${chainId}:${address.toLowerCase()}`;
  }

  async getTokenMetadata(contractAddress: string, chainId: number): Promise<TokenMetadata | null> {
    const cacheKey = this.getCacheKey(contractAddress, chainId);
    const cachedData = await this.redis.get(cacheKey);

    if (cachedData) {
      try {
        return TokenMetadataSchema.parse(JSON.parse(cachedData));
      } catch (error) {
        // If parsing fails, invalidate the cache
        await this.redis.del(cacheKey);
        return null;
      }
    }

    return null;
  }

  async setTokenMetadata(metadata: TokenMetadataWithKey): Promise<void> {
    const { address, chainId, ...payload } = metadata;
    const cacheKey = this.getCacheKey(address, chainId);
    await this.redis.setex(cacheKey, this.CACHE_TTL, JSON.stringify(payload));
  }
}

export const tokenService = new TokenService();
