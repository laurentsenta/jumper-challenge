'use client';

import { RainbowKitWithAuthProvider } from "@/rainbow/provider";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { arbitrum, base, mainnet, optimism, polygon } from "wagmi/chains";
import { ConnectionProvider } from "@/components/providers/ConnectionProvider";

const PROJECT_ID = process.env.NEXT_PUBLIC_RAINBOWKIT_PROJECT_ID;
if (!PROJECT_ID) {
  throw new Error("NEXT_PUBLIC_RAINBOWKIT_PROJECT_ID is not defined");
}

const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME;
if (!APP_NAME) {
  throw new Error("NEXT_PUBLIC_APP_NAME is not defined");
}

const config = getDefaultConfig({
  appName: APP_NAME,
  projectId: PROJECT_ID,
  chains: [mainnet, polygon, optimism, arbitrum, base],
  ssr: false,
});

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitWithAuthProvider>
          <ConnectionProvider>
            {children}
          </ConnectionProvider>
        </RainbowKitWithAuthProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
} 
