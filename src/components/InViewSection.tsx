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
  const [isInView, setIsInView] = useState(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      return true;
    }
    if (id && typeof window !== 'undefined' && window.location.hash === `#${id}`) {
      return true;
    }
    return false;
  });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isInView) return;
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      return;
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
