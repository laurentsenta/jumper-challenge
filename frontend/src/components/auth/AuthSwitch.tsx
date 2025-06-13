"use client";

import { AuthStatus, useAuth } from "@/rainbow";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

// create a component that will switch between items based on the auth status
const AuthSwitch: React.FC<{
  loading?: boolean;
  authenticated?: boolean;
  unauthenticated?: boolean;
  children: React.ReactNode;
}> = ({ loading, authenticated, unauthenticated, children }) => {
  const rainbowAuth = useAuth();
  const { isConnected, isConnecting } = useAccount();
  const [isClient, setIsClient] = useState(false);
  const isAuthLoading = rainbowAuth === AuthStatus.Loading || isConnecting;

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    if (loading) {
      return children;
    }
    return null;
  }

  if (isAuthLoading) {
    if (loading) {
      return children;
    }
    return null;
  }

  if (authenticated && isConnected) {
    return children;
  }

  if (unauthenticated && !isConnected) {
    return children;
  }

  return null;
};

export default AuthSwitch;
