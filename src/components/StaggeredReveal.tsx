"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface StaggeredRevealProps {
  children: ReactNode;
  // Delay before animation starts (in seconds)
  delay?: number;
  // Custom className for the wrapper
  className?: string;
}

// Simple fade + slide up animation
// Clean and professional entrance effect
const StaggeredReveal = ({ children, delay = 0, className = "" }: StaggeredRevealProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.25, 0.1, 0.25, 1], // Smooth easing
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default StaggeredReveal;
