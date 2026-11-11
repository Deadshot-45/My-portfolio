'use client';

import React from 'react';
import { SKILL_GROUPS } from '../data/portfolioData';
import { ThemeMode } from '../types/index';
import { CheckCircle2, Cpu, Database, Layout, ShieldCheck, Zap } from 'lucide-react';

interface TechnicalArsenalProps {
  theme: ThemeMode;
}

export const TechnicalArsenal: React.FC<TechnicalArsenalProps> = ({ theme }) => {
  const isDark = theme === 'dark';

  return (
    <section id="skills" className={`py-24 border-t relative overflow-hidden ${
      isDark ? 'border-zinc-800/80 bg-zinc-950/60' : 'border-zinc-200 bg-zinc-50/70'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading - No Kicker Eyebrow Badges */}
        <div className="max-w-3xl mb-16">
          <h2 className={`text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight mb-4 ${
            isDark ? 'text-white' : 'text-zinc-950'
          }`}>
            Technical Arsenal & Core Stack.
          </h2>
          <p className={`text-base sm:text-lg leading-relaxed ${
            isDark ? 'text-zinc-300' : 'text-zinc-700'
          }`}>
            Hands-on production proficiency across the modern JavaScript/TypeScript ecosystem. I take features from relational/document schema modeling through to responsive, accessible, high-framerate interfaces.
          </p>
        </div>

        {/* Skill Groups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {SKILL_GROUPS.map((group) => (
            <div
              key={group.category}
              className={`p-6 rounded-2xl border transition-all ${
                isDark
                  ? 'bg-zinc-900/60 border-zinc-800/80 hover:border-zinc-700'
                  : 'bg-white border-zinc-200 hover:border-zinc-300 shadow-sm'
              }`}
            >
              <h3 className={`text-base font-bold mb-4 flex items-center justify-between ${
                isDark ? 'text-white' : 'text-zinc-950'
              }`}>
                <span>{group.category}</span>
                <span className={`text-xs font-mono px-2 py-0.5 rounded ${
                  isDark ? 'bg-zinc-800 text-zinc-400' : 'bg-zinc-100 text-zinc-600'
                }`}>
                  {group.skills.length} tools
                </span>
              </h3>

              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className={`text-xs font-mono px-2.5 py-1 rounded-lg border transition-colors ${
                      isDark
                        ? 'bg-zinc-800/50 border-zinc-750 text-zinc-300 hover:text-white hover:border-zinc-600'
                        : 'bg-zinc-100 border-zinc-200 text-zinc-800 hover:text-black hover:border-zinc-400'
                    }`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Engineering Philosophy Cards: Proof & Standards */}
        <div className={`p-8 sm:p-10 rounded-3xl border ${
          isDark
            ? 'bg-zinc-900/40 border-zinc-800'
            : 'bg-white border-zinc-200 shadow-sm'
        }`}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-5 h-5 text-amber-500" />
                <h4 className={`font-bold text-base ${isDark ? 'text-white' : 'text-zinc-950'}`}>
                  Performance First
                </h4>
              </div>
              <p className={`text-sm leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                Reduced Largest Contentful Paint by 18% at LincPay Solution by implementing granular code-splitting, memoized computational nodes, and lazy asset delivery.
              </p>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <Database className="w-5 h-5 text-sky-500" />
                <h4 className={`font-bold text-base ${isDark ? 'text-white' : 'text-zinc-950'}`}>
                  Data Layer Efficiency
                </h4>
              </div>
              <p className={`text-sm leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                Cut redundant API requests by 40% in production using TanStack Query cache layering, deduplication, and optimistic state synchronization with error rollback.
              </p>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
                <h4 className={`font-bold text-base ${isDark ? 'text-white' : 'text-zinc-950'}`}>
                  Security & Auth Boundaries
                </h4>
              </div>
              <p className={`text-sm leading-relaxed ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                Implemented JWT access and refresh token rotation with secure HTTP-only cookies and granular Role-Based Access Control (RBAC) across multi-tier user products.
              </p>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
