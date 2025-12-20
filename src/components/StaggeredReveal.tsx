"use client";

import { motion } from "framer-motion";
import { ReactNode, useMemo } from "react";

interface StaggeredRevealProps {
  children: ReactNode;
  // Delay before this element starts animating (in seconds)
  delay?: number;
  // Direction to fly in from: "left" or "right"
  direction?: "left" | "right";
  // Custom className for the wrapper
  className?: string;
}

// StaggeredReveal wraps content with a fly-in entrance animation
// Supports flying in from left or right direction
const StaggeredReveal = ({
  children,
  delay = 0,
  direction = "right",
  className = "",
}: StaggeredRevealProps) => {
  // Calculate x offset based on direction
  // Positive x means element starts to the right, negative means left
  const xOffset = direction === "right" ? 50 : -50;

  // Animation variants for fly-in effect
  const revealVariants = useMemo(
    () => ({
      hidden: {
        opacity: 0,
        x: xOffset,
      },
      visible: {
        opacity: 1,
        x: 0,
      },
    }),
    [xOffset]
  );

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={revealVariants}
      transition={{
        type: "tween",
        ease: "easeOut",
        duration: 0.5,
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default StaggeredReveal;
