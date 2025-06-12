import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Paper,
  Stack,
} from '@mui/material';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';

export default function LoginPage() {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Paper
          elevation={1}
          sx={{
            p: 4,
            width: '100%',
            textAlign: 'center',
          }}
        >
          <Stack spacing={4} alignItems="center">
            <RocketLaunchIcon 
              sx={{ 
                fontSize: 60, 
                color: 'primary.main',
                animation: 'float 3s ease-in-out infinite',
                '@keyframes float': {
                  '0%': { transform: 'translateY(0px)' },
                  '50%': { transform: 'translateY(-10px)' },
                  '100%': { transform: 'translateY(0px)' },
                },
              }} 
            />
            
            <Box>
              <Typography variant="h4" component="h1" gutterBottom>
                Welcome to SuperJumper
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Connect your wallet to start your cosmic journey
              </Typography>
            </Box>

            <Box>
              <ConnectButton />
            </Box>

            <Typography variant="body2" color="text.secondary">
              By connecting your wallet, you agree to our Terms of Service and Privacy Policy
            </Typography>
          </Stack>
        </Paper>
      </Box>
    </Container>
  );
} 
