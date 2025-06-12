import { z } from 'zod';

import { ResponseStatus, ServiceResponse } from './serviceResponse';

export interface LeaderboardEntry {
  address: string;
  tokensOwned: number;
}

export type Leaderboard = LeaderboardEntry[];

export class LeaderboardResponse extends ServiceResponse<Leaderboard> {
  constructor(status: ResponseStatus, message: string, responseObject: Leaderboard, statusCode: number) {
    super(status, message, responseObject, statusCode);
  }
}

const EthAddress = z.string().regex(/^0x[a-fA-F0-9]{40}$/, { message: 'Invalid Ethereum address' });

export const LeaderboardEntrySchema = z.object({
  address: EthAddress,
  tokensOwned: z.number().int().nonnegative(),
});

export const LeaderboardSchema = z.array(LeaderboardEntrySchema);
