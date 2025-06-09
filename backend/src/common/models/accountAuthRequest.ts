import { z } from 'zod';

export interface AccountAuthRequest {
  address: string;
  signature: string;
}

export const AccountAuthRequestSchema = z.object({
  address: z.string().describe('Ethereum address'),
  signature: z.string().describe('Signature of the nonce message'),
});
