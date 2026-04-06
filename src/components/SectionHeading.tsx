"use client";

import { motion } from "framer-motion";
import { fadeUpVariants, scaleInVariants } from "./motion";

export default function SectionHeading({
  title,
  subtitle,
  center = true,
}: {
  readonly title: string;
  readonly subtitle: string;
  readonly center?: boolean;
}) {
  return (
    <div className={`mb-16 space-y-6 ${center ? "text-center" : "text-left"}`}>
      <motion.div
        variants={scaleInVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className={`flex items-center gap-4 ${center ? "justify-center" : "justify-start"}`}
      >
        <div className="h-0.5 w-12 bg-accent/20 rounded-full hidden md:block" />
        <h2 className="text-4xl md:text-6xl font-display font-black tracking-tight flex items-center gap-3">
          <span className="w-4 h-4 bg-accent rounded-sm rotate-45 shadow-[0_0_20px_rgba(16,185,129,0.4)]" />
          {title}
        </h2>
        <div className="h-0.5 w-12 bg-accent/20 rounded-full hidden md:block" />
      </motion.div>
      <motion.p
        variants={fadeUpVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        transition={{ delay: 0.15 }}
        className="text-slate-400 max-w-xl mx-auto text-lg leading-relaxed"
      >
        {subtitle}
      </motion.p>
    </div>
  );
}
