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
        {/* Error icon - broken connection */}
        <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center">
          <svg
            className="w-16 h-16 text-[#1A2234] dark:text-white"
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
        <h1 className="font-mono text-2xl font-bold text-[#1A2234] dark:text-white mb-4">
          Oops, I broke something
        </h1>
        <p className="text-[#1A2234] dark:text-[#a0a0a0] mb-2">
          Looks like I pushed to prod without testing.
        </p>
        <p className="text-[#666] dark:text-[#777] text-sm mb-8 font-mono">
          {"// TODO: fix this later"}
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
