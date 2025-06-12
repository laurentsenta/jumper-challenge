import React from 'react';
import Link from 'next/link';
import { Box, Button, Typography, Stack, IconButton, Tooltip } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const AccountItem: React.FC = () => {
  // This is a placeholder - we'll implement actual auth state later
  const isLoggedIn = false;
  const user = { name: "John Doe" };

  return (
    <Box>
      {isLoggedIn ? (
        <Stack direction="row" spacing={2} alignItems="center">
          <Typography variant="body2" color="text.secondary">
            {user?.name || 'User'}
          </Typography>
          <Button 
            variant="contained" 
            color="error"
            size="small"
          >
            Logout
          </Button>
        </Stack>
      ) : (
        <Tooltip title="Connect Wallet">
          <IconButton
            component={Link}
            href="/app/login"
            color="primary"
            size="large"
          >
            <AccountCircleIcon />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );
};

export default AccountItem; 
