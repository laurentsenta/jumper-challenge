"use client";

import { useLeaderboard } from "@/hooks/useLeaderboard";
import { LeaderboardEntry } from "@/types/leaderboard";
import RefreshIcon from "@mui/icons-material/Refresh";
import {
    Box,
    Button,
    CircularProgress,
    Fade,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";

const Leaderboard: React.FC = () => {
  const { data, isLoading, error, refetch, isFetching } = useLeaderboard();

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ py: 4 }}>
        <Typography color="error" gutterBottom>
          {error.message ? `${error.message}` : "Failed to fetch leaderboard"}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4, maxWidth: "100%" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          mb: 3,
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{
            textAlign: "center",
            mb: 0,
          }}
        >
          Token Leaderboard
        </Typography>
        <Fade in={isFetching}>
          <CircularProgress size={20} />
        </Fade>
      </Box>

      <TableContainer component={Paper} sx={{ width: "100%" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Rank</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Wallet</TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                Tokens Owned
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((entry: LeaderboardEntry, index: number) => (
              <TableRow key={entry.address}>
                <TableCell>{index + 1}</TableCell>
                <TableCell component="th" scope="row">
                  {entry.address.slice(0, 6) + "..." + entry.address.slice(-4)}
                </TableCell>
                <TableCell align="right">{entry.tokensOwned}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Button
          variant="contained"
          startIcon={<RefreshIcon />}
          onClick={() => refetch()}
          disabled={isFetching}
        >
          Refresh Leaderboard
        </Button>
      </Box>
    </Box>
  );
};

export default Leaderboard;
