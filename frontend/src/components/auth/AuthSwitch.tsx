"use client";

import { AuthStatus } from "@/rainbow/provider";
import { useAccount } from "wagmi";

// create a component that will switch between items based on the auth status
const AuthSwitch: React.FC<{
  status: AuthStatus;
  children: React.ReactNode;
}> = ({ status, children }) => {
  const { isConnected } = useAccount();

  if (status === AuthStatus.Authenticated) {
    return isConnected ? children : null;
  }

  if (status === AuthStatus.Unauthenticated) {
    return isConnected ? null : children;
  }

  return null;
};

export default AuthSwitch;
