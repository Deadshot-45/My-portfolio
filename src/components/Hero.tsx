"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";
import { containerVariants, fadeUpVariants, scaleInVariants } from "./motion";
import StaggeredText from "./StaggeredText";

export default function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen px-4 overflow-hidden pt-32 lg:pt-20 text-center">
      {/* Background */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.8, ease: "easeOut" }}
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/10 blur-[160px] rounded-full"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,6,23,0.8)_100%)]" />
      </div>

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="space-y-10 max-w-5xl z-10"
      >
        {/* Badge */}
        <motion.div
          variants={scaleInVariants}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-slate-900/50 backdrop-blur-md border border-slate-800 text-[10px] sm:text-xs font-bold tracking-[0.2em] text-accent uppercase shadow-2xl"
        >
          <Sparkles className="w-3 h-3 animate-pulse" />
          AVAILABLE FOR NEW INNOVATIONS & COLLABORATIONS
        </motion.div>

        {/* Heading + Description */}
        <div className="space-y-6">
          <motion.h1
            variants={scaleInVariants}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-6xl md:text-8xl lg:text-9xl font-display font-black tracking-tighter leading-[1.1] text-white"
          >
            <StaggeredText text="Digital" className="block" />

            <StaggeredText
              text="Architect."
              className="text-gradient inline-block"
            />
          </motion.h1>

          <motion.p
            variants={fadeUpVariants}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-lg md:text-2xl text-slate-400 max-w-3xl mx-auto font-medium"
          >
            I&apos;m <span className="text-white font-bold">Mayank Sahu</span> —
            crafting high-performance, visually stunning web experiences as a{" "}
            <span className="text-accent underline decoration-accent/20 underline-offset-8">
              Full Stack Engineer
            </span>
            .
          </motion.p>
        </div>

        {/* CTA */}
        <motion.div
          variants={scaleInVariants}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6"
        >
          <motion.a
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.96 }}
            href="#projects"
            className="group relative px-10 py-5 bg-accent text-slate-950 font-black rounded-2xl shadow-2xl shadow-accent/20 transition-all text-xs uppercase tracking-[0.2em]"
          >
            Explore Projects
            <ArrowRight className="inline-block ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            href="#about"
            className="px-10 py-5 bg-slate-900/50 backdrop-blur-sm text-slate-200 border border-slate-800 font-black rounded-2xl hover:bg-slate-800 transition-all text-xs uppercase tracking-[0.2em]"
          >
            About Me
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Hero Image */}
      <motion.div
        variants={fadeUpVariants}
        initial="hidden"
        animate="show"
        transition={{ duration: 1, delay: 1 }}
        className="mt-24 lg:mt-32 w-full max-w-6xl px-4 perspective-1000"
      >
        <div className="relative aspect-video rounded-[3rem] overflow-hidden border border-slate-800 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] glass p-3 group transform-gpu will-change-transform">
          <div className="w-full h-full rounded-[2.5rem] flex items-center justify-center overflow-hidden bg-slate-900/50">
            <Image
              src="/hero-developer.png"
              alt="Digital Product Showcase"
              fill
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover group-hover:scale-105 transition-transform duration-1000 opacity-80"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-t from-slate-950/40 via-transparent to-transparent" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
