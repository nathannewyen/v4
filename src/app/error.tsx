"use client";

import { useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

// Error boundary component for route-level error handling
// Displays a user-friendly error message with retry option
const Error = ({ error, reset }: ErrorProps) => {
  // Log error to console for debugging
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#f5f5f5] dark:bg-[#0a0a0f] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* Error icon */}
        <div className="w-16 h-16 mx-auto mb-6 bg-[#1A2234] dark:bg-white flex items-center justify-center">
          <span className="text-white dark:text-[#1A2234] text-2xl font-bold">!</span>
        </div>

        {/* Error message */}
        <h1 className="font-mono text-2xl font-bold text-[#1A2234] dark:text-white mb-4">
          Something went wrong
        </h1>
        <p className="text-[#1A2234] dark:text-[#a0a0a0] mb-8">
          An unexpected error occurred. Please try again.
        </p>

        {/* Retry button */}
        <button
          onClick={reset}
          className="px-6 py-3 bg-[#1A2234] dark:bg-white text-white dark:text-[#1A2234] font-mono font-bold uppercase tracking-wider hover:opacity-80 transition-opacity cursor-pointer"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default Error;
