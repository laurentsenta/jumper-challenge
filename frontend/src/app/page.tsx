import { Box, Typography, Paper } from "@mui/material";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import SpaceBackground from "@/components/SpaceBackground";

export default function Home() {
  return (
    <>
      <SpaceBackground />
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 3,
            maxWidth: "600px",
            width: "100%",
            bgcolor: "rgba(0, 0, 0, 0.7)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <Typography
            variant="h3"
            component="h1"
            align="center"
            sx={{
              fontWeight: "bold",
              background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
              backgroundClip: "text",
              textFillColor: "transparent",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "0 0 20px rgba(33, 150, 243, 0.3)",
            }}
          >
            Welcome to Jumper Challenge!
          </Typography>
          <ConnectButton />
        </Paper>
      </Box>
    </>
  );
}
