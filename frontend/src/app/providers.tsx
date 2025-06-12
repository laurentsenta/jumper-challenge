'use client';

import { RainbowKitWithAuthProvider } from "@/rainbow/provider";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { arbitrum, base, mainnet, optimism, polygon } from "wagmi/chains";

const PROJECT_ID = "a0c3b75f9e0a48a167db9c7a0943a34c"; // TODO: switch to envs

const config = getDefaultConfig({
  appName: "My RainbowKit App",
  projectId: PROJECT_ID,
  chains: [mainnet, polygon, optimism, arbitrum, base],
  ssr: false,
});

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitWithAuthProvider>{children}</RainbowKitWithAuthProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
} 
