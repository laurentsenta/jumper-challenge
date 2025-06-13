"use client";

import AuthSwitch from "@/components/auth/AuthSwitch";
import { Box, CircularProgress, Container } from "@mui/material";
import DashboardContent from "./Dashboard";
import LoginBox from "@/components/auth/LoginBox";

export default function DashboardPage() {
  return (
    <>
      <Container maxWidth="sm">
        <Box
          sx={{
            minHeight: "80vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AuthSwitch authenticated>
            <DashboardContent />
          </AuthSwitch>
          <AuthSwitch unauthenticated>
            <LoginBox
              title="Connect to Access Dashboard"
              description="Please connect your wallet to view your dashboard"
            />
          </AuthSwitch>
          <AuthSwitch loading>
            <CircularProgress />
          </AuthSwitch>
        </Box>
      </Container>
    </>
  );
}
