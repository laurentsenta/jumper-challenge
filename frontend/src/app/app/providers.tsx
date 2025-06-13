"use client";

import { ConnectionProvider } from "@/components/providers/ConnectionProvider";
import { RainbowKitWithAuthProvider } from "@/rainbow/provider";
import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import {
  QueryClient,
  QueryClientProvider,
  isServer,
} from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";

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
  ssr: true,
  chains: [
    mainnet,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true" ? [sepolia] : []),
  ],
});

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // avoids refetching immediately when transitioning to client
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (isServer) {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

export function Providers({ children }: { children: React.ReactNode }) {
  // ssr-friendly query client: https://tanstack.com/query/latest/docs/framework/react/guides/advanced-ssr
  const queryClient = getQueryClient();

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitWithAuthProvider>
          <ConnectionProvider>{children}</ConnectionProvider>
        </RainbowKitWithAuthProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
