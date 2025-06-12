"use client";

import {
  Box,
  Typography,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Button,
  Fade,
} from "@mui/material";
import { useAccount } from "wagmi";
import { useTokenBalance } from "@/hooks/useTokenBalance";
import { formatEther } from "viem";
import RefreshIcon from '@mui/icons-material/Refresh';

const DashboardContent: React.FC = () => {
  const { address } = useAccount();

  if (!address) {
    throw new Error("Address is required");
  }

  const { data, isLoading, error, refetch, isFetching } = useTokenBalance(address);

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
          {error.message
            ? `${error.message}`
            : "Failed to fetch token balances"}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4, maxWidth: "100%" }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mb: 3 }}>
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom 
          sx={{ 
            textAlign: "center",
            mb: 0
          }}
        >
          Token Balances
        </Typography>
        <Fade in={isFetching}>
          <CircularProgress size={20} />
        </Fade>
      </Box>

      <TableContainer component={Paper} sx={{ width: "100%" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold" }}>Logo</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Token</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Symbol</TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                Balance
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((token) => {
              const formattedBalance = formatEther(BigInt(token.balance));
              const displayName =
                token.metadata.name ||
                token.contract.slice(0, 6) + "..." + token.contract.slice(-4);
              const symbol = token.metadata.symbol || "???";

              return (
                <TableRow key={token.contract}>
                  <TableCell>
                    <Avatar 
                      src={token.metadata.logo || undefined}
                      alt={symbol}
                      sx={{ 
                        width: 32, 
                        height: 32,
                        "& img": {
                          objectFit: "contain",
                          padding: "4px",
                        },
                      }}
                    >
                      {symbol.slice(0, 2)}
                    </Avatar>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {displayName}
                  </TableCell>
                  <TableCell>{symbol}</TableCell>
                  <TableCell align="right">{formattedBalance}</TableCell>
                </TableRow>
              );
            })}
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
          Refresh Balances
        </Button>
      </Box>
    </Box>
  );
};

export default DashboardContent;
