import React from 'react';

export default function DashboardPage() {
  // This is a placeholder - we'll implement actual auth check later
  const isLoggedIn = false;

  if (!isLoggedIn) {
    return (
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Please Login</h1>
        <p className="text-center text-gray-600">
          You need to be logged in to view the dashboard.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Your Stats</h2>
          <p className="text-gray-600">Coming soon...</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Recent Activity</h2>
          <p className="text-gray-600">Coming soon...</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Achievements</h2>
          <p className="text-gray-600">Coming soon...</p>
        </div>
      </div>
    </div>
  );
} 
