import React from 'react';
import Navbar from '@/components/layout/Navbar';
import { Providers } from './providers';
import { Box, Container } from '@mui/material';
import SpaceBackground from '@/components/SpaceBackground';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <Box sx={{ 
        minHeight: '100vh',
        position: 'relative',
      }}>
        <SpaceBackground />
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Navbar />
          <Container maxWidth="lg" sx={{ py: 8 }}>
            {children}
          </Container>
        </Box>
      </Box>
    </Providers>
  );
} 
