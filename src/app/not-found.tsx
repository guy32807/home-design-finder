'use client';  // Add this to indicate it's a client component

import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>404 - Page Not Found</h1>
      <p style={{ marginBottom: '2rem' }}>
        Sorry, the page you are looking for doesn't exist.
      </p>
      <Link href="/" style={{ 
        backgroundColor: '#047857', 
        color: 'white', 
        padding: '0.5rem 1rem', 
        borderRadius: '0.25rem', 
        textDecoration: 'none' 
      }}>
        Return to Home
      </Link>
    </div>
  );
}