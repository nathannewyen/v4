"use client";

interface SkeletonProps {
  className?: string;
}

// Skeleton component for loading states
// Displays an animated placeholder while content is loading
const Skeleton = ({ className = "" }: SkeletonProps) => {
  return (
    <div
      className={`animate-pulse bg-[#e0e0e0] dark:bg-[#2a2a3e] ${className}`}
    />
  );
};

export default Skeleton;
