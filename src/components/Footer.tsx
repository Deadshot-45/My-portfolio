'use client';

import React, { useState } from 'react';
import { USER_PROFILE } from '../data/portfolioData';
import { UserProfile } from '../types/index';
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import Link from 'next/link';

interface FooterProps {
  onOpenInquiry?: () => void;
  profile?: UserProfile;
}

export const Footer: React.FC<FooterProps> = ({ onOpenInquiry, profile = USER_PROFILE }) => {
  const activeProfile = profile || USER_PROFILE;
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(activeProfile.email);
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
    <footer
      id="contact"
      data-surface="white"
      aria-labelledby="contact-title"
      className="relative flex flex-col overflow-hidden px-[4vw] pb-[4vw] pt-[10svh] md:px-[var(--page-x)] md:pb-[var(--page-x)] md:min-h-[90svh] md:pt-[24svh]"
      style={{
        background:
          "linear-gradient(to bottom, #a7c3e2 0%, #c6d6e8 44%, #d6dee7 66%, #dde1e5 100%)",
      }}
    >
      <div className="relative mt-auto w-full">
        {/* Dark Container Card matching ex.tsx */}
        <div className="relative flex flex-col gap-10 overflow-hidden px-[6vw] pb-8 pt-12 text-[#f2efe8] md:gap-14 md:px-[5vw] md:pb-10 md:pt-16 rounded-3xl bg-[#050505] shadow-2xl">
          {/* Top Row: Still scrolling & Email CTA */}
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between border-b border-white/10 pb-12">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-[#f2efe8]/60 mb-2">
                Still scrolling? Good sign.
              </p>
              <h2
                id="contact-title"
                className="font-grotesk text-[clamp(2.4rem,6vw,5rem)] font-light leading-[1.05] tracking-[-0.03em] text-white m-0"
              >
                <span className="block">Got a project</span>
                <span className="block">in mind?</span>
              </h2>
            </div>

            <div className="md:text-right">
              <p className="font-mono text-xs uppercase tracking-widest text-[#f2efe8]/60 mb-2">
                Email me
              </p>
              <a
                href={`mailto:${activeProfile.email}`}
                className="group block w-fit font-grotesk text-[clamp(1.3rem,4.5vw,2.8rem)] font-medium leading-[1.15] tracking-[-0.03em] md:ml-auto text-white hover:text-[#9bf35a] transition-colors"
              >
                <span className="block whitespace-nowrap">
                  {activeProfile.email}
                </span>
                <span className="mt-1 block h-px w-full origin-left bg-[#9bf35a] transition-transform duration-500 scale-x-0 group-hover:scale-x-100" />
              </a>
              <div className="flex items-center gap-3 mt-3 md:justify-end">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="font-mono text-xs text-zinc-400 hover:text-white transition-colors cursor-pointer"
                >
                  {copied ? "✓ Email Copied" : "Copy address"}
                </button>
                <span className="text-zinc-600">·</span>
                <p className="font-mono text-xs text-zinc-400 m-0">
                  I usually reply within a day.
                </p>
              </div>
            </div>
          </div>

          {/* Navigation & Social Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 font-grotesk text-sm">
            {/* Pages Navigation */}
            <div>
              <p className="font-mono text-[11px] uppercase tracking-widest text-zinc-500 mb-3">
                Pages
              </p>
              <ul className="space-y-2 list-none p-0 m-0 text-zinc-300">
                <li>
                  <a
                    href="#hero"
                    className="hover:text-white transition-colors"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <Link href="#why" className="hover:text-white transition-colors">
                    Why Custom
                  </Link>
                </li>
                <li>
                  <a
                    href="#work"
                    className="hover:text-white transition-colors"
                  >
                    Selected Work
                  </a>
                </li>
                <li>
                  <a
                    href="#clients"
                    className="hover:text-white transition-colors"
                  >
                    Clients & Services
                  </a>
                </li>
                <li>
                  <a
                    href="#craft"
                    className="hover:text-white transition-colors"
                  >
                    Craft & Architecture
                  </a>
                </li>
                <li>
                  <a
                    href="#process"
                    className="hover:text-white transition-colors"
                  >
                    How We Build
                  </a>
                </li>
              </ul>
            </div>

            {/* Socials */}
            <div>
              <p className="font-mono text-[11px] uppercase tracking-widest text-zinc-500 mb-3">
                Socials
              </p>
              <ul className="space-y-2 list-none p-0 m-0 text-zinc-300">
                <li>
                  <a
                    href={activeProfile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#9bf35a] transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>GitHub</span>
                    <Github className="w-3.5 h-3.5" />
                  </a>
                </li>
                <li>
                  <a
                    href={activeProfile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#9bf35a] transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>LinkedIn</span>
                    <Linkedin className="w-3.5 h-3.5" />
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${activeProfile.email}`}
                    className="hover:text-[#9bf35a] transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>Email Direct</span>
                    <Mail className="w-3.5 h-3.5" />
                  </a>
                </li>
              </ul>
            </div>

            {/* Office & Time */}
            <div>
              <p className="font-mono text-[11px] uppercase tracking-widest text-zinc-500 mb-3">
                Base
              </p>
              <p className="text-zinc-300 text-sm leading-relaxed m-0">
                Indore, MP, India
                <br />
                Available Worldwide
                <br />
                <span className="font-mono text-xs text-[#9bf35a] mt-2 inline-block">
                  ● Available for Work
                </span>
              </p>
            </div>

            {/* Back to top */}
            <div className="flex flex-col justify-between items-start md:items-end">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-widest text-zinc-500 mb-3">
                  Inquiries
                </p>
                {onOpenInquiry && (
                  <button
                    type="button"
                    onClick={onOpenInquiry}
                    className="px-4 py-2 rounded-lg bg-[#9bf35a] text-black font-semibold text-xs font-grotesk hover:bg-[#b0ff72] transition-colors cursor-pointer"
                  >
                    Start a Project
                  </button>
                )}
              </div>

              <button
                type="button"
                onClick={scrollToTop}
                className="mt-6 inline-flex items-center gap-2 font-mono text-xs text-zinc-400 hover:text-white transition-colors cursor-pointer p-1"
                aria-label="Back to top"
              >
                <span>Back to top</span>
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Bottom Copyright */}
          <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-zinc-500">
            <span>© 2026 {USER_PROFILE.name}. All rights reserved.</span>
            <span>Crafted with Next.js, React 19, and Tailwind CSS.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
