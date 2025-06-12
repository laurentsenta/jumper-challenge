import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-500 to-purple-600">
      <div className="text-center text-white space-y-8">
        <h1 className="text-6xl font-bold">Welcome to Jumper Challenge</h1>
        <p className="text-xl">Test your skills and compete with others!</p>
        <div className="space-x-4">
          <Link
            href="/app/dashboard"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Launch App
          </Link>
        </div>
      </div>
    </div>
  );
}
