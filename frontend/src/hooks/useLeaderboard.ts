import { useQuery } from "@tanstack/react-query";
import { fetchLeaderboard } from "./prefetchLeaderboard";

export function useLeaderboard() {
  return useQuery({
    queryKey: ["leaderboard"],
    queryFn: () => fetchLeaderboard(), // No admin token for client-side
    refetchInterval: 60000,
  });
}
