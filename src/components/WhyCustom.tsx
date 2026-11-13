'use client';

import React, { useState, useEffect } from 'react';
import { CLIENT_REVIEWS } from '../data/portfolioData';
import { ClientReview } from '../types/index';

interface WhyCustomProps {
  testimonials?: ClientReview[];
}

export const WhyCustom: React.FC<WhyCustomProps> = ({ testimonials = CLIENT_REVIEWS }) => {
  const reviewsList = testimonials && testimonials.length > 0 ? testimonials : CLIENT_REVIEWS;
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-advance reviews every 6.5s matching reference animation duration
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviewsList.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [reviewsList.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + reviewsList.length) % reviewsList.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % reviewsList.length);
  };

  const currentReview = reviewsList[currentIndex] || reviewsList[0];
  const countStr = `${String(currentIndex + 1).padStart(2, '0')}/${String(reviewsList.length).padStart(2, '0')}`;

  return (
    <section
      id="why"
      data-surface="white"
      data-why-frame="true"
      className="relative z-10 w-full min-h-[90svh] bg-white text-[#0f0f0f] px-[4vw] md:px-[var(--page-x)] py-16 md:py-24 flex flex-col justify-between overflow-hidden border-t border-[#0f0f0f]/10"
      aria-labelledby="why-title"
    >
      {/* 1. Header with Signature Triple Headline */}
      <header className="relative z-10 max-w-4xl">
        <h2
          id="why-title"
          className="font-grotesk text-[clamp(2.4rem,6vw,5.2rem)] font-light leading-[1.04] tracking-[-0.03em] text-[#0f0f0f] m-0"
        >
          <span className="block">
            Get Found. <br className="sm:hidden" />Get Chosen.
          </span>
          <span className="block">Get Bought.</span>
        </h2>
      </header>

      {/* 2. Middle Row: Interactive Client Review Spotlight */}
      <div className="relative z-10 my-12 flex flex-col md:flex-row md:items-end justify-between gap-12">
        
        {/* Left Column: Subtle Editorial Subhead */}
        <div className="max-w-md hidden md:block">
          <p className="font-grotesk text-[1.125rem] leading-[1.4] text-[#0f0f0f]/80 font-normal">
            No cookie-cutter templates. No bloated page builders. Just custom code designed to turn visitors into paying clients.
          </p>
        </div>

        {/* Right Column: Exact Review Spotlight matching ex.tsx */}
        <div className="w-full md:w-[min(28rem,34vw)] flex flex-col">
          <h3 className="font-mono text-[0.8rem] uppercase tracking-[0.1em] text-[#0f0f0f]/60 mb-2">
            What clients say
          </h3>

          {/* Progress fill bar */}
          <span className="block h-[1px] w-full bg-[#0f0f0f]/15 relative overflow-hidden" aria-hidden="true">
            <span
              key={currentIndex}
              className="absolute inset-0 bg-[#0f0f0f] origin-left animate-[review-fill_6500ms_linear_infinite]"
              style={{
                animation: 'review-fill 6500ms linear forwards',
              }}
            />
          </span>

          {/* Controls: Prev/Next & Counter */}
          <div className="flex items-center justify-between mt-3 font-mono text-xs">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous review"
                className="cursor-pointer text-[#0f0f0f] hover:opacity-50 transition-opacity p-1 -ml-1 text-base font-bold"
              >
                ←
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next review"
                className="cursor-pointer text-[#0f0f0f] hover:opacity-50 transition-opacity p-1 text-base font-bold"
              >
                →
              </button>
            </div>
            <span className="text-[#0f0f0f]/60 tracking-wider">{countStr}</span>
          </div>

          {/* Review Body */}
          <figure className="mt-5 min-h-[9.5rem] flex flex-col justify-between">
            <blockquote className="font-grotesk text-[clamp(1rem,1.4vw,1.25rem)] leading-[1.38] text-[#0f0f0f] font-normal italic">
              “{currentReview.quote}”
            </blockquote>

            <figcaption className="mt-4 flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-[#0f0f0f]">{currentReview.company}</span>
              <span className="text-[#0f0f0f]/60">
                <span className="text-[#0f0f0f] font-semibold">★ {currentReview.rating.toFixed(1)}</span> · {currentReview.serviceTag}
              </span>
            </figcaption>
          </figure>
        </div>

      </div>

      {/* 3. Bottom Copy statement */}
      <footer className="relative z-10 pt-8 border-t border-[#0f0f0f]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <p className="font-grotesk text-[clamp(0.95rem,1.2vw,1.1rem)] leading-[1.4] text-[#0f0f0f]/80 max-w-2xl m-0">
          Your website should bring you customers, not just sit there. I build sites that show up on Google, make people trust you, and turn visits into sales.
        </p>

        <span className="font-mono text-[11px] tracking-widest uppercase text-[#0f0f0f]/50 whitespace-nowrap">
          Handcrafted in Code
        </span>
      </footer>
    </section>
  );
};
