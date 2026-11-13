'use client';

import React from 'react';
import { CLIENT_MARKS } from '../data/portfolioData';
import { ClientMark } from '../types/index';
import { ArrowUpRight } from 'lucide-react';

interface ClientsSectionProps {
  onSelectService?: (serviceName: string) => void;
  clients?: ClientMark[];
}

export const ClientsSection: React.FC<ClientsSectionProps> = ({
  onSelectService,
  clients = CLIENT_MARKS,
}) => {
  const marksList = clients && clients.length > 0 ? clients : CLIENT_MARKS;
  const serviceOfferings = [
    {
      id: 'websites',
      title: 'Websites',
      tools: 'Business sites, booking, payments',
      desc: 'High-conversion Next.js applications tuned for speed and SEO authority.',
    },
    {
      id: 'threejs',
      title: '3D & animated sites',
      tools: 'Interactive 3D, scroll animation',
      desc: 'Memorable brand narratives built with Three.js WebGL and GSAP.',
    },
    {
      id: 'ecommerce',
      title: 'Online stores',
      tools: 'Shopify stores, product pages, checkout',
      desc: 'Friction-free purchasing, mobile slideout carts, and Stripe integration.',
    },
    {
      id: 'ai',
      title: 'AI assistants',
      tools: 'Chatbots, auto-replies, follow-ups',
      desc: 'Autonomous 24/7 lead qualification bots and intelligent customer care.',
    },
  ];

  return (
    <section
      id="clients"
      data-surface="dark"
      aria-labelledby="clients-title"
      className="relative z-10 w-full min-h-[100svh] bg-[#07070a] text-white px-[4vw] md:px-[var(--page-x)] py-20 md:py-28 border-t border-white/10 overflow-hidden"
    >
      {/* 1. Header Copy */}
      <header className="relative z-10 max-w-3xl mb-12">
        <h2
          id="clients-title"
          className="font-grotesk text-[clamp(2.5rem,7vw,5.5rem)] font-light leading-[1.02] tracking-[-0.035em] text-white m-0"
        >
          In good company.
        </h2>
        <p className="font-grotesk text-[clamp(1rem,1.3vw,1.25rem)] text-zinc-400 mt-4 leading-relaxed">
          Brands from Rome to Toronto who trusted me with how they look online, and how they sell.
        </p>
      </header>

      {/* 2. Client Ticker / Dual Marquee Row */}
      <div className="relative z-10 my-12 -mx-[4vw] md:-mx-[var(--page-x)] py-6 bg-white/[0.02] border-y border-white/10 overflow-hidden">
        <div className="flex gap-8 whitespace-nowrap animate-[marquee_28s_linear_infinite] hover:[animation-play-state:paused]">
          {[...marksList, ...marksList].map((mark, i) => (
            <div
              key={`${mark.name}-${i}`}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-white/5 border border-white/10"
            >
              <span className="font-grotesk font-semibold text-white text-base md:text-lg">
                {mark.name}
              </span>
              <span className="font-mono text-[11px] text-zinc-400">
                {mark.city}, {mark.country}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. "From Rome to Toronto" Transition Banner */}
      <div className="relative z-10 my-10 font-mono text-xs tracking-widest text-zinc-500 uppercase">
        <span>From Rome to Toronto</span>
      </div>

      {/* 4. "Things I do for you" 4-Card Capability Matrix */}
      <div id="services" className="relative z-10 mt-12">
        <h3 className="font-grotesk text-2xl md:text-4xl font-light text-white mb-8 tracking-tight">
          Things I do for you
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {serviceOfferings.map((svc) => (
            <div
              key={svc.id}
              onClick={() => onSelectService && onSelectService(svc.title)}
              className="group p-6 md:p-8 rounded-2xl border border-white/10 bg-zinc-950/60 hover:bg-zinc-900/60 hover:border-[#9bf35a]/50 transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h4 className="font-grotesk text-xl md:text-2xl font-bold text-white group-hover:text-[#9bf35a] transition-colors">
                    {svc.title}
                  </h4>
                  <p className="font-mono text-xs text-[#9bf35a] mt-1 font-semibold">
                    {svc.tools}
                  </p>
                </div>
                <div className="p-2 rounded-full bg-white/5 group-hover:bg-[#9bf35a] group-hover:text-black transition-all">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              <p className="font-grotesk text-sm text-zinc-400 leading-relaxed">
                {svc.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Closing Note */}
        <p className="mt-10 font-grotesk text-sm md:text-base text-zinc-400 max-w-3xl leading-relaxed">
          Pick one, or put a few together. Either way you work with me directly, from the first call to launch: I plan it with you, build every part myself and test it on real phones before it goes live. After launch I stay on to keep it fast, fix anything that breaks and build what you need next.
        </p>
      </div>
    </section>
  );
};
