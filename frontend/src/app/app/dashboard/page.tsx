"use client";

import AuthSwitch from "@/components/auth/AuthSwitch";
import LoginBox from "@/components/auth/LoginBox";
import { AuthStatus } from "@/rainbow/provider";
import DashboardContent from "./Dashboard";
import { Box, Container } from "@mui/material";

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
          <AuthSwitch status={AuthStatus.Authenticated}>
            <DashboardContent />
          </AuthSwitch>
          <AuthSwitch status={AuthStatus.Unauthenticated}>
            <LoginBox
              title="Connect to Access Dashboard"
              description="Please connect your wallet to view your dashboard"
            />
          </AuthSwitch>
        </Box>
      </Container>
    </>
  );
}
