"use client";

import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
  style?: React.CSSProperties;
}

// Skeleton component for loading states
// Displays an animated placeholder while content is loading
const Skeleton = ({ className, style }: SkeletonProps) => {
  return (
    <div className={cn("animate-pulse bg-[#e0e0e0] dark:bg-[#2a2a3e]", className)} style={style} />
  );
};

export default Skeleton;
