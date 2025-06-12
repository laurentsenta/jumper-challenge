import { SessionOptions } from 'iron-session';
import { SiweMessage } from 'viem/siwe';

const IRON_PASSWORD = process.env.IRON_PASSWORD!;
const IRON_DOMAIN = process.env.IRON_DOMAIN!;

export const ironOptions: SessionOptions = {
  password: IRON_PASSWORD,
  cookieName: 'jumper-session',
  cookieOptions: {
    domain: IRON_DOMAIN,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  },
};

export interface JumperSession {
  nonce?: string;
  siwe?: SiweMessage;
}
