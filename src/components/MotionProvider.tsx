"use client";

import { AnimatePresence, motion, MotionConfig } from "framer-motion";

export default function MotionProvider({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  return (
    <MotionConfig
      reducedMotion="user"
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <AnimatePresence mode="wait">
        <motion.div
           key="page-mount"
           initial={{ opacity: 0, y: 8 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5, delay: 0, ease: [0.22, 1, 0.36, 1] }}
           className="flex-1 flex flex-col"
         >

          {children}
        </motion.div>
      </AnimatePresence>
    </MotionConfig>
  );
}
