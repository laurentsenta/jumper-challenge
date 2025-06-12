import React from 'react';
import { 
  Box, 
  Typography, 
  Paper,
  Stack,
} from '@mui/material';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';

interface LoginBoxProps {
  title?: string;
  description?: string;
}

export default function LoginBox({ 
  title = "Welcome to SuperJumper",
  description = "Connect your wallet to start your interstellar journey"
}: LoginBoxProps) {
  return (
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
            {title}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {description}
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
  );
} 
