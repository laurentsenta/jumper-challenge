import React from 'react';
import Link from 'next/link';

const AccountItem: React.FC = () => {
  // This is a placeholder - we'll implement actual auth state later
  const isLoggedIn = false;
  const user = { name: "John Doe" };

  return (
    <div className="flex items-center">
      {isLoggedIn ? (
        <div className="flex items-center space-x-4">
          <span className="text-gray-600">{user?.name || 'User'}</span>
          <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            Logout
          </button>
        </div>
      ) : (
        <Link href="/app/login" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Login
        </Link>
      )}
    </div>
  );
};

export default AccountItem; 
