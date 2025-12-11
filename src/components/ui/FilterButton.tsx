"use client";

import { cn } from "@/lib/utils";

interface FilterButtonProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

// Base styles for filter buttons
const buttonBaseStyles = cn(
  "flex-1 sm:flex-none px-3 py-2 text-sm font-mono transition-all duration-200 cursor-pointer"
);

// Active state styles
const activeStyles = cn("bg-[#1A2234] dark:bg-white text-white dark:text-[#1A2234] font-bold");

// Inactive state styles
const inactiveStyles = cn(
  "bg-[#e8e8e8] dark:bg-[#2a2a3e] text-[#555] dark:text-[#aaa]",
  "hover:bg-[#d0d0d0] dark:hover:bg-[#3a3a4e]"
);

// Reusable filter toggle button component
const FilterButton = ({ active, onClick, children, className }: FilterButtonProps) => {
  return (
    <button
      className={cn(buttonBaseStyles, active ? activeStyles : inactiveStyles, className)}
      onClick={onClick}
      aria-pressed={active}
    >
      {children}
    </button>
  );
};

export default FilterButton;
