"use client";

import { motion, useReducedMotion } from "framer-motion";

interface RevealSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const hiddenVariant = { opacity: 0, y: 40 };
const visibleVariant = { opacity: 1, y: 0 };

export function RevealSection({ children, className, delay = 0 }: RevealSectionProps) {
  const shouldReduce = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduce ? "visible" : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: hiddenVariant,
        visible: visibleVariant,
      }}
      transition={
        shouldReduce
          ? { duration: 0 }
          : { type: "spring", stiffness: 150, damping: 20, delay }
      }
      className={className}
    >
      {children}
    </motion.div>
  );
}
