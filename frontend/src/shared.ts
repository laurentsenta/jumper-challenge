
// TODO: share with backend
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

export interface TokenBalanceResponse {
  success: boolean;
  message: string;
  responseObject: TokenBalance;
  statusCode: number;
}

export interface LeaderboardEntry {
  address: string;
  tokensOwned: number;
}

export type Leaderboard = LeaderboardEntry[];
