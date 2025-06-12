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
import SpaceBackground from '@/components/SpaceBackground';

const FEATURES = [
  {
    title: 'Connect Wallet',
    description: 'Link your crypto wallet to access your NFT collection',
    icon: AccountBalanceWalletIcon,
  },
  {
    title: 'Explore ERC20s',
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
    <>
      <SpaceBackground />
      <Container maxWidth="md" sx={{ py: 8, position: 'relative' }}>
        <Stack spacing={6} alignItems="center">
          <Box textAlign="center">
            <RocketLaunchIcon
              sx={{ 
                fontSize: 60, 
                mb: 2, 
                color: 'primary.main',
                filter: 'drop-shadow(0 0 12px rgba(138, 43, 226, 0.7))',
              }}
            />
            <Typography 
              variant="h2" 
              component="h1" 
              gutterBottom
              sx={{
                color: 'white',
                textShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
                fontWeight: 700,
              }}
            >
              SuperJumper
            </Typography>
            <Typography 
              variant="h5" 
              sx={{
                color: 'rgba(255, 255, 255, 0.8)',
                textShadow: '0 0 8px rgba(255, 255, 255, 0.3)',
              }}
            >
              Explore your ERC20 across the hyperspace and compete on the galactic
              leaderboard
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {FEATURES.map((feature, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card 
                  sx={{ 
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    '&:hover': {
                      bgcolor: 'rgba(255, 255, 255, 0.15)',
                      transform: 'translateY(-4px)',
                      transition: 'all 0.3s ease',
                    },
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, textAlign: 'center' }}>
                      <feature.icon sx={{ 
                        fontSize: 40, 
                        color: 'primary.main',
                        filter: 'drop-shadow(0 0 12px rgba(138, 43, 226, 0.7))',
                      }} />
                      <Typography 
                        variant="h5" 
                        component="h2" 
                        gutterBottom
                        sx={{ color: 'white' }}
                      >
                        {feature.title}
                      </Typography>
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          color: 'rgba(255, 255, 255, 0.8)',
                        }}
                      >
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
            sx={{
              bgcolor: 'primary.main',
              '&:hover': {
                bgcolor: 'primary.dark',
                transform: 'scale(1.05)',
                transition: 'all 0.3s ease',
              },
              boxShadow: '0 0 20px rgba(138, 43, 226, 0.5)',
            }}
          >
            Launch App
          </Button>
        </Stack>
      </Container>
    </>
  );
}
