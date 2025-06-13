import { LeaderboardEntry } from "@/shared";
import { QueryClient } from "@tanstack/react-query";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";

export async function fetchLeaderboard(
  adminToken?: string
): Promise<LeaderboardEntry[]> {
  const headers: Record<string, string> = {};

  // Use admin token for server-side requests
  if (adminToken) {
    headers["Authorization"] = `Bearer ${adminToken}`;
  }

  const response = await fetch(`${BACKEND_URL}/leaderboard`, {
    headers,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch leaderboard");
  }
  const data = await response.json();

  return data.responseObject;
}

export function prefetchLeaderboard(queryClient: QueryClient) {
  const adminToken = process.env.BACKEND_API_TOKEN;

  if (!adminToken) {
    throw new Error("BACKEND_API_TOKEN is not set");
  }

  return queryClient.prefetchQuery({
    queryKey: ["leaderboard"],
    queryFn: () => fetchLeaderboard(adminToken),
  });
}
