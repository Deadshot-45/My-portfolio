'use client';

import React from 'react';
import { SkyMode } from '../types/index';

interface SkyDialProps {
  mode: SkyMode;
  onChange: (mode: SkyMode) => void;
  className?: string;
}

export const SkyDial: React.FC<SkyDialProps> = ({ mode, onChange, className = '' }) => {
  const isNight = mode === 'night';

  const getPipLeft = () => {
    switch (mode) {
      case 'day':
        return '16.6667%';
      case 'sunset':
        return '50%';
      case 'night':
        return '83.3333%';
      default:
        return '50%';
    }
  };

  const inkClass = isNight ? 'text-[#fffaf3]' : 'text-[#141414]';

  return (
    <div
      data-sky-dial="true"
      className={`inline-flex flex-col items-center gap-2 md:gap-2.5 ${inkClass} transition-colors duration-700 ${className}`}
    >
      <div className="flex items-center gap-1.5 md:gap-2">
        {/* Day Button */}
        <button
          type="button"
          onClick={() => onChange('day')}
          aria-label="Day sky"
          title="Day"
          aria-pressed={mode === 'day'}
          className={`flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:h-9 md:w-9 cursor-pointer ${
            mode === 'day'
              ? 'border-current/60 opacity-100 scale-100'
              : 'border-transparent opacity-45 hover:border-current/30 hover:opacity-80'
          }`}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-[15px] w-[15px]"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="4.2" />
            <path d="M12 2.6v2.2M12 19.2v2.2M4.5 4.5l1.6 1.6M17.9 17.9l1.6 1.6M2.6 12h2.2M19.2 12h2.2M4.5 19.5l1.6-1.6M17.9 6.1l1.6-1.6" />
          </svg>
        </button>

        {/* Sunset Button */}
        <button
          type="button"
          onClick={() => onChange('sunset')}
          aria-label="Sunset sky"
          title="Sunset"
          aria-pressed={mode === 'sunset'}
          className={`flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:h-9 md:w-9 cursor-pointer ${
            mode === 'sunset'
              ? 'border-current/60 opacity-100 scale-100'
              : 'border-transparent opacity-45 hover:border-current/30 hover:opacity-80'
          }`}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-[15px] w-[15px]"
            aria-hidden="true"
          >
            <path d="M3 18.5h18" />
            <path d="M8 18.5a4 4 0 0 1 8 0" />
            <path d="M12 4.2v2M6.3 7.3l1.4 1.4M16.3 8.7l1.4-1.4M3.6 13h2M18.4 13h2" />
          </svg>
        </button>

        {/* Night Button */}
        <button
          type="button"
          onClick={() => onChange('night')}
          aria-label="Night sky"
          title="Night"
          aria-pressed={mode === 'night'}
          className={`flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:h-9 md:w-9 cursor-pointer ${
            mode === 'night'
              ? 'border-current/60 opacity-100 scale-100'
              : 'border-transparent opacity-45 hover:border-current/30 hover:opacity-80'
          }`}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-[15px] w-[15px]"
            aria-hidden="true"
          >
            <path d="M20 14.2A8.4 8.4 0 0 1 9.8 4 8.4 8.4 0 1 0 20 14.2Z" />
          </svg>
        </button>
      </div>

      {/* Horizontal Hairline Track with Aligned Ticks & Dot */}
      <div className="relative h-[2px] w-full rounded-full bg-current/25">
        <span
          className="absolute top-1/2 h-[7px] w-[1px] -translate-x-1/2 -translate-y-1/2 bg-current/35"
          style={{ left: '16.6667%' }}
          aria-hidden="true"
        />
        <span
          className="absolute top-1/2 h-[7px] w-[1px] -translate-x-1/2 -translate-y-1/2 bg-current/35"
          style={{ left: '50%' }}
          aria-hidden="true"
        />
        <span
          className="absolute top-1/2 h-[7px] w-[1px] -translate-x-1/2 -translate-y-1/2 bg-current/35"
          style={{ left: '83.3333%' }}
          aria-hidden="true"
        />
        <span
          className="absolute top-1/2 h-[7px] w-[7px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-current transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{
            left: getPipLeft(),
            boxShadow: isNight
              ? '0 0 10px 2px rgba(255,250,243,0.55)'
              : '0 0 8px 1px rgba(20,20,20,0.2)',
          }}
          aria-hidden="true"
        />
      </div>
    </div>
  );
};
