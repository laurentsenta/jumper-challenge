'use client';

import React, { createContext, useContext } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';

interface ConnectionContextType {
  isConnected: boolean;
  isConnecting: boolean;
  isDisconnected: boolean;
  address?: string;
  connect: ReturnType<typeof useConnect>['connect'];
  disconnect: ReturnType<typeof useDisconnect>['disconnect'];
}

const ConnectionContext = createContext<ConnectionContextType | undefined>(undefined);

export function useConnection() {
  const context = useContext(ConnectionContext);
  if (context === undefined) {
    throw new Error('useConnection must be used within a ConnectionProvider');
  }
  return context;
}

export function ConnectionProvider({ children }: { children: React.ReactNode }) {
  const { isConnected, isConnecting, isDisconnected, address } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  const value = {
    isConnected,
    isConnecting,
    isDisconnected,
    address,
    connect,
    disconnect,
  };

  return (
    <ConnectionContext.Provider value={value}>
      {children}
    </ConnectionContext.Provider>
  );
} 
