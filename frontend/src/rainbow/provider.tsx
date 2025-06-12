"use client";

import {
  createAuthenticationAdapter,
  RainbowKitAuthenticationProvider,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { useEffect, useMemo, useRef, useState } from "react";
import { createSiweMessage } from "viem/siwe";

export enum AuthStatus {
  Loading = "loading",
  Authenticated = "authenticated",
  Unauthenticated = "unauthenticated",
}

export const RainbowKitWithAuthProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  // See https://github.com/rainbow-me/rainbowkit/blob/main/examples/with-next-siwe-iron-session/src/pages/_app.tsx
  const [status, setStatus] = useState<AuthStatus>(AuthStatus.Loading);
  const fetching = useRef(false);
  const verifying = useRef(false);

  useEffect(() => {
    const fetchStatus = async () => {
      if (fetching.current || verifying.current) {
        return;
      }

      fetching.current = true;

      try {
        const response = await fetch("/api/auth/me");
        const json = await response.json();
        setStatus(json.address ? AuthStatus.Authenticated : AuthStatus.Unauthenticated);
      } catch (_error) {
        setStatus(AuthStatus.Unauthenticated);
      } finally {
        fetching.current = false;
      }
    };

    // On page load
    fetchStatus();

    // When window is focused (in case user logs out of another window)
    window.addEventListener("focus", fetchStatus);
    return () => window.removeEventListener("focus", fetchStatus);
  }, []);

  const authAdapater = useMemo(() => {
    return createAuthenticationAdapter({
      getNonce: async () => {
        const response = await fetch(`/api/auth/nonce`);
        return await response.text();
      },

      createMessage: ({ nonce, address, chainId }) => {
        return createSiweMessage({
          domain: window.location.host,
          address,
          statement: "Sign in with Ethereum to the app.",
          uri: window.location.origin,
          version: "1",
          chainId,
          nonce,
        });
      },

      verify: async ({ message, signature }) => {
        const verifyRes = await fetch(`/api/auth/verify`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message, signature }),
        });

        return Boolean(verifyRes.ok);
      },

      signOut: async () => {
        await fetch(`/api/logout`);
      },
    });
  }, []);

  return (
    <RainbowKitAuthenticationProvider adapter={authAdapater} status={status}>
      <RainbowKitProvider>{children}</RainbowKitProvider>
    </RainbowKitAuthenticationProvider>
  );
};
