import { clsx, type ClassValue } from "clsx";

// Utility function for merging Tailwind CSS classes
// Handles conditional classes cleanly: cn("base", condition && "conditional")
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
