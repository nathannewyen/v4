"use client";

import { Component, ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

// ErrorBoundary component for section-level error handling
// Catches errors in child components and displays a fallback UI
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  // Update state when an error is caught
  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  // Log error for debugging
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  // Reset error state to retry rendering
  handleReset = (): void => {
    this.setState({ hasError: false, error: null });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI
      return (
        <div className="py-16 px-4 text-center">
          <div className="max-w-md mx-auto">
            <p className="text-[#1A2234] dark:text-[#a0a0a0] mb-4">
              This section failed to load.
            </p>
            <button
              onClick={this.handleReset}
              className="px-4 py-2 border-2 border-[#1A2234] dark:border-white text-[#1A2234] dark:text-white font-mono text-sm uppercase hover:bg-[#1A2234] dark:hover:bg-white hover:text-white dark:hover:text-[#1A2234] transition-colors cursor-pointer"
            >
              Retry
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
