import Redis from 'ioredis';

import { env } from '../common/utils/envConfig';

let redisClient: Redis | null = null;

export function getRedisClient(): Redis {
  if (!redisClient) {
    redisClient = new Redis({
      host: env.REDIS_HOST,
      port: env.REDIS_PORT,
      password: env.REDIS_PASSWORD,
      retryStrategy: (times) => {
        const delay = Math.min(times * 50, 2000);
        return delay;
      },
    });

    redisClient.on('error', (error) => {
      console.error('Redis connection error:', error);
    });

    redisClient.on('connect', () => {
      console.log('Successfully connected to Redis');
    });
  }

  return redisClient;
}

export async function closeRedisConnection(): Promise<void> {
  if (redisClient) {
    await redisClient.quit();
  }
}
