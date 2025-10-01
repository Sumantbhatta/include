'use client';

import { useEffect, useState } from 'react';

export default function ErrorBoundary({
  children,
}: {
  children: React.ReactNode;
}) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const errorHandler = (error: ErrorEvent) => {
      console.error('Error caught by boundary:', error);
      setHasError(true);
      // Prevent the error from bubbling up
      error.preventDefault();
    };

    window.addEventListener('error', errorHandler);
    return () => window.removeEventListener('error', errorHandler);
  }, []);

  if (hasError) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-md">
        <h2 className="text-lg font-medium text-red-800">Something went wrong</h2>
        <p className="mt-1 text-sm text-red-700">
          Please refresh the page to try again.
        </p>
      </div>
    );
  }

  return <>{children}</>;
}