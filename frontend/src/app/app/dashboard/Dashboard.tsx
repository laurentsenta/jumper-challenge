"use client";

import { Box, Typography, Card, CardContent, Grid, CircularProgress } from "@mui/material";
import { useAccount } from "wagmi";
import { useTokenBalance } from "@/hooks/useTokenBalance";

const DashboardContent: React.FC = () => {
  const { address } = useAccount();

  if (!address) {
    throw new Error("Address is required");
  }

  const { data: tokenBalances, isLoading, error } = useTokenBalance(address);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ py: 4 }}>
        <Typography color="error" gutterBottom>
          Failed to fetch token balances
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Token Balances
      </Typography>
      
      <Grid container spacing={3}>
        {tokenBalances && (
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  ETH Balance
                </Typography>
                <Typography variant="h4">
                  {parseFloat(tokenBalances.eth).toFixed(4)} ETH
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default DashboardContent;
