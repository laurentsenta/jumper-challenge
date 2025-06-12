import React from 'react';
import Link from 'next/link';
import AccountItem from "./AccountItem";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-800">
              Jumper Challenge
            </Link>
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                href="/app/dashboard"
                className="text-gray-600 hover:text-gray-900 px-3 py-2"
              >
                Dashboard
              </Link>
              <Link
                href="/app/leaderboard"
                className="text-gray-600 hover:text-gray-900 px-3 py-2"
              >
                Leaderboard
              </Link>
            </div>
          </div>
          <AccountItem />
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 
