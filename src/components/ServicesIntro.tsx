'use client';

import React from 'react';

export const ServicesIntro: React.FC = () => {
  const capabilities = [
    { title: 'Websites', desc: 'that bring you customers' },
    { title: '3D & animated sites', desc: 'people remember' },
    { title: 'Online stores', desc: 'built to sell' },
    { title: 'AI assistants', desc: 'that work while you sleep' },
  ];

  return (
    <section
      id="services-intro"
      data-surface="dark"
      aria-label="Creative Developer"
      className="relative z-10 w-full min-h-[90svh] bg-[#07070a] text-white px-[4vw] md:px-[var(--page-x)] py-20 md:py-28 flex flex-col justify-between border-t border-white/10"
    >
      {/* 1. Header with Period Glowing Accent */}
      <div className="relative z-10">
        <h2 className="font-grotesk text-[clamp(2.5rem,7vw,5.5rem)] font-light leading-[1.02] tracking-[-0.035em] text-white m-0">
          <span className="block">Creative</span>
          <span className="inline-flex items-baseline">
            Developer
            <i
              className="inline-block w-3 h-3 md:w-3.5 md:h-3.5 rounded-full bg-[#9bf35a] ml-2 shadow-[0_0_12px_#9bf35a] align-baseline"
              aria-hidden="true"
            />
          </span>
        </h2>
      </div>

      {/* 2. Middle Grid: 4 Core Offerings List & Narrative */}
      <div className="relative z-10 my-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
        
        {/* Capabilities numbered list */}
        <div className="lg:col-span-7">
          <ol className="flex flex-col divide-y divide-white/10 border-y border-white/10 font-grotesk">
            {capabilities.map((cap, idx) => (
              <li
                key={cap.title}
                className="py-5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 group hover:pl-2 transition-all duration-300"
              >
                <span className="text-[clamp(1.35rem,2.5vw,2.2rem)] font-normal text-white">
                  <span className="font-mono text-xs text-[#9bf35a] mr-3 font-semibold">0{idx + 1}</span>
                  {cap.title}
                </span>
                <span className="text-sm font-mono text-zinc-400 group-hover:text-zinc-200 transition-colors">
                  {cap.desc}
                </span>
              </li>
            ))}
          </ol>
        </div>

        {/* Philosophy Copy */}
        <div className="lg:col-span-5 max-w-md lg:ml-auto">
          <p className="font-grotesk text-[clamp(1rem,1.3vw,1.2rem)] leading-[1.5] text-zinc-300">
            I care about one thing: that your site does its job. Not just looking good, but bringing in sales, answering your customers’ questions, and working perfectly on launch day and every day after.
          </p>
        </div>

      </div>

      {/* 3. Bottom Location & Autonomy Footnote */}
      <div className="relative z-10 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-zinc-400">
        <div className="flex items-center gap-6">
          <span>Independent</span>
          <span>·</span>
          <span>Based in India</span>
          <span>·</span>
          <span>Clients worldwide</span>
        </div>

        <span className="text-zinc-500">React 19 / Next.js / Three.js / AI</span>
      </div>
    </section>
  );
};
