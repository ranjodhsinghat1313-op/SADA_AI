"use client";

import React, { useState, useMemo } from "react";
import { motion, type Transition } from "motion/react";
import { cn } from "@/lib/utils";

export interface RandomLetterSwapProps {
  label: string;
  className?: string;
  staggerDuration?: number;
  transition?: Transition;
  onClick?: () => void;
  reverse?: boolean;
}

export function RandomLetterSwap({
  label,
  className,
  staggerDuration = 0.025,
  transition = { duration: 0.5, type: "spring", bounce: 0.2 },
  onClick,
  reverse = false,
}: RandomLetterSwapProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Generate a stable randomized order for letter stagger
  const randomizedIndices = useMemo(() => {
    const indices = Array.from({ length: label.length }, (_, i) => i);
    // Fisher-Yates shuffle with deterministic seed based on label
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    return indices;
  }, [label]);

  const characters = label.split("");

  return (
    <span
      className={cn("inline-flex items-center cursor-pointer select-none", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {characters.map((char, index) => {
        const isSpace = char === " ";
        const staggerDelay = (randomizedIndices[index] ?? index) * staggerDuration;

        if (isSpace) {
          return (
            <span key={index} className="inline-block">
              &nbsp;
            </span>
          );
        }

        return (
          <span
            key={index}
            className="relative inline-flex overflow-hidden leading-tight h-[1.25em]"
          >
            {/* Top / initial letter */}
            <motion.span
              aria-hidden={isHovered}
              initial={false}
              animate={{
                y: isHovered ? (reverse ? "100%" : "-100%") : "0%",
                opacity: isHovered ? 0 : 1,
              }}
              transition={{
                ...transition,
                delay: staggerDelay,
              }}
              className="inline-block"
            >
              {char}
            </motion.span>

            {/* Bottom / replacement letter */}
            <motion.span
              aria-hidden={!isHovered}
              initial={false}
              animate={{
                y: isHovered ? "0%" : reverse ? "-100%" : "100%",
                opacity: isHovered ? 1 : 0,
              }}
              transition={{
                ...transition,
                delay: staggerDelay,
              }}
              className="absolute left-0 top-0 inline-block font-inherit text-inherit"
            >
              {char}
            </motion.span>
          </span>
        );
      })}
    </span>
  );
}

export default RandomLetterSwap;
