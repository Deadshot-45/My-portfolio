"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { getAssetUrl } from "@/data/site";
import { scaleInVariants, fadeUpVariants } from "./motion";

export default function Hero() {
  const stats = [
    { value: "1,200+", label: "Hours of Work" },
    { value: "15+", label: "Projects Done" },
    { value: "10+", label: "Happy Clients" },
    { value: "1", label: "State Distinction" },
  ];

  return (
    <section id="subheader" className="relative flex flex-col items-center justify-center py-20 px-4 overflow-hidden text-center">
      
      {/* Background Orbs */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 blur-[120px] rounded-full"
        />
      </div>

      {/* Center Giant Logo */}
      <div className="max-w-7xl mx-auto space-y-6 pt-12 relative z-10 w-full">
        <motion.h1
          variants={scaleInVariants}
          initial="hidden"
          animate="show"
          transition={{ duration: 1, delay: 0.2 }}
          className="text-6xl sm:text-8xl md:text-[10rem] font-display font-black tracking-wider leading-[0.75] uppercase text-white"
        >
          Mayank<br />Sahu
        </motion.h1>
        
        <motion.h4
          variants={fadeUpVariants}
          initial="hidden"
          animate="show"
          transition={{ duration: 1, delay: 0.4 }}
          className="text-accent font-bold uppercase tracking-[0.3em] text-xs sm:text-sm md:text-base"
        >
          ● Available for Work
        </motion.h4>
      </div>

      {/* Two-Column Showcase Details */}
      <div className="grid xl:grid-cols-2 gap-8 w-full max-w-7xl mx-auto px-4 pt-16 relative z-10">
        
        {/* Left: Hero Image (Double Bezel) */}
        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          animate="show"
          transition={{ duration: 1, delay: 0.6 }}
          className="relative aspect-video rounded-[2.5rem] overflow-hidden p-2 bg-white/5 border border-white/5 shadow-2xl backdrop-blur-2xl"
        >
          <div className="w-full h-full rounded-[calc(2.5rem-0.5rem)] overflow-hidden relative">
            <Image
              src={getAssetUrl("/hero-developer.webp")}
              alt="Mayank Sahu Developer"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover hover:scale-105 transition-transform duration-700"
              priority
              quality={90}
            />
          </div>
        </motion.div>

        {/* Right: Vision Blurb (Double Bezel) */}
        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          animate="show"
          transition={{ duration: 1, delay: 0.8 }}
          className="p-2 rounded-[2.5rem] bg-white/5 border border-white/5 shadow-2xl backdrop-blur-2xl text-left"
        >
          <div className="bg-[#050912]/80 rounded-[calc(2.5rem-0.5rem)] p-8 md:p-12 border border-white/5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] h-full flex flex-col justify-center gap-4">
            <span className="text-[10px] font-display font-black uppercase tracking-[0.2em] text-slate-500">
              Vision & Focus
            </span>
            <h2 className="text-lg sm:text-xl md:text-2xl font-display font-black text-white leading-relaxed">
              Transforming your vision into a dynamic web experience through meticulously crafted designs, intuitive MERN stack user interfaces, and robust functionality.
            </h2>
          </div>
        </motion.div>

      </div>

      {/* Counters Block */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-7xl mx-auto px-4 mt-8 relative z-10">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            variants={scaleInVariants}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.8, delay: 0.8 + i * 0.1 }}
            className="p-2 rounded-2xl bg-white/5 border border-white/5 text-center shadow-lg"
          >
            <div className="bg-[#050912]/80 rounded-[calc(1rem)] py-6 border border-white/5 shadow-inner">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-display font-black text-accent mb-1">
                {stat.value}
              </h3>
              <span className="text-[9px] md:text-[10px] font-display font-bold uppercase tracking-widest text-slate-400">
                {stat.label}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

    </section>
  );
}
