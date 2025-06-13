import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import React from "react";

const Navbar: React.FC = () => {
  return (
    <AppBar position="static" color="default" elevation={1}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
            <Box
              component={Link}
              href="/app/dashboard"
              sx={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                color: "text.primary",
                mr: 4,
              }}
            >
              <RocketLaunchIcon sx={{ mr: 1, color: "primary.main" }} />
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                }}
              >
                SuperJumper
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                component={Link}
                href="/app/dashboard"
                color="inherit"
                sx={{
                  px: 3,
                  py: 1.5,
                  borderRadius: 2,
                  "&:hover": {
                    backgroundColor: "rgba(138, 43, 226, 0.1)",
                  },
                }}
              >
                Dashboard
              </Button>
              <Button
                component={Link}
                href="/app/leaderboard"
                color="inherit"
                sx={{
                  px: 3,
                  py: 1.5,
                  borderRadius: 2,
                  "&:hover": {
                    backgroundColor: "rgba(138, 43, 226, 0.1)",
                  },
                }}
              >
                Leaderboard
              </Button>
            </Box>
          </Box>
          <ConnectButton showBalance={false} />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
