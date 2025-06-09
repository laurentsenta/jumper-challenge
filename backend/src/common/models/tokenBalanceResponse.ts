import { z } from 'zod';

import { ResponseStatus, ServiceResponse } from './serviceResponse';

export interface TokenBalance {
  [key: string]: string; // TODO: use Bigint
}

export class TokenBalanceResponse extends ServiceResponse<TokenBalance> {
  constructor(status: ResponseStatus, message: string, responseObject: TokenBalance, statusCode: number) {
    super(status, message, responseObject, statusCode);
  }
}

const EthAddress = z.string().regex(/^0x[a-fA-F0-9]{40}$/, { message: 'Invalid Ethereum address' });

// TODO: validate and convert completely eth address and bigint
export const TokenBalanceSchema = z.record(EthAddress, z.string());
