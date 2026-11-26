'use client';

import React, { useRef, useState, useEffect, useMemo } from 'react';
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import { WORK_EXPERIENCE, KEY_METRICS } from '../data/portfolioData';
import { ThemeMode, ExperienceItem } from '../types/index';
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  GraduationCap, 
  TrendingUp, 
  Zap, 
  BookOpen,
  ArrowUpRight
} from 'lucide-react';

interface ExperienceSectionProps {
  theme?: ThemeMode;
  experiences?: ExperienceItem[];
}

type TimelineCategory = 'all' | 'experience' | 'education' | 'certification';

interface TimelineRecord {
  id: string;
  category: 'experience' | 'education' | 'certification';
  categoryLabel: string;
  year: string;
  period: string;
  title: string;
  subtitle: string;
  location: string;
  description: string;
  highlights: string[];
  technologies: string[];
  badgeColor: string;
}

const STATIC_EDUCATION_CERTIFICATIONS: TimelineRecord[] = [
  {
    id: 'cert-jspider',
    category: 'certification',
    categoryLabel: 'Professional Certification',
    year: '2025',
    period: '2024 – 2025',
    title: 'MERN Full-Stack Certification',
    subtitle: 'J-Spider Development Center',
    location: 'Bangalore / Remote',
    description: '6-Month rigorous software development certification covering enterprise React architectures, Node.js microservices, distributed token security, and database normalization.',
    highlights: [
      'Production React 19 component patterns, state management, and memory leak prevention',
      'Scalable RESTful & WebSocket API development with Express and MongoDB',
      'System architecture, JWT / session security boundaries, and CI/CD automation',
    ],
    technologies: ['React.js', 'Node.js', 'Express', 'MongoDB', 'REST APIs', 'WebSockets', 'System Design'],
    badgeColor: '#f59e0b',
  },
  {
    id: 'edu-mca',
    category: 'education',
    categoryLabel: 'Postgraduate Degree',
    year: '2024',
    period: '2022 – 2024',
    title: 'Master in Computer Applications (MCA)',
    subtitle: 'Oriental University',
    location: 'Indore, MP, India',
    description: 'Advanced postgraduate degree specializing in computational algorithms, high-throughput database systems, distributed networks, and modern software engineering paradigms.',
    highlights: [
      'Advanced Data Structures & Algorithms, Computational Complexity, and Graph Theory',
      'Relational Database Management Systems (DBMS), Query Optimization, and Indexing',
      'Object-Oriented Software Engineering and Enterprise System Architecture',
    ],
    technologies: ['Algorithms & Data Structures', 'DBMS & SQL', 'Distributed Systems', 'Software Engineering'],
    badgeColor: '#38bdf8',
  },
  {
    id: 'edu-ba',
    category: 'education',
    categoryLabel: 'Undergraduate Degree',
    year: '2022',
    period: '2019 – 2022',
    title: 'BA in Economics & Mathematics',
    subtitle: 'Delhi University (Zakir Husain)',
    location: 'New Delhi, India',
    description: 'Rigorous foundation in mathematical reasoning, quantitative modeling, statistical analysis, and algorithmic problem decomposition applied to digital economics.',
    highlights: [
      'Quantitative modeling, multivariate calculus, and statistical hypothesis testing',
      'Mathematical logic, analytical problem solving, and computational simulations',
    ],
    technologies: ['Quantitative Modeling', 'Statistical Analysis', 'Mathematical Logic', 'Analytical Systems'],
    badgeColor: '#a855f7',
  },
];

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  theme = 'dark',
  experiences: initialExperiences,
}) => {
  const isDark = theme === 'dark';
  const shouldReduceMotion = useReducedMotion();
  const [filter, setFilter] = useState<TimelineCategory>('all');

  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState(0);

  // Fetched CMS experiences when not provided via props
  const [fetchedExperiences, setFetchedExperiences] = useState<ExperienceItem[] | null>(null);

  // Derive active experiences during render (avoids mirroring props into state & cascading renders)
  const activeExperiences = useMemo(() => {
    if (initialExperiences && initialExperiences.length > 0) {
      return initialExperiences;
    }
    if (fetchedExperiences && fetchedExperiences.length > 0) {
      return fetchedExperiences;
    }
    return WORK_EXPERIENCE;
  }, [initialExperiences, fetchedExperiences]);

  // Auto-fetch latest CMS data from /api/portfolio only if not supplied via props
  useEffect(() => {
    if (initialExperiences && initialExperiences.length > 0) {
      return;
    }

    let isMounted = true;
    fetch('/api/portfolio')
      .then((res) => (res.ok ? res.json() : null))
      .then((json) => {
        if (isMounted && json?.success && json?.data?.experiences?.length > 0) {
          setFetchedExperiences(json.data.experiences);
        }
      })
      .catch((err) => {
        console.warn('[ExperienceSection] Fallback to default experience data:', err);
      });

    return () => {
      isMounted = false;
    };
  }, [initialExperiences]);

  // Combine live API work experience with education and certifications into unified timeline
  const allRecords: TimelineRecord[] = useMemo(() => {
    const rawWork = activeExperiences.length > 0 ? activeExperiences : WORK_EXPERIENCE;
    
    const workRecords: TimelineRecord[] = rawWork.map((item, idx) => {
      const yearMatch = item.period.match(/\b(20\d{2})\b/);
      const year = yearMatch ? yearMatch[1] : (idx === 0 ? '2024' : '2023');

      return {
        id: item.id || `exp-${idx}`,
        category: 'experience',
        categoryLabel: idx === 0 ? 'Active Commercial Role' : 'Enterprise Infrastructure',
        year,
        period: item.period,
        title: item.role,
        subtitle: item.company,
        location: item.location,
        description: item.summary || item.description,
        highlights: item.highlights || item.achievements || [],
        technologies: item.technologies || [],
        badgeColor: '#9bf35a',
      };
    });

    return [...workRecords, ...STATIC_EDUCATION_CERTIFICATIONS];
  }, [activeExperiences]);

  // Filtered records based on active pill
  const visibleRecords = useMemo(() => {
    if (filter === 'all') return allRecords;
    return allRecords.filter((r) => r.category === filter);
  }, [allRecords, filter]);

  // Measure timeline container height for stretching line calculation
  useEffect(() => {
    const updateHeight = () => {
      if (timelineRef.current) {
        setContainerHeight(timelineRef.current.getBoundingClientRect().height);
      }
    };

    updateHeight();
    const timer = setTimeout(updateHeight, 250);
    window.addEventListener('resize', updateHeight);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateHeight);
    };
  }, [visibleRecords, filter]);

  // Scroll tracking to stretch the vertical timeline line
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 25%', 'end 80%'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001,
  });

  const heightTransform = useTransform(smoothProgress, [0, 1], [0, containerHeight]);
  const opacityTransform = useTransform(smoothProgress, [0, 0.05], [0, 1]);

  return (
    <section 
      ref={containerRef}
      id="experience" 
      data-surface="dark" 
      className="py-28 md:py-36 relative overflow-hidden bg-[#07070a] text-white border-t border-white/10"
    >
      {/* Background Architectural Grid Pattern */}
      <div 
        aria-hidden="true" 
        className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_50%_at_50%_35%,#000_60%,transparent_100%)]"
      />

      {/* Layered Subtle Accent Glow */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute top-12 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-[#9bf35a]/5 rounded-full blur-[160px]" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header: Matching Home Page Editorial Aesthetic */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#9bf35a] animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-zinc-300">
              03 // Track Record & Career Journey
            </span>
          </div>

          <h2 className="font-grotesk text-[clamp(2.2rem,5vw,4.5rem)] font-light leading-[1.05] tracking-[-0.03em] text-white mb-4">
            Experience & Credentials.
          </h2>

          <p className="font-grotesk text-base sm:text-lg text-zinc-400 max-w-2xl leading-relaxed mb-8">
            Production engineering across fintech architectures and enterprise infrastructure, 
            backed by rigorous academic foundations and software certifications.
          </p>

          {/* Home Page Matching Filter Pill Buttons */}
          <div className="inline-flex flex-wrap items-center justify-center gap-1.5 p-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all duration-200 ${
                filter === 'all'
                  ? 'bg-[#9bf35a] text-black font-bold shadow-[0_0_15px_rgba(155,243,90,0.35)]'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              All Milestones ({allRecords.length})
            </button>
            <button
              type="button"
              onClick={() => setFilter('experience')}
              className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all duration-200 ${
                filter === 'experience'
                  ? 'bg-[#9bf35a] text-black font-bold shadow-[0_0_15px_rgba(155,243,90,0.35)]'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Work Experience ({allRecords.filter(r => r.category === 'experience').length})
            </button>
            <button
              type="button"
              onClick={() => setFilter('education')}
              className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all duration-200 ${
                filter === 'education'
                  ? 'bg-[#9bf35a] text-black font-bold shadow-[0_0_15px_rgba(155,243,90,0.35)]'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Education ({allRecords.filter(r => r.category === 'education').length})
            </button>
            <button
              type="button"
              onClick={() => setFilter('certification')}
              className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all duration-200 ${
                filter === 'certification'
                  ? 'bg-[#9bf35a] text-black font-bold shadow-[0_0_15px_rgba(155,243,90,0.35)]'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Certifications ({allRecords.filter(r => r.category === 'certification').length})
            </button>
          </div>
        </div>

        {/* Quantified Impact Metrics Ribbon */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-24">
          {KEY_METRICS.map((metric, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#0e0f12] border border-white/10 hover:border-white/20 transition-all duration-300 group shadow-lg"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-3xl font-bold tracking-tight text-[#9bf35a]">
                  {metric.value}
                </span>
                <span className="p-2 rounded-xl bg-[#9bf35a]/10 text-[#9bf35a]">
                  <TrendingUp className="w-4 h-4" />
                </span>
              </div>
              <h3 className="text-sm font-semibold text-white mb-1">
                {metric.label}
              </h3>
              <p className="text-xs leading-relaxed text-zinc-400">
                {metric.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Timeline Center Stretching Spine Container */}
        <div ref={timelineRef} className="relative pb-24">
          
          {/* Vertical Stretching Line (Center on md+, Left on mobile) */}
          <div
            style={{ height: `${containerHeight || 1000}px` }}
            className="absolute left-6 md:left-1/2 top-4 -translate-x-1/2 overflow-hidden w-[2px] bg-white/10 pointer-events-none"
          >
            {/* Stretching Line Reveal Beam with Home Page Acid Green Accent */}
            <motion.div
              style={{
                height: shouldReduceMotion ? containerHeight : heightTransform,
                opacity: shouldReduceMotion ? 1 : opacityTransform,
              }}
              className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-b from-[#9bf35a] via-[#38bdf8] to-[#9bf35a] shadow-[0_0_14px_rgba(155,243,90,0.85)]"
            />
          </div>

          {/* Traveling Radiant Spark at the Tip of the Stretching Line */}
          {!shouldReduceMotion && (
            <motion.div
              style={{
                top: heightTransform,
                opacity: opacityTransform,
              }}
              className="absolute left-6 md:left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-30 flex items-center justify-center w-6 h-6"
            >
              <div className="w-3.5 h-3.5 rounded-full bg-[#9bf35a] shadow-[0_0_16px_#9bf35a] animate-pulse" />
              <div className="w-1.5 h-1.5 rounded-full bg-white absolute" />
            </motion.div>
          )}

          {/* Alternating Milestone Items */}
          <div className="space-y-24 sm:space-y-36">
            {visibleRecords.map((item, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={item.id}
                  className="relative flex flex-col md:flex-row items-center w-full"
                >
                  {/* Center Ring Node on the Stretching Line */}
                  <div 
                    aria-hidden="true" 
                    className="absolute left-6 md:left-1/2 top-10 -translate-x-1/2 z-20 flex items-center justify-center w-5 h-5 rounded-full border-2 border-[#9bf35a] bg-[#07070a] shadow-[0_0_10px_rgba(155,243,90,0.6)]"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[#9bf35a]" />
                  </div>

                  {/* Left Column (Desktop) */}
                  <div className="w-full md:w-1/2 md:pr-16 pl-14 md:pl-0 flex flex-col items-start md:items-end text-left">
                    {isEven ? (
                      /* Redesigned Floating Craft Card on Left (Consistent Left-Aligned Typography) */
                      <motion.div
                        initial={{ opacity: 0, x: shouldReduceMotion ? 0 : -35 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full max-w-xl p-6 sm:p-8 rounded-2xl bg-[#0e0f12] border border-white/10 hover:border-white/20 hover:border-[#9bf35a]/40 shadow-2xl transition-all duration-300 text-left group"
                      >
                        {/* Browser-like Header Pill Bar */}
                        <div className="flex flex-wrap items-center justify-between gap-2.5 pb-4 mb-4 border-b border-white/10">
                          <div className="flex items-center gap-2">
                            <span 
                              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-semibold border"
                              style={{ 
                                color: item.badgeColor, 
                                borderColor: `${item.badgeColor}40`,
                                backgroundColor: `${item.badgeColor}15`
                              }}
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                              <span>{item.categoryLabel}</span>
                            </span>
                          </div>

                          <span className="flex items-center gap-1.5 text-xs font-mono text-zinc-400 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                            <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                            {item.period}
                          </span>
                        </div>

                        {/* Title & Organization */}
                        <h4 className="font-grotesk text-2xl sm:text-3xl font-normal tracking-tight text-white mb-2">
                          {item.title}
                        </h4>
                        
                        <div className="flex items-center gap-2 text-xs font-mono font-medium mb-5 text-[#9bf35a]">
                          <span>{item.subtitle}</span>
                          <span className="text-zinc-600">•</span>
                          <span className="flex items-center gap-1 text-zinc-400">
                            <MapPin className="w-3 h-3" />
                            {item.location}
                          </span>
                        </div>

                        {/* Role Description */}
                        <p className="text-sm leading-relaxed text-zinc-300 mb-6">
                          {item.description}
                        </p>

                        {/* Structured Deliverables Micro-Tiles */}
                        {item.highlights && item.highlights.length > 0 && (
                          <div className="space-y-2.5 mb-6">
                            {item.highlights.map((h, hIdx) => (
                              <div 
                                key={hIdx} 
                                className="flex items-start gap-3 p-3.5 rounded-xl bg-black/40 border border-white/5 text-xs sm:text-sm text-zinc-300 leading-relaxed hover:border-white/15 transition-colors"
                              >
                                <CheckCircle2 className="w-4 h-4 text-[#9bf35a] shrink-0 mt-0.5" />
                                <span>{h}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Technology Stack Pills */}
                        {item.technologies && item.technologies.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/10">
                            {item.technologies.map((t) => (
                              <span 
                                key={t} 
                                className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-white/5 text-zinc-300 border border-white/10 hover:border-[#9bf35a]/50 transition-colors"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    ) : (
                      /* Ghost Year on Left */
                      <div className="hidden md:flex flex-col items-end">
                        <span className="font-grotesk text-6xl lg:text-8xl font-black text-white/[0.07] tracking-tighter select-none">
                          {item.year}
                        </span>
                        <span className="text-xs font-mono text-zinc-500 tracking-wider uppercase mt-1">
                          {item.period}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Right Column (Desktop) */}
                  <div className="w-full md:w-1/2 md:pl-16 pl-14 md:pl-0 mt-4 md:mt-0 flex flex-col items-start text-left">
                    {!isEven ? (
                      /* Redesigned Floating Craft Card on Right (Consistent Left-Aligned Typography) */
                      <motion.div
                        initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 35 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full max-w-xl p-6 sm:p-8 rounded-2xl bg-[#0e0f12] border border-white/10 hover:border-white/20 hover:border-[#9bf35a]/40 shadow-2xl transition-all duration-300 text-left group"
                      >
                        {/* Browser-like Header Pill Bar */}
                        <div className="flex flex-wrap items-center justify-between gap-2.5 pb-4 mb-4 border-b border-white/10">
                          <div className="flex items-center gap-2">
                            <span 
                              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-semibold border"
                              style={{ 
                                color: item.badgeColor, 
                                borderColor: `${item.badgeColor}40`,
                                backgroundColor: `${item.badgeColor}15`
                              }}
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                              <span>{item.categoryLabel}</span>
                            </span>
                          </div>

                          <span className="flex items-center gap-1.5 text-xs font-mono text-zinc-400 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                            <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                            {item.period}
                          </span>
                        </div>

                        {/* Title & Organization */}
                        <h4 className="font-grotesk text-2xl sm:text-3xl font-normal tracking-tight text-white mb-2">
                          {item.title}
                        </h4>
                        
                        <div className="flex items-center gap-2 text-xs font-mono font-medium mb-5 text-[#9bf35a]">
                          <span>{item.subtitle}</span>
                          <span className="text-zinc-600">•</span>
                          <span className="flex items-center gap-1 text-zinc-400">
                            <MapPin className="w-3 h-3" />
                            {item.location}
                          </span>
                        </div>

                        {/* Role Description */}
                        <p className="text-sm leading-relaxed text-zinc-300 mb-6">
                          {item.description}
                        </p>

                        {/* Structured Deliverables Micro-Tiles */}
                        {item.highlights && item.highlights.length > 0 && (
                          <div className="space-y-2.5 mb-6">
                            {item.highlights.map((h, hIdx) => (
                              <div 
                                key={hIdx} 
                                className="flex items-start gap-3 p-3.5 rounded-xl bg-black/40 border border-white/5 text-xs sm:text-sm text-zinc-300 leading-relaxed hover:border-white/15 transition-colors"
                              >
                                <CheckCircle2 className="w-4 h-4 text-[#9bf35a] shrink-0 mt-0.5" />
                                <span>{h}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Technology Stack Pills */}
                        {item.technologies && item.technologies.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/10">
                            {item.technologies.map((t) => (
                              <span 
                                key={t} 
                                className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-white/5 text-zinc-300 border border-white/10 hover:border-[#9bf35a]/50 transition-colors"
                              >
                                {t}
                              </span>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    ) : (
                      /* Ghost Year on Right */
                      <div className="hidden md:flex flex-col items-start">
                        <span className="font-grotesk text-6xl lg:text-8xl font-black text-white/[0.07] tracking-tighter select-none">
                          {item.year}
                        </span>
                        <span className="text-xs font-mono text-zinc-500 tracking-wider uppercase mt-1">
                          {item.period}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
