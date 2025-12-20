"use client";

import { motion } from "framer-motion";
import { useState, JSX } from "react";

interface RandomLetterRevealProps {
  text: string;
  // HTML tag to render (h1, p, span, etc.)
  as?: keyof JSX.IntrinsicElements;
  // Custom className for the container
  className?: string;
  // Base delay before animation starts
  baseDelay?: number;
}

// Generate random animation properties for text
// Called once during initial state creation (not during render)
const generateLetterAnimations = (text: string) => {
  return text.split("").map(() => ({
    // Random direction: -1 for left, 1 for right
    direction: Math.random() > 0.5 ? 1 : -1,
    // Random delay between 0 and 0.3 seconds
    delay: Math.random() * 0.3,
    // Random distance between 30 and 60 pixels
    distance: 30 + Math.random() * 30,
  }));
};

// RandomLetterReveal animates each letter individually
// Letters fly in randomly from left or right with staggered timing
const RandomLetterReveal = ({
  text,
  as: Component = "span",
  className = "",
  baseDelay = 0,
}: RandomLetterRevealProps) => {
  // Generate random animation properties once on mount
  // useState initializer function only runs once, avoiding impure render calls
  const [letterAnimations] = useState(() => generateLetterAnimations(text));

  return (
    <Component className={className}>
      {text.split("").map((char, index) => {
        const { direction, delay, distance } = letterAnimations[index];

        // Preserve spaces as non-breaking spaces
        if (char === " ") {
          return (
            <span key={index} className="inline-block">
              &nbsp;
            </span>
          );
        }

        return (
          <motion.span
            key={index}
            className="inline-block"
            initial={{
              opacity: 0,
              x: direction * distance,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              type: "tween",
              ease: "easeOut",
              duration: 0.4,
              delay: baseDelay + delay,
            }}
          >
            {char}
          </motion.span>
        );
      })}
    </Component>
  );
};

export default RandomLetterReveal;
