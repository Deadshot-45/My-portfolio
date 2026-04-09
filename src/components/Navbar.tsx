"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Github, Linkedin, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [activeSection, setActiveSection] = useState("home");

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Education", href: "#education" },
    { name: "Achievements", href: "#achievements" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const sectionIds = navLinks.map((item) => item.href.replace("#", ""));
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    const updateActiveSection = () => {
      setScrolled(window.scrollY > 12);

      if (window.scrollY < 80) {
        setActiveSection("home");
        return;
      }

      const viewportAnchor = window.innerHeight * 0.35;
      const active = sections.reduce<{
        id: string;
        distance: number;
        inView: boolean;
      } | null>((closest, section) => {
        const rect = section.getBoundingClientRect();
        const isInView =
          rect.top <= viewportAnchor && rect.bottom >= viewportAnchor;
        const distance = Math.abs(rect.top - viewportAnchor);
        const next = { id: section.id, distance, inView: isInView };

        if (!closest) {
          return next;
        }

        if (next.inView && !closest.inView) {
          return next;
        }

        if (
          next.inView === closest.inView &&
          next.distance < closest.distance
        ) {
          return next;
        }

        return closest;
      }, null);

      if (active?.id) {
        setActiveSection(active.id);
      }
    };

    const syncWithHash = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash && sectionIds.includes(hash)) {
        setActiveSection(hash);
        return;
      }

      updateActiveSection();
    };

    updateActiveSection();
    syncWithHash();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("hashchange", syncWithHash);
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("hashchange", syncWithHash);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -60, x: "-50%", opacity: 0 }}
        animate={{ y: 0, x: "-50%", opacity: 1 }}
        transition={{
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1],
          delay: 0,
        }}
        className={`fixed top-4 left-1/2 z-50 px-6 py-2.5 rounded-full transition-all duration-500 transform-gpu ${
          scrolled
            ? "glass shadow-2xl w-[95%] lg:w-[85%] max-w-5xl"
            : "w-[98%] max-w-6xl"
        }`}
      >
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/"
            className="font-display font-bold text-xl tracking-tighter shrink-0 z-50"
          >
            MAYANK<span className="text-accent">.DEV</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-6 text-[13px] font-medium text-slate-400">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`hover:text-white transition-colors px-2 py-1 ${
                  activeSection === link.href.replace("#", "")
                    ? "text-white"
                    : ""
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <div className="hidden sm:flex items-center gap-4">
              <a
                href="https://github.com/Deadshot-45/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/mayank-sahu-ou"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>

            <button
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="bg-accent/10 text-accent border border-accent/20 px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-accent hover:text-white transition-all cursor-pointer whitespace-nowrap hidden sm:block"
            >
              Let&apos;s Talk
            </button>

            {/* Mobile/Tablet Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-slate-400 hover:text-white transition-colors z-50"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile/Tablet Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-nav-overlay"
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            exit={{ y: -20 }}
            className="fixed inset-0 z-40 bg-slate-950/95 backdrop-blur-xl lg:hidden flex flex-col items-center justify-center p-8 overflow-y-auto"
          >
            <div className="flex flex-col items-center gap-8 w-full max-w-sm">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ x: -20 }}
                  animate={{ x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setIsOpen(false)}
                  className="text-4xl font-display font-black text-slate-300 hover:text-accent transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}

              <div className="flex items-center gap-8 pt-12 border-t border-slate-900 w-full justify-center">
                <a
                  href="https://github.com/Deadshot-45/"
                  target="_blank"
                  className="text-slate-400 hover:text-white"
                >
                  <Github className="w-8 h-8" />
                </a>
                <a
                  href="https://www.linkedin.com/in/mayank-sahu-ou"
                  target="_blank"
                  className="text-slate-400 hover:text-white"
                >
                  <Linkedin className="w-8 h-8" />
                </a>
              </div>

              <button
                onClick={() => {
                  setIsOpen(false);
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-full bg-accent text-slate-950 py-5 rounded-2xl font-black text-xl uppercase tracking-widest mt-8"
              >
                Let&apos;s Talk
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
