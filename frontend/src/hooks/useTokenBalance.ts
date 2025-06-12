import { useQuery } from "@tanstack/react-query";

export interface TokenBalance {
  eth: string;
  // Add other token balances as needed
}

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
if (!BACKEND_URL) {
  throw new Error("NEXT_PUBLIC_BACKEND_URL environment variable is not defined");
}

const fetchTokenBalances = async (address: string): Promise<TokenBalance> => {
  const response = await fetch(`${BACKEND_URL}/token-balance/${address}`, {
    credentials: "include",
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch token balances');
  }
  return response.json();
};

export const useTokenBalance = (address: string) => {
  return useQuery({
    queryKey: ['tokenBalances', address],
    queryFn: () => fetchTokenBalances(address),
    enabled: !!address,
    refetchInterval: 30000, // Refetch every 30 seconds
  });
}; 
