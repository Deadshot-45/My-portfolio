"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "#subheader" },
    { name: "About Me", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Education", href: "#education" },
    { name: "Works", href: "#projects" },
    { name: "Hire Me", href: "#contact" },
  ];

  return (
    <>
      {/* Centered Desktop Menu */}
      <section className="w-full py-8 px-6 relative z-30">
        <div className="max-w-7xl mx-auto flex items-center justify-center relative">
          <div className="hidden md:flex items-center gap-8 text-[11px] font-display font-black uppercase tracking-[0.25em] text-slate-400">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-accent hover:shadow-[0_0_8px_rgba(0,255,135,0.3)] transition-all px-3 py-1"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-slate-400 hover:text-white transition-colors absolute right-0"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </section>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-x-0 top-20 z-40 bg-slate-950/95 backdrop-blur-2xl border-b border-slate-900 md:hidden p-8 flex flex-col items-center gap-6"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-lg font-display font-black uppercase tracking-[0.2em] text-slate-300 hover:text-accent transition-colors"
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
