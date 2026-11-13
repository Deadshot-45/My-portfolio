'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Hero3DCanvas } from './Hero3DCanvas';
import { SkyDial } from './SkyDial';
import { SkyMode } from '../types/index';
import { USER_PROFILE } from '../data/portfolioData';
import { UserProfile } from '../types/index';
import { getSkySceneConfig } from '../utils/portfolioUtils';

interface HeroProps {
  onOpenInquiry?: () => void;
  skyMode?: SkyMode;
  onSkyModeChange?: (mode: SkyMode) => void;
  profile?: UserProfile;
}

export const Hero: React.FC<HeroProps> = ({
  skyMode = 'sunset',
  onSkyModeChange,
  profile = USER_PROFILE,
}) => {
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const activeProfile = profile || USER_PROFILE;
  const firstName = activeProfile.name.split(' ')[0];
  const sceneConfig = getSkySceneConfig(skyMode);

  // Subtle pointer depth parallax on fine-pointer desktop screens (respecting reduced-motion)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    if (reduced || !finePointer) return;

    const handleMouseMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * -14;
      const ny = (e.clientY / window.innerHeight - 0.5) * -10;
      setParallax({ x: nx, y: ny });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleModeChange = (newMode: SkyMode) => {
    if (onSkyModeChange) {
      onSkyModeChange(newMode);
    }
  };

  const inkClass = sceneConfig.isDarkText ? 'hero-ink-dark' : 'hero-ink-light';

  return (
    <section
      id="hero"
      data-surface={skyMode}
      className="relative z-10 w-full h-[100svh] min-h-[600px] overflow-hidden select-none bg-[#181924]"
    >
      {/* 1. Sculptural Creation-of-Adam & Developer Artwork Layer with Pointer Depth */}
      <div
        className="absolute inset-0 z-[1] transition-transform duration-700 ease-out will-change-transform"
        style={{
          transform: `translate3d(${parallax.x}px, ${parallax.y}px, 0) scale(1.035)`,
        }}
      >
        <Image
          src="/images/hero-sunset.jpg"
          alt="Stylized 3D artwork of Mayank coding on a laptop atop a moss-covered stone hand reaching toward another hand in the sky"
          fill
          priority
          unoptimized
          sizes="100vw"
          className="object-cover object-[38%_54%] md:object-center transition-[filter] duration-1000 ease-out"
          style={{
            filter: sceneConfig.imageFilter,
          }}
        />
      </div>

      {/* 2. Sky-Mode Atmospheric Blend & Corner Readability Scrims */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[2] transition-opacity duration-1000"
        style={{ background: sceneConfig.atmosphereOverlay }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[3] hidden md:block transition-opacity duration-1000"
        style={{ background: sceneConfig.introScrimBackground }}
      />

      {/* 3. Ambient Three.js Sky Particles / Night Starfield Layer */}
      <Hero3DCanvas skyMode={skyMode} />

      {/* 4. Top-Center Display Headline */}
      <div
        className={`absolute inset-x-0 top-[14svh] md:top-[9svh] z-10 flex flex-col items-center px-[4vw] md:px-[6vw] text-center pointer-events-none transition-colors duration-700 ${inkClass}`}
      >
        <h1 className="font-grotesk font-normal text-[clamp(2.2rem,5.4vw,4.9rem)] leading-[1.03] tracking-[-0.03em] capitalize max-w-[16em] m-0">
          Websites That Sell.
          <br />
          AI That Never Sleeps.
        </h1>
      </div>

      {/* 5. Curved SVG Arrow Annotation ("That's me, on my third coffee.") */}
      <div
        className={`pointer-events-none absolute left-[44%] top-[78%] sm:left-[45%] sm:top-[71%] md:left-[44.5%] md:top-[69%] z-10 flex items-center gap-2 transition-colors duration-700 ${inkClass}`}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 46 38"
          fill="none"
          className="w-8 h-7 md:w-11 md:h-9 shrink-0 -mt-5 opacity-90"
        >
          <path
            d="M42 32C24 31 12 22 9 5"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
          />
          <path
            d="M4 11L9 4.5L15 9.5"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <p className="font-grotesk text-[12px] md:text-[14px] font-normal leading-[1.28] tracking-[-0.01em] whitespace-nowrap m-0">
          That’s me,
          <br />
          on my third coffee.
        </p>
      </div>

      {/* 6. Bottom-Center Interactive SkyDial (Day / Sunset / Night) */}
      <div className="pointer-events-auto absolute bottom-6 left-1/2 -translate-x-1/2 md:bottom-8 z-30">
        <SkyDial mode={skyMode} onChange={handleModeChange} />
      </div>

      {/* 7. Bottom-Right Intro Paragraph (Desktop / Tablet Landscape) */}
      <div
        className={`pointer-events-none absolute bottom-8 right-[4vw] z-10 hidden max-w-[23.5em] text-right md:block transition-colors duration-700 ${inkClass}`}
      >
        <p className="font-grotesk text-[14px] md:text-[15px] font-medium leading-[1.38] tracking-[-0.01em] text-pretty m-0">
          I’m {firstName}, a web developer. I design and build your website, your online store, and the AI tools that do the busywork for you, so more people find you, trust you and buy from you.
        </p>
      </div>
    </section>
  );
};
