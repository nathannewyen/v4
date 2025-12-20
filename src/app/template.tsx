"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface TemplateProps {
  children: ReactNode;
}

// Animation variants for page transitions
// Elements slide in from the right and fade in when page loads
const pageVariants = {
  hidden: {
    opacity: 0,
    x: 30,
  },
  visible: {
    opacity: 1,
    x: 0,
  },
};

// Timing configuration for smooth entrance animation
const pageTransition = {
  type: "tween" as const,
  ease: "easeOut" as const,
  duration: 0.4,
};

// Template component - wraps all pages with entrance animation
// Unlike layout.tsx, template.tsx re-renders on every navigation
// This triggers the animation each time user navigates between pages
export default function Template({ children }: TemplateProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={pageVariants}
      transition={pageTransition}
    >
      {children}
    </motion.div>
  );
}
