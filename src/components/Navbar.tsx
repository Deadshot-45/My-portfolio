'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Volume2, VolumeX, Sun, Moon, Github, Linkedin, Mail } from 'lucide-react';
import { ThemeMode } from '../types/index';
import { USER_PROFILE } from '../data/portfolioData';

interface NavbarProps {
  onOpenInquiry: () => void;
  theme: ThemeMode;
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenInquiry,
  theme,
  onToggleTheme,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [soundActive, setSoundActive] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const playToggleSound = (willBeActive: boolean) => {
    if (typeof window === 'undefined') return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      if (willBeActive) {
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.08);
      } else {
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 0.06);
      }

      gain.gain.setValueAtTime(0.03, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch {
      // Safe fallback
    }
  };

  const handleToggleSound = () => {
    const nextState = !soundActive;
    setSoundActive(nextState);
    playToggleSound(nextState);
  };

  const navLinks = [
    { label: 'Projects', href: '#work' },
    { label: 'Skills', href: '#skills' },
    { label: 'Experience', href: '#experience' },
    { label: 'Capabilities', href: '#capabilities' },
    { label: 'Architecture', href: '#architecture' },
    { label: 'Contact', href: '#contact' },
  ];

  const isDark = theme === 'dark';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 pt-4 pb-2 transition-all duration-300">
      <div
        className={`max-w-7xl mx-auto rounded-2xl transition-all duration-300 ${
          scrolled
            ? isDark
              ? 'bg-[#09090b]/90 backdrop-blur-xl border border-zinc-800/80 shadow-2xl py-3 px-4 sm:px-6'
              : 'bg-white/90 backdrop-blur-xl border border-zinc-200/90 shadow-xl py-3 px-4 sm:px-6'
            : isDark
            ? 'bg-[#09090b]/60 backdrop-blur-md border border-zinc-800/40 py-4 px-4 sm:px-6'
            : 'bg-white/70 backdrop-blur-md border border-zinc-200/60 py-4 px-4 sm:px-6'
        }`}
      >
        <div className="flex items-center justify-between">
          
          {/* Logo & Identity */}
          <a href="#" className="flex items-center gap-3 group">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center font-mono font-bold text-sm transition-transform group-hover:scale-95 ${
                isDark
                  ? 'bg-zinc-800 text-white border border-zinc-700'
                  : 'bg-zinc-900 text-white border border-zinc-800'
              }`}
            >
              MS
            </div>

            <div className="flex flex-col">
              <span className={`font-bold text-sm sm:text-base tracking-tight flex items-center gap-1.5 ${isDark ? 'text-white' : 'text-zinc-950'}`}>
                {USER_PROFILE.name}
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </span>
              <span className={`text-[11px] font-mono tracking-wider ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                Full-Stack Developer
              </span>
            </div>
          </a>

          {/* Center: Desktop Nav Links */}
          <nav
            className={`hidden md:flex items-center gap-1 p-1 rounded-xl border ${
              isDark
                ? 'bg-zinc-900/50 border-zinc-800/60'
                : 'bg-zinc-100/70 border-zinc-200/80'
            }`}
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  isDark
                    ? 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
                    : 'text-zinc-600 hover:text-zinc-950 hover:bg-white'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action Cluster */}
          <div className="flex items-center gap-2.5">
            
            {/* Dark / Light Mode Switcher */}
            <button
              type="button"
              onClick={onToggleTheme}
              className={`p-2 rounded-xl border transition-all active:scale-95 ${
                isDark
                  ? 'bg-zinc-900 hover:bg-zinc-850 border-zinc-800 text-amber-400'
                  : 'bg-zinc-100 hover:bg-zinc-200 border-zinc-300 text-zinc-800'
              }`}
              aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
              title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Sound Toggle */}
            <button
              type="button"
              onClick={handleToggleSound}
              className={`hidden sm:flex items-center gap-1.5 px-2.5 py-2 rounded-xl border text-xs font-mono transition-all active:scale-95 ${
                isDark
                  ? 'bg-zinc-900 hover:bg-zinc-850 border-zinc-800 text-zinc-300'
                  : 'bg-zinc-100 hover:bg-zinc-200 border-zinc-300 text-zinc-700'
              }`}
              aria-label={soundActive ? 'Sound On' : 'Sound Off'}
            >
              {soundActive ? (
                <>
                  <span className="flex items-end gap-[2px] h-3 w-3">
                    <span className="w-[2px] bg-emerald-500 rounded-full animate-[pulse_0.6s_ease-in-out_infinite] h-full" />
                    <span className="w-[2px] bg-emerald-500 rounded-full animate-[pulse_0.9s_ease-in-out_infinite] h-2/3" />
                    <span className="w-[2px] bg-emerald-500 rounded-full animate-[pulse_0.75s_ease-in-out_infinite] h-4/5" />
                  </span>
                  <span className="text-[10px]">SFX</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3 h-3 text-zinc-500" />
                  <span className="text-[10px] text-zinc-500">Muted</span>
                </>
              )}
            </button>

            {/* GitHub Profile Icon Link */}
            <a
              href={USER_PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-xl border transition-all active:scale-95 hidden sm:inline-flex ${
                isDark
                  ? 'bg-zinc-900 hover:bg-zinc-850 border-zinc-800 text-zinc-300 hover:text-white'
                  : 'bg-zinc-100 hover:bg-zinc-200 border-zinc-300 text-zinc-700 hover:text-zinc-950'
              }`}
              title="GitHub Profile (Deadshot-45)"
              aria-label="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>

            {/* LinkedIn Profile Icon Link */}
            <a
              href={USER_PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-xl border transition-all active:scale-95 hidden sm:inline-flex ${
                isDark
                  ? 'bg-zinc-900 hover:bg-zinc-850 border-zinc-800 text-zinc-300 hover:text-white'
                  : 'bg-zinc-100 hover:bg-zinc-200 border-zinc-300 text-zinc-700 hover:text-zinc-950'
              }`}
              title="LinkedIn Profile (mayank-sahu-ou)"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
            </a>

            {/* Get In Touch CTA */}
            <button
              onClick={onOpenInquiry}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all active:scale-95 shadow-sm ${
                isDark
                  ? 'bg-white hover:bg-zinc-200 text-black'
                  : 'bg-zinc-950 hover:bg-zinc-800 text-white'
              }`}
            >
              <span>Get In Touch</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 md:hidden rounded-lg transition-colors ${
                isDark
                  ? 'text-zinc-400 hover:text-white hover:bg-zinc-800'
                  : 'text-zinc-600 hover:text-zinc-950 hover:bg-zinc-200'
              }`}
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className={`md:hidden mt-3 pt-3 border-t space-y-2 ${isDark ? 'border-zinc-800' : 'border-zinc-200'}`}>
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    isDark
                      ? 'text-zinc-300 bg-zinc-900/60 hover:bg-zinc-800'
                      : 'text-zinc-700 bg-zinc-100 hover:bg-zinc-200'
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2">
                <a
                  href={USER_PROFILE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-lg border text-xs font-mono flex items-center gap-1.5 ${
                    isDark ? 'border-zinc-800 text-zinc-300' : 'border-zinc-300 text-zinc-700'
                  }`}
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
                <a
                  href={USER_PROFILE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-lg border text-xs font-mono flex items-center gap-1.5 ${
                    isDark ? 'border-zinc-800 text-zinc-300' : 'border-zinc-300 text-zinc-700'
                  }`}
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                </a>
              </div>

              <button
                type="button"
                onClick={onToggleTheme}
                className={`p-2 rounded-lg border text-xs font-mono flex items-center gap-1.5 ${
                  isDark ? 'border-zinc-800 text-amber-400' : 'border-zinc-300 text-zinc-800'
                }`}
              >
                {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
                <span>{isDark ? 'Light' : 'Dark'}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
