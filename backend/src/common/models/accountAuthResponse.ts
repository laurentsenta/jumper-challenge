import { z } from 'zod';

import { ResponseStatus, ServiceResponse } from './serviceResponse';

export interface AccountAuth {
  token: string;
  expiresAt: number;
}

export class AccountAuthResponse extends ServiceResponse<AccountAuth> {
  constructor(status: ResponseStatus, message: string, responseObject: AccountAuth, statusCode: number) {
    super(status, message, responseObject, statusCode);
  }
}

export const AccountAuthSchema = z.object({
  token: z.string().describe('JWT authentication token'),
  expiresAt: z.number().describe('Unix timestamp when token expires'),
});
