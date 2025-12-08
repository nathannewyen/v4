"use client";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

// Global error boundary for root layout errors
// This catches errors that error.tsx cannot handle
const GlobalError = ({ error, reset }: GlobalErrorProps) => {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#f5f5f5] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          {/* Error icon */}
          <div className="w-16 h-16 mx-auto mb-6 bg-[#1A2234] flex items-center justify-center">
            <span className="text-white text-2xl font-bold">!</span>
          </div>

          {/* Error message */}
          <h1 className="font-mono text-2xl font-bold text-[#1A2234] mb-4">
            Something went wrong
          </h1>
          <p className="text-[#1A2234] mb-8">
            A critical error occurred. Please try again.
          </p>

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
