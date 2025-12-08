"use client";

import { useEffect } from "react";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

// Global error boundary for root layout errors
// This catches errors that error.tsx cannot handle
const GlobalError = ({ error, reset }: GlobalErrorProps) => {
  // Log error to console for debugging
  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen bg-[#f5f5f5] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          {/* Error icon - warning triangle */}
          <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center">
            <svg
              className="w-16 h-16 text-[#1A2234]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>

          {/* Error message */}
          <h1 className="font-mono text-2xl font-bold text-[#1A2234] mb-4">Something went wrong</h1>
          <p className="text-[#1A2234] mb-8">A critical error occurred. Please try again.</p>

          {/* Retry button */}
          <button
            onClick={reset}
            className="px-6 py-3 bg-[#1A2234] text-white font-mono font-bold uppercase tracking-wider hover:opacity-80 transition-opacity cursor-pointer"
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
};

export default GlobalError;
