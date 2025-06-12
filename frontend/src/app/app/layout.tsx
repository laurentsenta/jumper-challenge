import React from 'react';
import Navbar from '@/components/layout/Navbar';
import { Providers } from './providers';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="container mx-auto px-4 py-8">{children}</div>
      </div>
    </Providers>
  );
} 
