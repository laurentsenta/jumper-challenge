import { prefetchLeaderboard } from "@/hooks/prefetchLeaderboard";
import { Box, Container } from "@mui/material";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Leaderboard from "./Leaderboard";

export default async function LeaderboardPage() {
  // ssr-friend hydration: https://tanstack.com/query/latest/docs/framework/react/guides/advanced-ssr#prefetching-and-dehydrating-data
  const queryClient = new QueryClient();
  await prefetchLeaderboard(queryClient);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Container maxWidth="lg">
        <Box
          sx={{
            minHeight: "80vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Leaderboard />
        </Box>
      </Container>
    </HydrationBoundary>
  );
}
