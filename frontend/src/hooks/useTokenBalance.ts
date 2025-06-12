import { useQuery } from "@tanstack/react-query";

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

// TODO: share with backend
interface ApiResponse {
  success: boolean;
  message: string;
  responseObject: TokenBalance;
  statusCode: number;
}

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
if (!BACKEND_URL) {
  throw new Error("NEXT_PUBLIC_BACKEND_URL environment variable is not defined");
}

const fetchTokenBalances = async (address: string): Promise<TokenBalance> => {
  const response = await fetch(`${BACKEND_URL}/token-balance/${address}`, {
    credentials: "include",
  });
  console.error(response)

  if (!response.ok) {
    throw new Error(`Failed to fetch token balances - ${response.statusText}`);
  }

  const data: ApiResponse = await response.json();
  console.error(data)
  
  if (!data.success) {
    throw new Error(data.message || 'Failed to fetch token balances');
  }

  return data.responseObject;
};

export const useTokenBalance = (address: string) => {
  return useQuery({
    queryKey: ['tokenBalances', address],
    queryFn: () => fetchTokenBalances(address),
    enabled: !!address,
    refetchInterval: 30000, // Refetch every 30 seconds
  });
}; 
