'use client';

import React, { useState } from 'react';
import { ArrowUp, Mail, Copy, Check, Github, Linkedin, Phone, MapPin } from 'lucide-react';
import { USER_PROFILE } from '../data/portfolioData';
import { ThemeMode } from '../types/index';

interface FooterProps {
  onOpenInquiry: () => void;
  theme: ThemeMode;
}

export const Footer: React.FC<FooterProps> = ({ onOpenInquiry, theme }) => {
  const [copied, setCopied] = useState(false);
  const isDark = theme === 'dark';

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(USER_PROFILE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // safe fallback
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className={`pt-24 pb-12 border-t relative overflow-hidden ${
      isDark ? 'border-zinc-800/80 bg-[#07070a]' : 'border-zinc-200 bg-zinc-50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Contact Hero CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20 pb-16 border-b border-zinc-800/50">
          
          <div className="lg:col-span-7">
            <h2 className={`text-4xl sm:text-6xl font-extrabold tracking-tight leading-[1.08] mb-6 ${
              isDark ? 'text-white' : 'text-zinc-950'
            }`}>
              Let’s build something remarkable together.
            </h2>
            <p className={`text-base sm:text-lg leading-relaxed max-w-xl mb-8 ${
              isDark ? 'text-zinc-300' : 'text-zinc-700'
            }`}>
              Currently open to Full-Stack, Frontend, or MERN developer roles (full-time or contract) where software craftsmanship, performance, and real-time reliability matter.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onOpenInquiry}
                className={`inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-xs sm:text-sm active:scale-95 transition-all shadow-md ${
                  isDark
                    ? 'bg-white hover:bg-zinc-200 text-black'
                    : 'bg-zinc-950 hover:bg-zinc-800 text-white'
                }`}
              >
                <span>Send Direct Inquiry</span>
              </button>

              <a
                href={`mailto:${USER_PROFILE.email}`}
                className={`inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-mono text-xs border active:scale-95 transition-all ${
                  isDark
                    ? 'bg-zinc-900 hover:bg-zinc-800 border-zinc-800 text-zinc-300 hover:text-white'
                    : 'bg-white hover:bg-zinc-100 border-zinc-300 text-zinc-800'
                }`}
              >
                <Mail className="w-4 h-4 text-emerald-500" />
                <span>{USER_PROFILE.email}</span>
              </a>
            </div>
          </div>

          {/* Quick Contact & Metadata Details */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Email Card with 1-Click Copy */}
            <div className={`p-6 rounded-2xl border flex items-center justify-between gap-4 ${
              isDark ? 'bg-zinc-900/50 border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'
            }`}>
              <div className="flex flex-col">
                <span className={`text-xs font-mono ${isDark ? 'text-zinc-500' : 'text-zinc-500'}`}>
                  Primary Email
                </span>
                <span className={`font-mono text-sm sm:text-base font-bold mt-1 ${
                  isDark ? 'text-white' : 'text-zinc-950'
                }`}>
                  {USER_PROFILE.email}
                </span>
              </div>

              <button
                type="button"
                onClick={handleCopyEmail}
                className={`p-2.5 rounded-xl border transition-all active:scale-95 ${
                  copied
                    ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
                    : isDark
                    ? 'bg-zinc-800 hover:bg-zinc-700 border-zinc-700 text-zinc-300'
                    : 'bg-zinc-100 hover:bg-zinc-200 border-zinc-300 text-zinc-700'
                }`}
                title="Copy email to clipboard"
                aria-label="Copy email"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Phone & Location */}
            <div className="grid grid-cols-2 gap-4">
              <div className={`p-5 rounded-2xl border ${
                isDark ? 'bg-zinc-900/50 border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'
              }`}>
                <span className={`text-xs font-mono flex items-center gap-1.5 ${
                  isDark ? 'text-zinc-500' : 'text-zinc-500'
                }`}>
                  <Phone className="w-3.5 h-3.5 text-emerald-500" />
                  Direct Phone
                </span>
                <span className={`font-mono text-xs sm:text-sm font-bold block mt-1.5 ${
                  isDark ? 'text-zinc-200' : 'text-zinc-800'
                }`}>
                  {USER_PROFILE.phone}
                </span>
              </div>

              <div className={`p-5 rounded-2xl border ${
                isDark ? 'bg-zinc-900/50 border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'
              }`}>
                <span className={`text-xs font-mono flex items-center gap-1.5 ${
                  isDark ? 'text-zinc-500' : 'text-zinc-500'
                }`}>
                  <MapPin className="w-3.5 h-3.5 text-sky-500" />
                  Base Location
                </span>
                <span className={`font-mono text-xs sm:text-sm font-bold block mt-1.5 ${
                  isDark ? 'text-zinc-200' : 'text-zinc-800'
                }`}>
                  Indore, MP, India
                </span>
              </div>
            </div>

            {/* Social & Code Profiles */}
            <div className="flex items-center gap-3">
              <a
                href={USER_PROFILE.github}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex-1 p-3.5 rounded-xl border flex items-center justify-center gap-2 text-xs font-mono transition-all active:scale-95 ${
                  isDark
                    ? 'bg-zinc-900 hover:bg-zinc-800 border-zinc-800 text-zinc-300 hover:text-white'
                    : 'bg-white hover:bg-zinc-100 border-zinc-300 text-zinc-800 shadow-sm'
                }`}
              >
                <Github className="w-4 h-4" />
                <span>github.com/Deadshot-45</span>
              </a>

              <a
                href={USER_PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex-1 p-3.5 rounded-xl border flex items-center justify-center gap-2 text-xs font-mono transition-all active:scale-95 ${
                  isDark
                    ? 'bg-zinc-900 hover:bg-zinc-800 border-zinc-800 text-zinc-300 hover:text-white'
                    : 'bg-white hover:bg-zinc-100 border-zinc-300 text-zinc-800 shadow-sm'
                }`}
              >
                <Linkedin className="w-4 h-4 text-sky-500" />
                <span>LinkedIn</span>
              </a>
            </div>

          </div>

        </div>

        {/* Bottom Bar: Copyright & Back To Top */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <div>
            <span>© {new Date().getFullYear()} {USER_PROFILE.name}. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={scrollToTop}
              className={`inline-flex items-center gap-1.5 hover:underline transition-colors ${
                isDark ? 'text-zinc-400 hover:text-white' : 'text-zinc-600 hover:text-zinc-950'
              }`}
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
