'use client';

import React, { useState, useEffect, useRef, ReactNode } from 'react';

interface InViewSectionProps {
  id?: string;
  minHeight?: string | number;
  rootMargin?: string;
  className?: string;
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * InViewSection renders its children on-demand when the section enters (or nears) the viewport.
 * Uses native IntersectionObserver with rootMargin pre-fetching and supports direct URL hash deep-links.
 */
export const InViewSection: React.FC<InViewSectionProps> = ({
  id,
  minHeight = '300px',
  rootMargin = '250px',
  className = '',
  children,
  fallback,
}) => {
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Fallback if IntersectionObserver is not supported or direct hash deep-link landing
    if (!('IntersectionObserver' in window) || (id && window.location.hash === `#${id}`)) {
      const timer = setTimeout(() => setIsInView(true), 0);
      return () => clearTimeout(timer);
    }

    const handleHash = () => {
      if (id && window.location.hash === `#${id}`) {
        setIsInView(true);
      }
    };
    window.addEventListener('hashchange', handleHash);

    const el = containerRef.current;
    if (!el) {
      window.removeEventListener('hashchange', handleHash);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
          window.removeEventListener('hashchange', handleHash);
        }
      },
      {
        rootMargin, // Pre-loads 250px ahead of viewport edge for smooth rendering without pop-in
        threshold: 0.01,
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      window.removeEventListener('hashchange', handleHash);
    };
  }, [id, rootMargin]);

  return (
    <div
      ref={containerRef}
      id={!isInView ? id : undefined}
      className={className}
      style={!isInView ? { minHeight } : undefined}
    >
      {isInView ? children : fallback || null}
    </div>
  );
};
