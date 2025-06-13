import { TokenBalance, TokenBalanceResponse } from "@/shared";
import { useQuery } from "@tanstack/react-query";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
if (!BACKEND_URL) {
  throw new Error(
    "NEXT_PUBLIC_BACKEND_URL environment variable is not defined"
  );
}

const fetchTokenBalances = async (address: string): Promise<TokenBalance> => {
  const response = await fetch(`${BACKEND_URL}/token-balance/${address}`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch token balances - ${response.statusText}`);
  }

  // TODO: schema validation
  const data: TokenBalanceResponse = await response.json();

  if (!data.success) {
    throw new Error(data.message || "Failed to fetch token balances");
  }

  return data.responseObject;
};

export const useTokenBalance = (address: string) => {
  return useQuery({
    queryKey: ["tokenBalances", address],
    queryFn: () => fetchTokenBalances(address),
    enabled: !!address,
    refetchInterval: 60000,
  });
};
