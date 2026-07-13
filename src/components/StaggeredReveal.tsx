import { ReactNode } from "react";

interface StaggeredRevealProps {
  children: ReactNode;
  // Delay before animation starts (in seconds)
  delay?: number;
  // Custom className for the wrapper
  className?: string;
}

// Fade + slide-up entrance driven by pure CSS.
// Uses the `.animate-fadeIn` keyframe defined in globals.css.
const StaggeredReveal = ({ children, delay = 0, className = "" }: StaggeredRevealProps) => {
  return (
    <div className={`animate-fadeIn ${className}`} style={{ animationDelay: `${delay}s` }}>
      {children}
    </div>
  );
};

export default StaggeredReveal;
