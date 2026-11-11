'use client';

import React, { useState, useEffect } from 'react';
import { ArrowRight, Terminal, Github, Linkedin, Mail, ExternalLink, Clock, ShieldCheck } from 'lucide-react';
import { Hero3DCanvas } from './Hero3DCanvas';
import { ThemeMode } from '../types/index';
import { USER_PROFILE, KEY_METRICS } from '../data/portfolioData';

interface HeroProps {
  onOpenInquiry: () => void;
  theme: ThemeMode;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenInquiry,
  theme,
}) => {
  const [timeStr, setTimeStr] = useState<string>('');
  const isDark = theme === 'dark';

  // Live time ticker for India (IST)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setTimeStr(new Intl.DateTimeFormat('en-US', options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="relative min-h-[92dvh] pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden flex flex-col justify-between">
      {/* Background kinetic watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none -z-10 opacity-[0.03] w-full text-center">
        <span className="text-[14vw] font-extrabold tracking-widest uppercase font-mono whitespace-nowrap block">
          M A Y A N K
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Authoritative Editorial Copy */}
          <div className="lg:col-span-7 flex flex-col items-start text-left z-10">
            
            {/* Live Status Row */}
            <div className="flex items-center gap-3 text-xs font-mono mb-6">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <span className={isDark ? 'text-zinc-200 font-medium' : 'text-zinc-800 font-medium'}>
                Available for Full-Stack & MERN Engineering
              </span>
              <span className={isDark ? 'text-zinc-600' : 'text-zinc-400'}>/</span>
              <span className={isDark ? 'text-zinc-400' : 'text-zinc-500'}>
                Indore, MP, India
              </span>
            </div>

            {/* Main Headline - High Contrast, No AI Slop Gradients */}
            <h1 className={`text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] mb-6 ${
              isDark ? 'text-white' : 'text-zinc-950'
            }`}>
              Full-Stack Developer.
              <span className={`block font-normal mt-2 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                Building resilient web apps & real-time systems.
              </span>
            </h1>

            {/* Subtitle - Exact Professional Summary from Resume */}
            <p className={`text-base sm:text-lg leading-relaxed max-w-2xl mb-8 ${
              isDark ? 'text-zinc-300' : 'text-zinc-700'
            }`}>
              I’m <strong className={isDark ? 'text-white' : 'text-zinc-950'}>{USER_PROFILE.name}</strong>. I architect and deliver full-stack products across <strong>React 19 / Next.js</strong> on the frontend and <strong>Node.js / Express</strong> on the backend, with <strong>PostgreSQL, MongoDB, Redis, and Socket.io</strong>. Focused on reducing latency, cutting redundant network calls, and engineering reliable interfaces from schema to release.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto mb-10">
              <a
                href="#work"
                className={`w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm active:scale-95 transition-all shadow-md ${
                  isDark
                    ? 'bg-white hover:bg-zinc-200 text-black'
                    : 'bg-zinc-950 hover:bg-zinc-800 text-white'
                }`}
              >
                <span>Explore Featured Work</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href={USER_PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-mono text-xs border active:scale-95 transition-all ${
                  isDark
                    ? 'bg-zinc-900/60 hover:bg-zinc-800 border-zinc-800 text-zinc-300 hover:text-white'
                    : 'bg-zinc-100 hover:bg-zinc-200 border-zinc-300 text-zinc-800'
                }`}
              >
                <Github className="w-4 h-4" />
                <span>github.com/Deadshot-45</span>
              </a>

              <a
                href={USER_PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-mono text-xs border active:scale-95 transition-all ${
                  isDark
                    ? 'bg-zinc-900/60 hover:bg-zinc-800 border-zinc-800 text-zinc-300 hover:text-white'
                    : 'bg-zinc-100 hover:bg-zinc-200 border-zinc-300 text-zinc-800'
                }`}
              >
                <Linkedin className="w-4 h-4 text-sky-500" />
                <span>LinkedIn Profile</span>
              </a>
            </div>

            {/* Real Key Technical Metrics from Resume */}
            <div className={`grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t w-full text-xs font-mono ${
              isDark ? 'border-zinc-800/80' : 'border-zinc-200'
            }`}>
              {KEY_METRICS.map((metric) => (
                <div key={metric.label} className="flex flex-col">
                  <span className={`text-2xl font-extrabold tracking-tight ${
                    isDark ? 'text-white' : 'text-zinc-950'
                  }`}>
                    {metric.value}
                  </span>
                  <span className={`font-semibold mt-0.5 ${isDark ? 'text-zinc-300' : 'text-zinc-800'}`}>
                    {metric.label}
                  </span>
                  <span className={`text-[11px] leading-snug mt-1 ${isDark ? 'text-zinc-500' : 'text-zinc-600'}`}>
                    {metric.desc}
                  </span>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: Real-Time Interactive Three.js WebGL Element */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="w-full relative z-10">
              <Hero3DCanvas />
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Technical Ticker Bar */}
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-10 pt-4 border-t flex flex-wrap items-center justify-between gap-4 text-xs font-mono ${
        isDark ? 'border-zinc-800/60 text-zinc-400' : 'border-zinc-200 text-zinc-600'
      }`}>
        <div className="flex items-center gap-2">
          <Clock className="w-3.5 h-3.5 text-zinc-500" />
          <span className={isDark ? 'text-zinc-200' : 'text-zinc-800'}>{timeStr || '19:30 IST'}</span>
          <span>in Indore, India (GMT +5:30)</span>
        </div>

        <div className="flex items-center gap-3">
          <span>React 19</span>
          <span>•</span>
          <span>Next.js App Router</span>
          <span>•</span>
          <span>Socket.io</span>
          <span>•</span>
          <span>PostgreSQL & Redis</span>
        </div>
      </div>
    </section>
  );
};
