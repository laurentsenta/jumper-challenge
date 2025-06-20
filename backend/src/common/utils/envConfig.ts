import dotenv from 'dotenv';
import { cleanEnv, host, num, port, str, testOnly } from 'envalid';

dotenv.config();

export const env = cleanEnv(process.env, {
  NODE_ENV: str({ devDefault: testOnly('test'), choices: ['development', 'production', 'test'] }),
  HOST: host({ devDefault: testOnly('localhost') }),
  PORT: port({ devDefault: testOnly(3000) }),
  CORS_ORIGIN_SUFFIX: str({ devDefault: testOnly('jumper.local') }),
  COMMON_RATE_LIMIT_MAX_REQUESTS: num({ devDefault: testOnly(1000) }),
  COMMON_RATE_LIMIT_WINDOW_MS: num({ devDefault: testOnly(1000) }),
  IRON_PASSWORD: str({ devDefault: testOnly('password') }),
  IRON_DOMAIN: str({ devDefault: testOnly('.jumper.local') }),
  ALCHEMY_API_KEY: str({ devDefault: testOnly('your-alchemy-api-key') }),
  BACKEND_API_TOKEN: str({ devDefault: testOnly('test-token') }),
  // Redis configuration
  REDIS_HOST: str({ default: 'localhost' }),
  REDIS_PORT: port({ default: 6379 }),
  REDIS_PASSWORD: str({ default: '' }),
  DATABASE_URL: str({ devDefault: testOnly('file:./dev.db') }),
});
