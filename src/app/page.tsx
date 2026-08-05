"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { getAssetUrl } from "@/data/site";
import initialSiteData from "@/data/site-data.json";
import { Award, BookOpen, GraduationCap } from "lucide-react";

export default function Home() {
  const [siteData, setSiteData] = useState(initialSiteData);
  const [activeTab, setActiveTab] = useState<"beginning" | "logs" | "achievements" | "creations" | "socials">("beginning");
  const [localTime, setLocalTime] = useState("");
  const [soundOn, setSoundOn] = useState(true);
  const [musicOn, setMusicOn] = useState(false);

  // Contact Form States
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [sendSuccess, setSendSuccess] = useState(false);

  // Fetch updated content on mount in development/local
  useEffect(() => {
    fetch("/api/content")
      .then((res) => res.json())
      .then((data) => {
        if (data && !data.error) {
          setSiteData(data);
        }
      })
      .catch(() => {
        // Fallback to imported JSON
      });
  }, []);

  // Digital clock update
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setLocalTime(now.toLocaleTimeString("en-US", { hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Web Audio synth effect
  const playBeep = (freq = 800, duration = 0.05, type = "sine") => {
    if (!soundOn || typeof window === "undefined") return;
    try {
      const AudioCtx = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type as OscillatorType;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.012, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // AudioContext blocked
    }
  };

  // Play background low-fi ambient synth drone if music toggled
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (musicOn) {
      try {
        const AudioCtx = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gainNode = ctx.createGain();
        osc1.frequency.setValueAtTime(110, ctx.currentTime); // low A
        osc2.frequency.setValueAtTime(165, ctx.currentTime); // low E
        osc1.type = "sawtooth";
        osc2.type = "sine";
        gainNode.gain.setValueAtTime(0.008, ctx.currentTime);
        
        osc1.connect(gainNode);
        osc2.connect(gainNode);
        gainNode.connect(ctx.destination);
        osc1.start();
        osc2.start();
        
        return () => {
          osc1.stop();
          osc2.stop();
        };
      } catch {
        // ignore
      }
    }
  }, [musicOn]);

  const handleTabChange = (tab: typeof activeTab) => {
    playBeep(900, 0.08, "triangle");
    setActiveTab(tab);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) {
      playBeep(300, 0.2, "sawtooth");
      return;
    }
    playBeep(1200, 0.15, "sine");
    setTimeout(() => {
      playBeep(1500, 0.2, "sine");
    }, 150);
    setSendSuccess(true);
    setTimeout(() => {
      setContactName("");
      setContactEmail("");
      setContactMessage("");
      setSendSuccess(false);
    }, 3000);
  };

  const handleFormDiscard = () => {
    playBeep(400, 0.15, "triangle");
    setContactName("");
    setContactEmail("");
    setContactMessage("");
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "GraduationCap":
        return <GraduationCap className="w-5 h-5 text-accent" />;
      case "BookOpen":
        return <BookOpen className="w-5 h-5 text-accent" />;
      default:
        return <Award className="w-5 h-5 text-accent" />;
    }
  };

  // Calculations for achievements completed vs total
  const completedAchievements = siteData.achievements.filter(a => a.status === "COMPLETED").length;
  const totalAchievements = siteData.achievements.length;
  const dashOffset = 377 * (1 - completedAchievements / totalAchievements);

  return (
    <main className="min-h-screen md:h-screen md:overflow-hidden bg-[#030102] text-slate-100 flex flex-col font-mono relative selection:bg-rose-500/30 selection:text-rose-200">
      
      {/* Background HUD grids */}
      <div className="hud-grid absolute inset-0 opacity-40 pointer-events-none -z-10" />
      <div className="absolute inset-0 bg-radial-gradient(circle_at_center,transparent_40%,rgba(3,1,2,0.95)_100%) pointer-events-none -z-10" />

      {/* Top HUD Telemetry Bar */}
      <header className="w-full border-b border-rose-950/40 bg-black/60 px-6 py-3 flex items-center justify-between text-[10px] tracking-[0.2em] font-semibold text-rose-500/80 z-20 shrink-0">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2 glow-text-red">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
            {siteData.profile.level} LEVEL
          </span>
          <span className="hidden sm:inline text-rose-600/60">|</span>
          <span className="hidden sm:inline">
            + {siteData.profile.coins} COINS AWARDED
          </span>
        </div>
        
        <div className="flex items-center gap-6">
          <span className="hidden md:inline text-rose-600/40">SYSTEM: ONLINE</span>
          <span className="hidden md:inline text-rose-600/60">|</span>
          <Link href="/admin" className="hover:text-white transition-colors glow-text-red">✏ CMS COGNITIVE LINK</Link>
          <span className="text-rose-600/60">|</span>
          <span className="text-white glow-text-red">LOCAL TIME: {localTime || "21:16:05"}</span>
        </div>
      </header>

      {/* Main Grid Viewport */}
      <div className="flex-1 w-full flex flex-col md:flex-row overflow-hidden relative z-10">
        
        {/* Left Side: Profile Panel */}
        <aside className="w-full md:w-[280px] border-r border-rose-950/30 bg-black/40 p-6 flex flex-col justify-between shrink-0 gap-6">
          <div className="space-y-6">
            
            {/* Profile Avatar Frame */}
            <div className="p-1 rounded-[1.5rem] bg-rose-950/20 border border-rose-900/25 relative group">
              <div className="hud-notch-top-left" />
              <div className="hud-notch-top-right" />
              <div className="hud-notch-bottom-left" />
              <div className="hud-notch-bottom-right" />
              <div className="relative aspect-square rounded-[calc(1.5rem-0.25rem)] overflow-hidden bg-slate-950 border border-rose-900/30">
                <Image
                  src={getAssetUrl("/profile-avatar.webp")}
                  alt="Mayank Sahu Avatar"
                  fill
                  sizes="260px"
                  className="object-cover opacity-85 group-hover:scale-105 transition-transform duration-700 filter saturate-75 contrast-125"
                />
                <div className="absolute inset-0 bg-rose-950/10 pointer-events-none mix-blend-overlay" />
              </div>
            </div>

            {/* Profile Info labels */}
            <div className="space-y-4 text-[10px] tracking-widest font-semibold uppercase text-rose-500/80">
              <div className="space-y-1">
                <p className="text-[9px] text-slate-500 font-bold">NAME</p>
                <p className="text-white text-sm font-display font-black tracking-wider glow-text-red">{siteData.profile.name}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[9px] text-slate-500 font-bold">OCCUPATION</p>
                <p className="text-white font-black tracking-wide">{siteData.profile.occupation}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[9px] text-slate-500 font-bold">CORPORATION</p>
                <p className="text-rose-400">{siteData.profile.corporation}</p>
              </div>
              <div className="space-y-1 pt-2">
                <p className="text-[9px] text-slate-500 font-bold">AVAILABILITY</p>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/20 border border-rose-500/30 text-rose-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping" />
                  <span>{siteData.profile.availability}</span>
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-[9px] text-slate-500 font-bold">SOCIAL</p>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/10 border border-rose-950/30 text-rose-500/60">
                  <span>📶 CONNECTION OPEN</span>
                </div>
              </div>
            </div>
          </div>

          {/* Motto */}
          <div className="border-t border-rose-950/20 pt-4 text-[10px] text-slate-500 uppercase tracking-widest font-bold leading-relaxed">
            <p className="text-[8px] text-rose-500/40 mb-1">MOTTO:</p>
            {siteData.profile.motto}
          </div>
        </aside>

        {/* Center: Dynamic Console Viewport */}
        <section className="flex-1 min-h-[50vh] md:h-full overflow-y-auto bg-black/20 p-6 md:p-8 flex flex-col justify-between relative custom-scrollbar">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(244,63,94,0.015)_0%,transparent_100%)] pointer-events-none" />
          
          <div className="flex-1 w-full max-w-5xl mx-auto flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="w-full h-full py-6"
              >
                
                {/* 1. BEGINNING */}
                {activeTab === "beginning" && (
                  <div className="grid lg:grid-cols-12 gap-8 items-center">
                    <div className="lg:col-span-8 flex flex-col gap-6 text-center lg:text-left">
                      <span className="text-[9px] font-display font-black text-rose-500 uppercase tracking-[0.3em] bg-rose-950/10 border border-rose-900/30 px-3 py-1 rounded-full w-fit mx-auto lg:mx-0">
                        Cockpit Initialize
                      </span>
                      <h2 className="text-3xl sm:text-5xl font-display font-black text-white leading-[1.1] uppercase tracking-wide">
                        Transforming visual code into <span className="text-gradient">dynamic</span> web systems.
                      </h2>
                      <p className="text-slate-400 text-sm leading-relaxed max-w-2xl">
                        I am {siteData.profile.name}, a {siteData.profile.occupation}. I specialize in building high-performance, interactive web applications using MongoDB, Express.js, React, Node.js, and modern TypeScript frameworks. Focus on Core Web Vitals, API security, and reusable styling components.
                      </p>
                    </div>

                    <div className="lg:col-span-4 relative group flex justify-center">
                      <div className="absolute -inset-4 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
                      <div className="p-2 rounded-[2rem] bg-white/5 border border-rose-900/20 shadow-2xl backdrop-blur-2xl w-[260px] transform-gpu transition-all duration-700 hover:rotate-2">
                        <div className="relative aspect-square rounded-[calc(2rem-0.5rem)] overflow-hidden bg-slate-950 border border-rose-900/20">
                          <Image
                            src={getAssetUrl("/hero-banner.webp")}
                            alt="Hologram concepts"
                            fill
                            sizes="260px"
                            className="object-cover saturate-50 brightness-90"
                          />
                          <div className="absolute inset-0 bg-radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.8)_100%)" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. LOGS */}
                {activeTab === "logs" && (
                  <div className="space-y-8">
                    <div className="border-b border-rose-950/20 pb-4">
                      <h3 className="text-xl font-display font-black text-white tracking-widest uppercase">
                        Mission Log Registry
                      </h3>
                      <p className="text-[10px] text-slate-500 uppercase mt-1">Chronological technical deployments & dossier logs</p>
                    </div>

                    <div className="space-y-8 max-h-[55dvh] overflow-y-auto pr-2 custom-scrollbar">
                      
                      {/* Section A: Work Experience */}
                      <div className="space-y-4">
                        <h4 className="text-xs font-display font-black text-rose-500 tracking-widest uppercase border-b border-rose-950/15 pb-1">
                          ● WORK EXPERIENCE
                        </h4>
                        
                        {siteData.experiences.map((exp) => (
                          <div key={exp.company} className="p-1 rounded-2xl bg-white/5 border border-white/5 shadow-md">
                            <div className="bg-[#050912]/80 rounded-[calc(1rem)] p-5 border border-white/5 flex flex-col sm:flex-row justify-between gap-4">
                              <div className="space-y-2">
                                <div className="flex items-center gap-3">
                                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                                  <h4 className="text-md font-bold text-white uppercase">{exp.role}</h4>
                                </div>
                                <p className="text-xs text-rose-400 font-bold uppercase tracking-wider">{exp.company} • {exp.type}</p>
                                <ul className="space-y-1.5 text-[11px] text-slate-400 pl-3 list-disc">
                                  {exp.details.map((detail, idx) => (
                                    <li key={idx} className="leading-relaxed">{detail}</li>
                                  ))}
                                </ul>
                              </div>
                              <div className="text-left sm:text-right shrink-0">
                                <span className="text-[10px] font-mono text-slate-400 bg-slate-900 border border-slate-800 px-3 py-1 rounded-full">
                                  {exp.period}
                                </span>
                                <p className="text-[9px] text-slate-500 uppercase tracking-widest mt-2">{exp.location}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Section B: Academic History */}
                      <div className="space-y-4">
                        <h4 className="text-xs font-display font-black text-rose-500 tracking-widest uppercase border-b border-rose-950/15 pb-1">
                          ● ACADEMIC HISTORY
                        </h4>

                        {siteData.education.map((edu) => (
                          <div key={edu.institution} className="p-1 rounded-2xl bg-white/5 border border-white/5 shadow-md">
                            <div className="bg-[#050912]/80 rounded-[calc(1rem)] p-5 border border-white/5 flex flex-col sm:flex-row justify-between gap-4">
                              <div className="space-y-2">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-lg bg-[#140609] border border-rose-950/30 flex items-center justify-center shrink-0">
                                    {getIcon(edu.icon)}
                                  </div>
                                  <h4 className="text-md font-bold text-white uppercase">{edu.institution}</h4>
                                </div>
                                <p className="text-xs text-rose-400 font-bold uppercase tracking-wider">{edu.degree} • {edu.field}</p>
                                <p className="text-[11px] text-slate-400 italic leading-relaxed max-w-xl">{edu.description}</p>
                              </div>
                              <div className="text-left sm:text-right shrink-0">
                                <span className="text-[10px] font-mono text-slate-400 bg-slate-900 border border-slate-800 px-3 py-1 rounded-full">
                                  {edu.period}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Section C: Professional Certifications */}
                      <div className="space-y-4">
                        <h4 className="text-xs font-display font-black text-rose-500 tracking-widest uppercase border-b border-rose-950/15 pb-1">
                          ● PROFESSIONAL CERTIFICATIONS
                        </h4>

                        {siteData.certifications.map((edu) => (
                          <div key={edu.institution} className="p-1 rounded-2xl bg-white/5 border border-white/5 shadow-md">
                            <div className="bg-[#050912]/80 rounded-[calc(1rem)] p-5 border border-white/5 flex flex-col sm:flex-row justify-between gap-4">
                              <div className="space-y-2">
                                <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-lg bg-[#140609] border border-rose-950/30 flex items-center justify-center shrink-0">
                                    {getIcon(edu.icon)}
                                  </div>
                                  <h4 className="text-md font-bold text-white uppercase">{edu.institution}</h4>
                                </div>
                                <p className="text-xs text-rose-400 font-bold uppercase tracking-wider">{edu.degree} • {edu.field}</p>
                                <p className="text-[11px] text-slate-400 italic leading-relaxed max-w-xl">{edu.description}</p>
                              </div>
                              <div className="text-left sm:text-right shrink-0">
                                <span className="text-[10px] font-mono text-slate-400 bg-slate-900 border border-slate-800 px-3 py-1 rounded-full">
                                  {edu.period}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                    </div>
                  </div>
                )}

                {/* 3. ACHIEVEMENTS */}
                {activeTab === "achievements" && (
                  <div className="grid md:grid-cols-12 gap-8 items-center">
                    
                    <div className="md:col-span-4 flex flex-col items-center gap-4 text-center">
                      <div className="relative w-36 h-36 flex items-center justify-center">
                        <svg className="absolute w-full h-full -rotate-90">
                          <circle cx="72" cy="72" r="60" className="stroke-rose-950/20 fill-none" strokeWidth="6" />
                          <circle cx="72" cy="72" r="60" className="stroke-rose-500 fill-none transition-all duration-1000" strokeWidth="8" strokeDasharray="377" strokeDashoffset={dashOffset} style={{ strokeLinecap: "round" }} />
                        </svg>
                        <div className="text-center z-10">
                          <p className="text-3xl font-display font-black text-white glow-text-red">{completedAchievements}/{totalAchievements}</p>
                          <p className="text-[8px] text-slate-500 uppercase tracking-[0.2em] font-bold">PROGRESS</p>
                        </div>
                      </div>
                      <p className="text-[10px] text-slate-500 uppercase max-w-[200px] tracking-wide leading-relaxed">
                        Complete milestones to build up career credentials.
                      </p>
                    </div>

                    <div className="md:col-span-8 space-y-4 max-h-[50dvh] overflow-y-auto pr-2 custom-scrollbar">
                      {siteData.achievements.map((ach) => (
                        <div
                          key={ach.title}
                          className={`p-1 rounded-2xl border relative ${
                            ach.category === "LEGENDARY"
                              ? "bg-amber-500/10 border-amber-500/25"
                              : ach.category === "EPIC"
                              ? "bg-rose-500/10 border-rose-500/25"
                              : "bg-teal-500/10 border-teal-500/25 opacity-75"
                          }`}
                        >
                          <div className="bg-[#0c0604] rounded-[calc(1rem)] p-5 flex items-center justify-between gap-4">
                            <div className="space-y-1">
                              <span
                                className={`text-[8px] font-display font-black tracking-widest px-2 py-0.5 rounded-sm uppercase ${
                                  ach.category === "LEGENDARY"
                                    ? "text-amber-400 bg-amber-950/30 border border-amber-800/30"
                                    : ach.category === "EPIC"
                                    ? "text-rose-400 bg-rose-950/30 border border-rose-900/30"
                                    : "text-teal-400 bg-teal-950/30 border border-teal-900/30"
                                }`}
                              >
                                {ach.category}
                              </span>
                              <h4 className="text-sm font-bold text-white uppercase mt-1">{ach.title}</h4>
                              <p className="text-[10px] text-slate-400">{ach.description}</p>
                            </div>
                            <span
                              className={`text-[10px] font-mono shrink-0 font-bold px-2.5 py-1 rounded-md ${
                                ach.status === "COMPLETED"
                                  ? "text-rose-400 bg-rose-950/20 border border-rose-900/40"
                                  : "text-teal-500 bg-teal-950/10 border border-teal-900/30"
                              }`}
                            >
                              {ach.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 4. CREATIONS */}
                {activeTab === "creations" && (
                  <div className="space-y-8">
                    <div className="border-b border-rose-950/20 pb-4">
                      <h3 className="text-xl font-display font-black text-white tracking-widest uppercase">
                        Deployments Inventory
                      </h3>
                      <p className="text-[10px] text-slate-500 uppercase mt-1">List of core web systems & detailed XP specifications</p>
                    </div>

                    <div className="space-y-8 max-h-[50dvh] overflow-y-auto pr-2 custom-scrollbar">
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        {siteData.projects.map((project) => (
                          <div key={project.title} className="p-1 rounded-2xl bg-white/5 border border-white/5 shadow-md">
                            <div className="bg-[#050912]/80 rounded-[calc(1rem)] p-5 flex flex-col justify-between gap-4 h-full">
                              <div className="space-y-2">
                                <span className="text-[8px] font-display font-black tracking-widest text-rose-400 bg-rose-950/30 border border-rose-900/30 px-2.5 py-0.5 rounded-full uppercase">
                                  {project.category}
                                </span>
                                <h4 className="text-sm font-bold text-white uppercase">{project.title}</h4>
                                <p className="text-[10px] text-slate-400 leading-relaxed">{project.description}</p>
                              </div>
                              <div className="flex items-center justify-between pt-2 border-t border-slate-900">
                                <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">BUILD YR: 2026</span>
                                <a
                                  href={project.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-[9px] font-display font-black tracking-widest text-accent hover:underline uppercase"
                                >
                                  LAUNCH MODULE ↗
                                </a>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="space-y-4 pt-6 border-t border-rose-950/20">
                        <h4 className="text-xs font-display font-black text-rose-500 tracking-widest uppercase border-b border-rose-950/15 pb-1">
                          ● TECHNICAL SKILLS (XP XP)
                        </h4>
                        
                        <div className="grid sm:grid-cols-2 gap-4">
                          {siteData.skills.map((skill) => {
                            const totalNotches = 10;
                            const filledNotches = Math.round(skill.level / 10);
                            return (
                              <div key={skill.name} className="flex flex-wrap items-center gap-1.5 bg-slate-950/50 p-3 rounded-xl border border-rose-900/10">
                                <span className="text-[10px] font-display font-black text-slate-200 uppercase w-24 shrink-0">{skill.name}</span>
                                <div className="flex gap-1">
                                  {Array.from({ length: totalNotches }).map((_, i) => (
                                    <div
                                      key={i}
                                      className={`w-2 h-3.5 rounded-xs transition-all duration-700 ${
                                        i < filledNotches
                                          ? "bg-accent shadow-[0_0_8px_rgba(244,63,94,0.5)] border border-accent"
                                          : "bg-slate-950 border border-slate-900"
                                      }`}
                                    />
                                  ))}
                                </div>
                                <span className="text-[10px] font-mono font-bold text-accent ml-auto">{skill.level}%</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                    </div>
                  </div>
                )}

                {/* 5. SOCIALS */}
                {activeTab === "socials" && (
                  <div className="grid md:grid-cols-12 gap-8 items-stretch">
                    
                    <div className="md:col-span-6 space-y-4">
                      <div className="border-b border-rose-950/20 pb-4 mb-2">
                        <h3 className="text-lg font-display font-black text-white tracking-wider uppercase">
                          Establish Connection
                        </h3>
                        <p className="text-[9px] text-slate-500 uppercase mt-1">Send a packet transmission directly into my console</p>
                      </div>

                      {sendSuccess ? (
                        <motion.div
                          initial={{ scale: 0.95 }}
                          animate={{ scale: 1 }}
                          className="p-6 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-center space-y-3"
                        >
                          <p className="text-md font-bold text-accent">TRANSMISSION COMPLETED</p>
                          <p className="text-xs text-slate-400">The packet has been securely dispatched. I will reply shortly.</p>
                        </motion.div>
                      ) : (
                        <form onSubmit={handleFormSubmit} className="space-y-4">
                          <div className="space-y-1.5">
                            <label className="text-[9px] font-display font-bold uppercase tracking-widest text-rose-500/80">HOW SHOULD I CALL YOU?</label>
                            <input
                              type="text"
                              value={contactName}
                              onChange={(e) => setContactName(e.target.value)}
                              placeholder="YOUR NAME"
                              className="w-full bg-[#0a0305]/80 border border-rose-950/40 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-700 focus:outline-none focus:border-rose-500/60 transition-colors"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-[9px] font-display font-bold uppercase tracking-widest text-rose-500/80">SENDING FROM</label>
                            <input
                              type="email"
                              value={contactEmail}
                              onChange={(e) => setContactEmail(e.target.value)}
                              placeholder="YOUR.NAME@EXAMPLE.COM"
                              className="w-full bg-[#0a0305]/80 border border-rose-950/40 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-700 focus:outline-none focus:border-rose-500/60 transition-colors"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label className="text-[9px] font-display font-bold uppercase tracking-widest text-rose-500/80">TRANSMITTED DATA</label>
                            <textarea
                              rows={3}
                              value={contactMessage}
                              onChange={(e) => setContactMessage(e.target.value)}
                              placeholder="HI, I WRITE TO YOU ABOUT..."
                              className="w-full bg-[#0a0305]/80 border border-rose-950/40 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-700 focus:outline-none focus:border-rose-500/60 transition-colors resize-none"
                            />
                          </div>

                          <div className="flex gap-4 pt-2">
                            <button
                              type="submit"
                              className="flex-1 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-md active:scale-98"
                            >
                              SEND MESSAGE [ENTER]
                            </button>
                            <button
                              type="button"
                              onClick={handleFormDiscard}
                              className="px-6 bg-slate-950 border border-slate-900 text-slate-500 hover:text-slate-300 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all active:scale-98"
                            >
                              DISCARD [ESC]
                            </button>
                          </div>
                        </form>
                      )}
                    </div>

                    <div className="md:col-span-6 flex flex-col justify-between space-y-4">
                      <div className="border-b border-rose-950/20 pb-4 mb-2">
                        <h3 className="text-lg font-display font-black text-white tracking-wider uppercase">
                          Direct Channels
                        </h3>
                        <p className="text-[9px] text-slate-500 uppercase mt-1">Uplink nodes to direct social repositories</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4 flex-1">
                        <a
                          href="https://github.com/Deadshot-45/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1 rounded-2xl bg-white/5 border border-rose-900/10 hover:border-rose-500/40 transition-colors shadow-md group"
                        >
                          <div className="bg-[#050912]/80 rounded-[calc(1rem)] p-4 flex flex-col justify-between h-full">
                            <span className="text-[8px] font-mono text-slate-500">PORT: 443</span>
                            <div>
                              <h4 className="text-xs font-bold text-white uppercase group-hover:text-accent transition-colors">GITHUB</h4>
                              <p className="text-[8px] text-slate-400 mt-1">Repos & codebases</p>
                            </div>
                          </div>
                        </a>

                        <a
                          href="https://www.linkedin.com/in/mayank-sahu-ou"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1 rounded-2xl bg-white/5 border border-rose-900/10 hover:border-rose-500/40 transition-colors shadow-md group"
                        >
                          <div className="bg-[#050912]/80 rounded-[calc(1rem)] p-4 flex flex-col justify-between h-full">
                            <span className="text-[8px] font-mono text-slate-500">PORT: 443</span>
                            <div>
                              <h4 className="text-xs font-bold text-white uppercase group-hover:text-accent transition-colors">LINKEDIN</h4>
                              <p className="text-[8px] text-slate-400 mt-1">Professional network</p>
                            </div>
                          </div>
                        </a>

                        <a
                          href="mailto:mayanksahu8179@gmail.com"
                          className="p-1 rounded-2xl bg-white/5 border border-rose-900/10 hover:border-rose-500/40 transition-colors shadow-md group"
                        >
                          <div className="bg-[#050912]/80 rounded-[calc(1rem)] p-4 flex flex-col justify-between h-full">
                            <span className="text-[8px] font-mono text-slate-500">PORT: 25</span>
                            <div>
                              <h4 className="text-xs font-bold text-white uppercase group-hover:text-accent transition-colors">EMAIL</h4>
                              <p className="text-[8px] text-slate-400 mt-1">Direct message node</p>
                            </div>
                          </div>
                        </a>

                        <a
                          href="/Mayank_Sahu_MERN_Stack.pdf"
                          download="Mayank_Sahu_MERN_Stack.pdf"
                          className="p-1 rounded-2xl bg-white/5 border border-rose-900/10 hover:border-rose-500/40 transition-colors shadow-md group"
                        >
                          <div className="bg-[#050912]/80 rounded-[calc(1rem)] p-4 flex flex-col justify-between h-full">
                            <span className="text-[8px] font-mono text-rose-500">DATA FILE</span>
                            <div>
                              <h4 className="text-xs font-bold text-white uppercase group-hover:text-accent transition-colors">RESUME</h4>
                              <p className="text-[8px] text-slate-400 mt-1">Download static PDF</p>
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>

                  </div>
                )}

              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom HUD tab links */}
          <footer className="w-full pt-6 border-t border-rose-950/20 flex items-center justify-center shrink-0">
            <div className="flex items-center gap-1 sm:gap-3 md:gap-4 bg-slate-950/80 border border-rose-950/30 rounded-full px-2 py-1.5 shadow-2xl">
              {(["beginning", "logs", "achievements", "creations", "socials"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => handleTabChange(tab)}
                  className={`text-[9px] sm:text-[10px] md:text-xs font-display font-black tracking-widest uppercase px-3 py-1.5 sm:px-4 sm:py-2 rounded-full transition-all duration-300 ${
                    activeTab === tab
                      ? "bg-rose-500/10 text-rose-400 border border-rose-500/40 shadow-[0_0_12px_rgba(244,63,94,0.25)]"
                      : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  {tab === "socials" ? "Social Medias" : tab}
                </button>
              ))}
            </div>
          </footer>
        </section>

        {/* Right Side: Quest Details & Controls */}
        <aside className="w-full md:w-[280px] border-l border-rose-950/30 bg-black/40 p-6 flex flex-col justify-between shrink-0 gap-6 text-rose-500/80 uppercase">
          <div className="space-y-6">
            
            {/* Quest Details Panel */}
            <div className="p-4 rounded-2xl bg-rose-950/10 border border-rose-950/20 space-y-4">
              <span className="text-[8px] font-display font-black tracking-widest text-rose-400 bg-rose-950/30 border border-rose-900/30 px-2 py-0.5 rounded-sm">ACTIVE QUEST</span>
              <div className="space-y-1">
                <p className="text-[8px] text-slate-500 font-bold">QUEST NAME</p>
                <p className="text-white text-xs font-bold leading-tight">{siteData.quest.questName}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[8px] text-slate-500 font-bold">GOAL</p>
                <p className="text-[9px] text-slate-400 font-medium normal-case leading-relaxed">
                  {siteData.quest.goal}
                </p>
              </div>
              <div className="space-y-1 pt-1">
                <p className="text-[8px] text-slate-500 font-bold">REWARDS</p>
                <div className="flex gap-2">
                  <span className="text-[9px] bg-rose-950/30 border border-rose-900/30 px-2 py-0.5 rounded-md text-white font-bold">XP +{siteData.quest.xpReward}</span>
                  <span className="text-[9px] bg-rose-950/30 border border-rose-900/30 px-2 py-0.5 rounded-md text-white font-bold">COINS +{siteData.quest.coinsReward}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Audio Controls */}
          <div className="space-y-3 text-[10px] font-bold tracking-widest text-slate-500">
            <div className="flex items-center justify-between">
              <label htmlFor="sound-toggle" className="cursor-pointer hover:text-slate-300">SOUND EFFECTS</label>
              <input
                id="sound-toggle"
                type="checkbox"
                checked={soundOn}
                onChange={(e) => {
                  playBeep(600, 0.05);
                  setSoundOn(e.target.checked);
                }}
                className="w-3.5 h-3.5 border border-rose-950 rounded-sm bg-black accent-rose-500 cursor-pointer"
              />
            </div>
            <div className="flex items-center justify-between">
              <label htmlFor="music-toggle" className="cursor-pointer hover:text-slate-300">AMBIENT DRONE</label>
              <input
                id="music-toggle"
                type="checkbox"
                checked={musicOn}
                onChange={(e) => {
                  playBeep(700, 0.05);
                  setMusicOn(e.target.checked);
                }}
                className="w-3.5 h-3.5 border border-rose-950 rounded-sm bg-black accent-rose-500 cursor-pointer"
              />
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-rose-950/20">
              <span>VISUAL SETTINGS</span>
              <span className="text-[14px] text-rose-500 cursor-pointer hover:rotate-45 transition-transform duration-300">⚙</span>
            </div>
          </div>
        </aside>

      </div>

    </main>
  );
}
