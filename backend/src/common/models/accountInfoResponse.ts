import { z } from 'zod';

import { ResponseStatus, ServiceResponse } from './serviceResponse';

export interface AccountInfo {
  address: string;
  lastSignIn: number;
}

export class AccountInfoResponse extends ServiceResponse<AccountInfo> {
  constructor(status: ResponseStatus, message: string, responseObject: AccountInfo, statusCode: number) {
    super(status, message, responseObject, statusCode);
  }
}

export const AccountInfoSchema = z.object({
  address: z.string().describe('Ethereum address'),
  lastSignIn: z.number().describe('Timestamp of last sign in'),
});
