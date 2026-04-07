"use client";

import { motion, type Variants } from "framer-motion";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.035,
      delayChildren: 0.06,
    },
  },
};

const letter: Variants = {

  hidden: {
    y: 10,
    opacity: 0,
    scale: 0.98,
  },
  show: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.45,
      ease: "easeOut",
    },
  },
};


export default function StaggeredText({
  text,
  className = "",
}: {
  readonly text: string;
  readonly className?: string;
}) {
  const isGradient = className.includes("text-gradient");
  // If it's a gradient, we remove it from the container and apply it to children
  // but keep other classes on the container.
  const containerClass = className.replace("text-gradient", "").trim();
  const childClass = isGradient ? "text-gradient" : "";

  return (
    <motion.span
      variants={container}
      initial="hidden"
      animate="show"
      className={containerClass}
    >
      {Array.from(text).map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          variants={letter}
          className={`inline-block will-change-transform ${childClass}`}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
}
