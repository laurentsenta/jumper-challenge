"use client";

import { Box, Container } from "@mui/material";
import Leaderboard from "./Leaderboard";

export default function LeaderboardPage() {
  return (
    <>
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
    </>
  );
} 
