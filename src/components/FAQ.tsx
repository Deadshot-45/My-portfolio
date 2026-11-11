'use client';

import React, { useState } from 'react';
import { FAQ_ITEMS } from '../data/portfolioData';
import { ThemeMode } from '../types/index';
import { ChevronDown } from 'lucide-react';

interface FAQProps {
  theme: ThemeMode;
}

export const FAQ: React.FC<FAQProps> = ({ theme }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const isDark = theme === 'dark';

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className={`py-24 border-t relative overflow-hidden ${
      isDark ? 'border-zinc-800/80 bg-zinc-950/40' : 'border-zinc-200 bg-zinc-50/70'
    }`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className={`text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight mb-4 ${
            isDark ? 'text-white' : 'text-zinc-950'
          }`}>
            Frequently Asked Questions.
          </h2>
          <p className={`text-base leading-relaxed ${
            isDark ? 'text-zinc-400' : 'text-zinc-600'
          }`}>
            Direct answers on engineering philosophy, stack proficiencies, and availability.
          </p>
        </div>

        <div className="space-y-4">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all ${
                  isOpen
                    ? isDark
                      ? 'bg-zinc-900/80 border-zinc-700 shadow-md'
                      : 'bg-white border-zinc-300 shadow-sm'
                    : isDark
                    ? 'bg-zinc-900/40 border-zinc-800/80 hover:border-zinc-700'
                    : 'bg-white/80 border-zinc-200 hover:border-zinc-300'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full text-left p-6 flex items-center justify-between gap-4"
                  aria-expanded={isOpen}
                >
                  <span className={`text-base sm:text-lg font-bold tracking-tight ${
                    isDark ? 'text-white' : 'text-zinc-950'
                  }`}>
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-emerald-500' : isDark ? 'text-zinc-500' : 'text-zinc-400'
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className={`px-6 pb-6 pt-1 text-sm sm:text-base leading-relaxed border-t ${
                    isDark ? 'border-zinc-800/60 text-zinc-300' : 'border-zinc-200 text-zinc-700'
                  }`}>
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
