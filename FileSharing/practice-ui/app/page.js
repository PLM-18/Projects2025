'use client';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Welcome to File Share</h1>
      <p className="mb-4">Choose an action:</p>
      <div className="space-x-4">
        <Link href="/sent" className="text-blue-500 underline">Send Files</Link>
        <Link href="/received" className="text-green-500 underline">View Received Files</Link>
      </div>
    </div>
  );
}
