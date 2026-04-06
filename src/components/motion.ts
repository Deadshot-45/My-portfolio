import type { Variants } from "framer-motion";

export const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

export const fadeUpVariants: Variants = {
  hidden: { y: 40, filter: "blur(10px)" },
  show: {
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export const scaleInVariants: Variants = {
  hidden: { scale: 0.94, filter: "blur(8px)" },
  show: {
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};
