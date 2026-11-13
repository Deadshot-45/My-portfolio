'use client';

import React, { useState } from 'react';
import { PROCESS_STEPS } from '../data/portfolioData';

export const ProcessSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState<string>('01');

  return (
    <section
      id="process"
      data-surface="white"
      aria-labelledby="process-title"
      className="relative z-10 w-full min-h-[90svh] bg-white text-[#0f0f0f] px-[4vw] md:px-[var(--page-x)] py-20 md:py-28 flex flex-col justify-between overflow-hidden border-t border-[#0f0f0f]/10"
    >
      {/* 1. Header & Statement */}
      <div className="relative z-10 max-w-4xl">
        <h2
          id="process-title"
          className="font-grotesk text-[clamp(2.5rem,7vw,5.5rem)] font-light leading-[1.02] tracking-[-0.035em] text-[#0f0f0f] m-0"
        >
          How we work together
        </h2>
        <p className="font-grotesk text-[clamp(1.1rem,1.5vw,1.4rem)] text-[#0f0f0f]/80 mt-6 leading-relaxed max-w-3xl">
          First I listen and plan, then I design, build and launch. You talk to me the whole way, never a middleman, and you always know what happens next.
        </p>
      </div>

      {/* 2. Interactive 4-Step Pipeline */}
      <div className="relative z-10 my-16">
        <ol className="grid grid-cols-1 md:grid-cols-4 gap-6 list-none p-0 m-0">
          {PROCESS_STEPS.map((step) => {
            const isActive = activeStep === step.step;
            return (
              <li
                key={step.step}
                onClick={() => setActiveStep(step.step)}
                className={`p-6 md:p-8 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  isActive
                    ? 'bg-[#0f0f0f] text-white border-[#0f0f0f] shadow-xl scale-[1.02]'
                    : 'bg-[#0f0f0f]/[0.02] text-[#0f0f0f] border-[#0f0f0f]/15 hover:border-[#0f0f0f]/35 hover:bg-[#0f0f0f]/[0.04]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between font-mono text-xs mb-6">
                    <span className={isActive ? 'text-[#9bf35a] font-bold' : 'text-[#0f0f0f]/50 font-bold'}>
                      {step.step}
                    </span>
                    <span className={isActive ? 'text-zinc-400' : 'text-[#0f0f0f]/40'}>
                      Sprint Phase
                    </span>
                  </div>

                  <h3 className="font-grotesk text-2xl md:text-3xl font-light tracking-tight mb-4">
                    {step.title}
                  </h3>

                  <p className={`font-grotesk text-sm leading-relaxed ${
                    isActive ? 'text-zinc-300' : 'text-[#0f0f0f]/70'
                  }`}>
                    {step.summary}
                  </p>
                </div>

                <div className={`mt-8 pt-4 border-t font-mono text-[11px] ${
                  isActive ? 'border-white/15 text-zinc-400' : 'border-[#0f0f0f]/10 text-[#0f0f0f]/50'
                }`}>
                  {step.subtitle}
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      {/* 3. Bottom Guarantees */}
      <footer className="relative z-10 pt-6 border-t border-[#0f0f0f]/10 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-[#0f0f0f]/50">
        <span>Direct 1-on-1 Communication</span>
        <span>90-Day Post-Launch Warranty Included</span>
      </footer>
    </section>
  );
};
