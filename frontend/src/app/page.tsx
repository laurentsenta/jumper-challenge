import React from 'react';
import Link from 'next/link';
import { 
  Box, 
  Button, 
  Container, 
  Typography, 
  Grid, 
  Card,
  CardContent,
  Stack,
} from '@mui/material';
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import CollectionsIcon from '@mui/icons-material/Collections';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const FEATURES = [
  {
    title: 'Connect Wallet',
    description: 'Link your crypto wallet to access your NFT collection',
    icon: AccountBalanceWalletIcon,
  },
  {
    title: 'Explore NFTs',
    description: 'View your cosmic collection in our immersive dashboard',
    icon: CollectionsIcon,
  },
  {
    title: 'Leaderboard',
    description: 'Compete with other space explorers for the top spot',
    icon: EmojiEventsIcon,
  },
];

export default function Home() {
  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Stack spacing={6} alignItems="center">
        <Box textAlign="center">
          <RocketLaunchIcon
            sx={{ fontSize: 60, mb: 2, color: "primary.main" }}
          />
          <Typography variant="h2" component="h1" gutterBottom>
            SuperJumper
          </Typography>
          <Typography variant="h5" color="text.secondary">
            Explore your ERC20 across the hyperspace and compete on the galactic
            leaderboard
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {FEATURES.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                    <feature.icon sx={{ fontSize: 40, color: 'primary.main' }} />
                    <Typography variant="h5" component="h2" gutterBottom>
                      {feature.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Button
          component={Link}
          href="/app/dashboard"
          variant="contained"
          size="large"
        >
          Launch App
        </Button>
      </Stack>
    </Container>
  );
}
