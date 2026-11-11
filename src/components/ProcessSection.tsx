'use client';

import React, { useState } from 'react';
import { PROCESS_STEPS } from '../data/portfolioData';
import { ThemeMode } from '../types/index';
import { ChevronDown, CheckCircle2 } from 'lucide-react';

interface ProcessSectionProps {
  theme: ThemeMode;
}

export const ProcessSection: React.FC<ProcessSectionProps> = ({ theme }) => {
  const [activeStep, setActiveStep] = useState<string>('01');
  const isDark = theme === 'dark';

  return (
    <section id="process" className={`py-24 border-t relative overflow-hidden ${
      isDark ? 'border-zinc-800/80 bg-zinc-950/60' : 'border-zinc-200 bg-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <h2 className={`text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight mb-4 ${
            isDark ? 'text-white' : 'text-zinc-950'
          }`}>
            Software Engineering Lifecycle.
          </h2>
          <p className={`text-base sm:text-lg leading-relaxed ${
            isDark ? 'text-zinc-300' : 'text-zinc-700'
          }`}>
            A structured 4-phase discipline designed to eliminate scope ambiguity, guarantee performance, and release stable production software.
          </p>
        </div>

        {/* 4-Step Process Accordion */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left: Step Selection Cards */}
          <div className="lg:col-span-5 space-y-3">
            {PROCESS_STEPS.map((step) => {
              const isSelected = activeStep === step.step;
              return (
                <button
                  key={step.step}
                  type="button"
                  onClick={() => setActiveStep(step.step)}
                  className={`w-full text-left p-6 rounded-2xl border transition-all flex items-center justify-between ${
                    isSelected
                      ? isDark
                        ? 'bg-zinc-900 border-zinc-700 shadow-lg'
                        : 'bg-zinc-100 border-zinc-300 shadow-sm'
                      : isDark
                      ? 'bg-zinc-950/50 border-zinc-800/60 hover:bg-zinc-900/50'
                      : 'bg-white border-zinc-200 hover:bg-zinc-50'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className={`text-sm font-mono font-bold px-2.5 py-1 rounded-md border ${
                      isSelected
                        ? isDark
                          ? 'bg-emerald-500 text-black border-emerald-400'
                          : 'bg-emerald-600 text-white border-emerald-500'
                        : isDark
                        ? 'bg-zinc-800 border-zinc-700 text-zinc-400'
                        : 'bg-zinc-200 border-zinc-300 text-zinc-600'
                    }`}>
                      {step.step}
                    </span>
                    <div>
                      <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-zinc-950'}`}>
                        {step.title}
                      </h3>
                      <p className={`text-xs font-mono mt-0.5 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                        {step.subtitle}
                      </p>
                    </div>
                  </div>

                  <ChevronDown className={`w-4 h-4 transition-transform ${
                    isSelected ? 'rotate-[-90deg] text-emerald-500' : 'text-zinc-500'
                  }`} />
                </button>
              );
            })}
          </div>

          {/* Right: Active Step Deep Dive */}
          <div className="lg:col-span-7">
            {PROCESS_STEPS.filter((s) => s.step === activeStep).map((current) => (
              <div
                key={current.step}
                className={`p-8 sm:p-10 rounded-3xl border h-full flex flex-col justify-between ${
                  isDark
                    ? 'bg-zinc-900/60 border-zinc-800 shadow-xl'
                    : 'bg-zinc-50 border-zinc-200 shadow-md'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between pb-6 mb-6 border-b border-zinc-800/60">
                    <div>
                      <span className="text-xs font-mono uppercase tracking-widest text-emerald-500 font-bold">
                        Phase {current.step}
                      </span>
                      <h3 className={`text-2xl sm:text-3xl font-extrabold tracking-tight mt-1 ${
                        isDark ? 'text-white' : 'text-zinc-950'
                      }`}>
                        {current.title} · {current.subtitle}
                      </h3>
                    </div>
                  </div>

                  <p className={`text-base sm:text-lg leading-relaxed mb-8 ${
                    isDark ? 'text-zinc-200' : 'text-zinc-800'
                  }`}>
                    {current.summary}
                  </p>

                  <h4 className={`text-xs font-mono uppercase tracking-wider mb-4 ${
                    isDark ? 'text-zinc-400' : 'text-zinc-600'
                  }`}>
                    Core Phase Deliverables:
                  </h4>

                  <ul className="space-y-3.5 mb-8">
                    {current.details.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span className={isDark ? 'text-zinc-300' : 'text-zinc-700'}>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={`pt-6 border-t text-xs font-mono flex items-center justify-between ${
                  isDark ? 'border-zinc-800/80 text-zinc-500' : 'border-zinc-200 text-zinc-600'
                }`}>
                  <span>Full-Stack Engineering Lifecycle</span>
                  <span className="text-emerald-500 font-bold">Production Ready</span>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
