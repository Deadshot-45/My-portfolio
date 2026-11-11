'use client';

import React from 'react';
import { SERVICES } from '../data/portfolioData';
import { ThemeMode } from '../types/index';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';

interface CoreCapabilitiesProps {
  onSelectService: (serviceName: string) => void;
  theme: ThemeMode;
}

export const CoreCapabilities: React.FC<CoreCapabilitiesProps> = ({
  onSelectService,
  theme,
}) => {
  const isDark = theme === 'dark';

  return (
    <section id="capabilities" className={`py-24 border-t relative overflow-hidden ${
      isDark ? 'border-zinc-800/80 bg-zinc-950/50' : 'border-zinc-200 bg-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <h2 className={`text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight mb-4 ${
            isDark ? 'text-white' : 'text-zinc-950'
          }`}>
            Core Engineering Capabilities.
          </h2>
          <p className={`text-base sm:text-lg leading-relaxed ${
            isDark ? 'text-zinc-300' : 'text-zinc-700'
          }`}>
            Disciplined software engineering applied across frontend architecture, real-time distributed systems, and secure database layers.
          </p>
        </div>

        {/* 4 Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className={`p-8 sm:p-10 rounded-3xl border flex flex-col justify-between transition-all ${
                isDark
                  ? 'bg-zinc-900/60 border-zinc-800/80 hover:border-zinc-700'
                  : 'bg-zinc-50 border-zinc-200 hover:border-zinc-300 shadow-sm'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className={`text-xs font-mono font-bold px-3 py-1 rounded-full border ${
                    isDark ? 'bg-zinc-800 border-zinc-700 text-zinc-300' : 'bg-white border-zinc-300 text-zinc-800'
                  }`}>
                    {service.number}
                  </span>
                  <span className="text-xs font-mono text-emerald-500 font-semibold">
                    {service.subtitle}
                  </span>
                </div>

                <h3 className={`text-2xl font-bold tracking-tight mb-3 ${
                  isDark ? 'text-white' : 'text-zinc-950'
                }`}>
                  {service.title}
                </h3>

                <p className={`text-sm sm:text-base leading-relaxed mb-6 ${
                  isDark ? 'text-zinc-300' : 'text-zinc-700'
                }`}>
                  {service.description}
                </p>

                {/* Deliverables List */}
                <ul className="space-y-3 mb-8">
                  {service.deliverables.map((item) => (
                    <li key={item.title} className="flex items-start gap-2.5 text-xs sm:text-sm">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <div>
                        <strong className={isDark ? 'text-white' : 'text-zinc-950'}>{item.title}: </strong>
                        <span className={isDark ? 'text-zinc-400' : 'text-zinc-600'}>{item.description}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Tech Tags & Action */}
              <div className="pt-6 border-t border-zinc-800/50 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-1.5">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`text-[11px] font-mono px-2 py-0.5 rounded border ${
                        isDark
                          ? 'bg-zinc-800/50 border-zinc-800 text-zinc-400'
                          : 'bg-zinc-200/60 border-zinc-300 text-zinc-700'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => onSelectService(service.title)}
                  className={`inline-flex items-center gap-1 text-xs font-bold transition-colors ${
                    isDark ? 'text-white hover:text-emerald-400' : 'text-zinc-950 hover:text-emerald-600'
                  }`}
                >
                  <span>Inquire Regarding {service.title}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
