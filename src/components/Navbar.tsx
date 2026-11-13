"use client";

import React, { useState, useEffect, useRef } from "react";
import { SkyMode } from "../types/index";
import { USER_PROFILE } from "../data/portfolioData";
import { ArrowUpRight } from "lucide-react";

interface NavbarProps {
  onOpenInquiry: () => void;
  skyMode: SkyMode;
  onSkyModeChange?: (mode: SkyMode) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenInquiry, skyMode }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [soundActive, setSoundActive] = useState(false);
  const [surfaceTone, setSurfaceTone] = useState<"hero" | "white" | "dark">(
    "hero",
  );
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  // Determine nav contrast cleanly against section directly beneath the header
  useEffect(() => {
    const updateSurfaceTone = () => {
      if (window.scrollY < window.innerHeight * 0.65) {
        setSurfaceTone("hero");
        return;
      }
      const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-surface]"));
      const probeY = 42;
      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= probeY && rect.bottom >= probeY) {
          const surface = section.getAttribute("data-surface");
          if (surface === "white" || surface === "day") {
            setSurfaceTone("white");
          } else {
            setSurfaceTone("dark");
          }
          return;
        }
      }
    };

    updateSurfaceTone();
    window.addEventListener("scroll", updateSurfaceTone, { passive: true });
    window.addEventListener("resize", updateSurfaceTone, { passive: true });
    return () => {
      window.removeEventListener("scroll", updateSurfaceTone);
      window.removeEventListener("resize", updateSurfaceTone);
    };
  }, []);

  // Close drawer on Escape key
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  // Clean up Web Audio on unmount
  useEffect(() => {
    return () => {
      try {
        oscRef.current?.stop();
        audioCtxRef.current?.close();
      } catch {
        // safe fallback
      }
    };
  }, []);

  const handleToggleSound = () => {
    const nextState = !soundActive;
    setSoundActive(nextState);

    if (typeof window === "undefined") return;
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (!AudioCtx) return;

      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        void ctx.resume();
      }

      if (nextState) {
        // Subtle gentle ambient chime + warm soft drone
        const chime = ctx.createOscillator();
        const chimeGain = ctx.createGain();
        chime.type = "sine";
        chime.frequency.setValueAtTime(523.25, ctx.currentTime);
        chime.frequency.exponentialRampToValueAtTime(
          659.25,
          ctx.currentTime + 0.14,
        );
        chimeGain.gain.setValueAtTime(0.025, ctx.currentTime);
        chimeGain.gain.exponentialRampToValueAtTime(
          0.0001,
          ctx.currentTime + 0.28,
        );
        chime.connect(chimeGain);
        chimeGain.connect(ctx.destination);
        chime.start();
        chime.stop(ctx.currentTime + 0.3);

        // Soft warm ambient bed at very low level
        const drone = ctx.createOscillator();
        const droneGain = ctx.createGain();
        drone.type = "sine";
        drone.frequency.setValueAtTime(110, ctx.currentTime);
        droneGain.gain.setValueAtTime(0.0001, ctx.currentTime);
        droneGain.gain.linearRampToValueAtTime(0.012, ctx.currentTime + 0.4);
        drone.connect(droneGain);
        droneGain.connect(ctx.destination);
        drone.start();
        oscRef.current = drone;
        gainRef.current = droneGain;
      } else {
        if (gainRef.current && audioCtxRef.current) {
          gainRef.current.gain.linearRampToValueAtTime(
            0.0001,
            ctx.currentTime + 0.2,
          );
        }
        const osc = oscRef.current;
        if (osc) {
          setTimeout(() => {
            try {
              osc.stop();
            } catch {
              // ignore if already stopped
            }
          }, 220);
          oscRef.current = null;
        }
      }
    } catch {
      // Audio unavailable safely ignored
    }
  };

  // Match reference: dark crisp ink over bright Day/Sunset top sky & white surfaces; crisp light ink on Night or dark sections
  const useDarkInk =
    surfaceTone === "white" || (surfaceTone === "hero" && skyMode !== "night");

  const inkColorClass = useDarkInk ? "text-[#121214]" : "text-[#fffaf3]";

  const navLinks = [
    { label: "Home", href: "#hero" },
    { label: "Why Custom", href: "#why" },
    { label: "Work", href: "#work" },
    { label: "Services", href: "#services" },
    { label: "Craft", href: "#craft" },
    { label: "Process", href: "#process" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <>
      {/* Screen Scrim when Menu Drawer is open */}
      <div
        data-surface="data-surface"
        aria-hidden="true"
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 z-40 bg-black/25 backdrop-blur-[2px] transition-opacity duration-500 ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Minimalist Transparent Fixed Editorial Header Bar */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 px-[18px] md:px-[30px] pt-[14px] md:pt-[18px] flex items-center justify-between pointer-events-none transition-colors duration-500 ${inkColorClass}`}
      >
        {/* Left: Bold Geometric Monogram Mark */}
        <a
          href="#hero"
          aria-label={`${USER_PROFILE.name} - Home`}
          className="pointer-events-auto flex items-center justify-center h-[42px] md:h-[48px] transition-transform duration-300 hover:scale-95 active:scale-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 rounded-full"
        >
          <svg
            viewBox="0 0 64 64"
            fill="currentColor"
            className="w-7 h-7 md:w-[34px] md:h-[34px]"
            role="img"
            aria-label="Mayank Monogram"
          >
            {/* Geometric sculpted 4-part 'M' mark */}
            <path d="M8 52V14C8 10 12 8 15 11L30 28V52C22 52 14 52 8 52Z" />
            <path
              d="M56 14V52C50 52 42 52 34 52V28L49 11C52 8 56 10 56 14Z"
              opacity="0.92"
            />
            <circle cx="32" cy="14" r="5.5" />
          </svg>
        </a>

        {/* Center: Clean Editorial Wordmark */}
        <a
          href="#hero"
          className={`pointer-events-auto absolute left-1/2 -translate-x-1/2 font-grotesk font-medium text-[1.05rem] md:text-[1.25rem] tracking-[-0.03em] leading-none transition-opacity duration-300 hover:opacity-70 ${
            menuOpen ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          {USER_PROFILE.name}
        </a>

        {/* Right: SOUND Equalizer + MENU Trigger */}
        <div className="pointer-events-auto flex items-center gap-4 md:gap-6">
          <button
            type="button"
            onClick={handleToggleSound}
            aria-label={soundActive ? "Sound off" : "Sound on"}
            aria-pressed={soundActive}
            className={`flex items-center gap-2 h-[42px] px-1 cursor-pointer transition-opacity duration-300 hover:opacity-70 ${
              soundActive ? "nav-eq-on opacity-100" : "opacity-80"
            } ${menuOpen ? "opacity-0 pointer-events-none" : ""}`}
          >
            <span className="hidden sm:inline font-mono text-[11px] font-semibold tracking-[0.1em] uppercase">
              Sound
            </span>
            <svg
              viewBox="0 0 20 16"
              fill="currentColor"
              className="w-[18px] h-[14px] overflow-visible"
              aria-hidden="true"
            >
              <rect
                className="nav-eq-bar"
                x="1"
                y="0"
                width="2.6"
                height="16"
                rx="1.3"
                style={{
                  transform: soundActive ? undefined : "scaleY(0.55)",
                  animationDelay: "0s",
                }}
              />
              <rect
                className="nav-eq-bar"
                x="6"
                y="0"
                width="2.6"
                height="16"
                rx="1.3"
                style={{
                  transform: soundActive ? undefined : "scaleY(0.9)",
                  animationDelay: "-0.37s",
                }}
              />
              <rect
                className="nav-eq-bar"
                x="11"
                y="0"
                width="2.6"
                height="16"
                rx="1.3"
                style={{
                  transform: soundActive ? undefined : "scaleY(0.45)",
                  animationDelay: "-0.74s",
                }}
              />
              <rect
                className="nav-eq-bar"
                x="16"
                y="0"
                width="2.6"
                height="16"
                rx="1.3"
                style={{
                  transform: soundActive ? undefined : "scaleY(0.75)",
                  animationDelay: "-1.11s",
                }}
              />
            </svg>
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="site-menu"
            className={`px-2.5 font-grotesk font-semibold text-[0.95rem] md:text-[1.05rem] tracking-[-0.01em] uppercase cursor-pointer transition-all duration-200 hover:opacity-80 ${
              menuOpen
                ? "h-[36px] rounded-sm bg-white text-[#111111] shadow-md"
                : useDarkInk
                ? "h-[42px] [text-shadow:0_1px_12px_rgba(255,255,255,0.45)]"
                : "h-[42px]"
            }`}
          >
            {menuOpen ? "CLOSE" : "MENU"}
          </button>
        </div>
      </header>

      {/* Slide-Down Editorial Navigation Drawer (#site-menu) */}
      <nav
        id="site-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        aria-hidden={!menuOpen}
        className={`fixed top-[62px] md:top-[76px] right-[18px] md:right-[30px] z-50 w-[calc(100vw-36px)] max-w-[23rem] rounded-sm p-6 md:p-7 shadow-[0_24px_60px_rgba(0,0,0,0.28)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          useDarkInk
            ? "bg-white text-[#111111] border border-black/10"
            : "bg-[#0f0f12] text-[#fffaf3] border border-white/15"
        } ${
          menuOpen
            ? "opacity-100 translate-y-0 pointer-events-auto visible"
            : "opacity-0 -translate-y-4 pointer-events-none invisible"
        }`}
      >
        <div className="flex items-center justify-between pb-4 mb-2 border-b border-current/15">
          <span className="font-grotesk font-medium text-sm tracking-tight">
            {USER_PROFILE.name}
          </span>
          <button
            type="button"
            onClick={() => {
              setMenuOpen(false);
              onOpenInquiry();
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-[#9bf35a] text-[#0f0f0f] font-grotesk font-semibold text-xs hover:bg-[#aefb6f] transition-colors cursor-pointer"
          >
            <span>Say Hi</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <ul className="flex flex-col list-none p-0 m-0 divide-y divide-current/15">
          {navLinks.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="group flex items-center justify-between py-2.5 font-grotesk text-[1.25rem] md:text-[1.45rem] font-normal uppercase tracking-[-0.02em] transition-transform duration-300 hover:translate-x-2"
              >
                <span>{item.label}</span>
                <span className="font-mono text-xs opacity-40 group-hover:opacity-100 transition-opacity">
                  ↗
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-5 pt-4 border-t border-current/15 flex flex-col gap-2 font-mono text-xs">
          <a
            href={`mailto:${USER_PROFILE.email}`}
            className="hover:underline w-fit font-medium"
          >
            {USER_PROFILE.email}
          </a>
          <div className="flex items-center gap-4 opacity-70">
            <a
              href={USER_PROFILE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-100 transition-opacity"
            >
              LinkedIn
            </a>
            <a
              href={USER_PROFILE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-100 transition-opacity"
            >
              GitHub
            </a>
          </div>
        </div>
      </nav>
    </>
  );
};
