import React from 'react';
import Navbar from './Navbar';
import AccountWindow from './AccountWindow';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {children}
      </div>
    </div>
  );
};

export default Layout; 
