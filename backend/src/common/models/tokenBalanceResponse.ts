import { z } from 'zod';

import { ResponseStatus, ServiceResponse } from './serviceResponse';

export interface TokenBalanceItem {
  contract: string;
  balance: string;
  metadata: {
    name: string | null;
    symbol: string | null;
    decimals: number | null;
    logo: string | null;
  };
}

export type TokenBalance = TokenBalanceItem[];

export class TokenBalanceResponse extends ServiceResponse<TokenBalance> {
  constructor(status: ResponseStatus, message: string, responseObject: TokenBalance, statusCode: number) {
    super(status, message, responseObject, statusCode);
  }
}

const EthAddress = z.string().regex(/^0x[a-fA-F0-9]{40}$/, { message: 'Invalid Ethereum address' });

// TODO: validate and convert completely eth address and bigint
export const TokenBalanceSchema = z.array(
  z.object({
    contract: EthAddress,
    balance: z.string(),
    metadata: z.object({
      name: z.string().nullable(),
      symbol: z.string().nullable(),
      decimals: z.number().nullable(),
      logo: z.string().nullable(),
    }),
  })
);
