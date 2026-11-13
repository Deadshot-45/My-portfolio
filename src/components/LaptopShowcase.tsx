'use client';

import React from 'react';
import { ArrowUpRight, ShieldCheck, Zap, Sparkles } from 'lucide-react';

export const LaptopShowcase: React.FC = () => {
  return (
    <section
      id="showcase"
      data-surface="white"
      aria-labelledby="showcase-title"
      className="relative z-10 w-full min-h-[90svh] bg-white text-[#0f0f0f] px-[4vw] md:px-[var(--page-x)] py-20 md:py-28 flex flex-col justify-between overflow-hidden border-t border-[#0f0f0f]/10"
    >
      {/* 1. Words Layer */}
      <div className="relative z-10 max-w-4xl">
        <h2
          id="showcase-title"
          className="font-grotesk text-[clamp(2.2rem,5.5vw,4.8rem)] font-light leading-[1.06] tracking-[-0.03em] text-[#0f0f0f] m-0"
        >
          <span className="block font-normal">Your brand, built to sell.</span>
          <span className="block text-[#0f0f0f]/60 mt-2">
            Open it up and see who already trusts me with theirs.
          </span>
        </h2>
      </div>

      {/* 2. Interactive Laptop / Device Mockup Stage */}
      <div className="relative z-10 my-16 flex items-center justify-center">
        <div className="relative w-full max-w-4xl aspect-[16/10] rounded-2xl md:rounded-3xl border border-[#0f0f0f]/15 bg-[#0f0f0f] p-3 md:p-5 shadow-2xl flex flex-col">
          
          {/* Laptop Top Bezel with camera dot */}
          <div className="w-full flex items-center justify-between pb-3 px-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
            </div>
            <div className="w-2 h-2 rounded-full bg-zinc-700 mx-auto" />
            <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider">
              Mayank Sahu Studio
            </span>
          </div>

          {/* Screen Content */}
          <div className="relative flex-1 w-full rounded-xl bg-zinc-950 overflow-hidden flex flex-col justify-between p-6 md:p-10 text-white">
            <div className="flex items-center justify-between font-mono text-xs text-zinc-400">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#9bf35a]" />
                <span>Next.js 16 Production Edge</span>
              </span>
              <span>60 FPS WebGL</span>
            </div>

            <div className="my-auto text-center max-w-lg mx-auto">
              <p className="font-mono text-xs uppercase tracking-widest text-[#9bf35a] mb-2 font-semibold">
                Direct Engineering Collaboration
              </p>
              <h3 className="font-grotesk text-2xl md:text-4xl font-bold tracking-tight text-white mb-4">
                Architecture that scales from day one.
              </h3>
              <p className="font-grotesk text-sm text-zinc-400 leading-relaxed">
                Zero bloated themes. Custom React 19 micro-interactions, sub-second TTFB, and server-side safety on every single deployment.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10 text-center font-mono text-xs">
              <div>
                <span className="text-[#9bf35a] font-bold block text-base md:text-lg">0.3s</span>
                <span className="text-zinc-500 text-[10px]">Avg. Page Load</span>
              </div>
              <div>
                <span className="text-[#9bf35a] font-bold block text-base md:text-lg">100%</span>
                <span className="text-zinc-500 text-[10px]">Direct Comms</span>
              </div>
              <div>
                <span className="text-[#9bf35a] font-bold block text-base md:text-lg">24/7</span>
                <span className="text-zinc-500 text-[10px]">AI Workflows</span>
              </div>
            </div>
          </div>

          {/* Laptop Base Lip */}
          <div className="w-24 h-1.5 rounded-full bg-zinc-700 mx-auto mt-2" />
        </div>
      </div>

      {/* 3. Bottom Row */}
      <footer className="relative z-10 pt-6 border-t border-[#0f0f0f]/10 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-[#0f0f0f]/60">
        <span>Precision UX / UI Engineering</span>
        <span>Every device tested locally</span>
      </footer>
    </section>
  );
};
