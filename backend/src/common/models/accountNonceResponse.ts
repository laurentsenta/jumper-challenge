import { z } from 'zod';

import { ResponseStatus, ServiceResponse } from './serviceResponse';

export interface AccountNonce {
  nonce: string;
}

export class AccountNonceResponse extends ServiceResponse<AccountNonce> {
  constructor(status: ResponseStatus, message: string, responseObject: AccountNonce | null, statusCode: number) {
    super(status, message, responseObject, statusCode);
  }
}

export const AccountNonceSchema = z.object({
  nonce: z.string(),
});
