'use client'

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold mb-6">Something went wrong!</h1>
      <p className="text-lg mb-8">
        We're sorry, but there was an error processing your request.
      </p>
      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={reset}
          className="px-4 py-2 bg-green-700 text-white rounded"
        >
          Try again
        </button>
        <Link href="/" className="px-4 py-2 border border-green-700 text-green-700 rounded">
          Return Home
        </Link>
      </div>
    </div>
  );
}