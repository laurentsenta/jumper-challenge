import { useQuery } from "@tanstack/react-query";
import { LeaderboardEntry } from "@/types/leaderboard";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';

async function fetchLeaderboard(): Promise<LeaderboardEntry[]> {
  const response = await fetch(`${BACKEND_URL}/leaderboard`);
  if (!response.ok) {
    throw new Error("Failed to fetch leaderboard");
  }
  const data = await response.json();

  return data.responseObject;
}

export function useLeaderboard() {
  return useQuery({
    queryKey: ["leaderboard"],
    queryFn: fetchLeaderboard,
    refetchInterval: 30000, // Refetch every 30 seconds
  });
} 
