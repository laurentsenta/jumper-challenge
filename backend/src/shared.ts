import { SessionOptions } from 'iron-session';
import { SiweMessage } from 'viem/siwe';

import { env } from './common/utils/envConfig';

export const ironOptions: SessionOptions = {
  password: env.IRON_PASSWORD,
  cookieName: 'jumper-session',
  cookieOptions: {
    domain: env.IRON_DOMAIN,
    secure: env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
  },
};

export interface JumperSession {
  nonce?: string;
  siwe?: SiweMessage;
}
