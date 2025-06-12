import React from 'react';
import { Box, Container } from '@mui/material';
import LoginBox from '@/components/auth/LoginBox';

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
        <LoginBox 
          title="Welcome to SuperJumper"
          description="Connect your wallet to start your interstellar journey"
        />
      </Box>
    </Container>
  );
} 
