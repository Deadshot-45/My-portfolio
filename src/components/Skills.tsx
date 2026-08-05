"use client";

import { motion } from "framer-motion";
import { Atom, Cpu, Database, Layers, Palette, Server } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { containerVariants, fadeUpVariants, scaleInVariants } from "./motion";
import Tilt from "./Tilt";

const detailedSkills = [
  {
    title: "JavaScript & TypeScript",
    icon: <Cpu className="w-8 h-8 text-yellow-400" />,
    level: 95,
    points: [
      "Proficient in ES6+ features (arrow functions, promises, async/await).",
      "Robust static typing using TypeScript for secure, error-free interfaces.",
      "Asynchronous patterns, DOM manipulation, and modular code structures.",
    ],
    color: "from-yellow-500/20 to-yellow-500/5",
    borderColor: "border-yellow-500/20",
    gridSpan: "lg:col-span-2",
  },
  {
    title: "React.js & Next.js",
    icon: <Atom className="w-8 h-8 text-cyan-400" />,
    level: 93,
    points: [
      "Dynamic client interfaces with App Router and Server Components.",
      "Optimization strategies: React.memo, useMemo, dynamic imports.",
      "Reduced Largest Contentful Paint (LCP) by 18% in production.",
    ],
    color: "from-cyan-500/20 to-cyan-500/5",
    borderColor: "border-cyan-500/20",
    gridSpan: "lg:col-span-1",
  },
  {
    title: "Node.js & Express.js",
    icon: <Server className="w-8 h-8 text-emerald-400" />,
    level: 89,
    points: [
      "Built and integrated secure RESTful APIs in production.",
      "Asynchronous middleware and modular structures for maintainability.",
      "Seamless integration between server routes and client requests.",
    ],
    color: "from-emerald-500/20 to-emerald-500/5",
    borderColor: "border-emerald-500/20",
    gridSpan: "lg:col-span-1",
  },
  {
    title: "MongoDB & SQL/MySQL",
    icon: <Database className="w-8 h-8 text-blue-400" />,
    level: 83,
    points: [
      "Optimized schemas and queries for reliable data persistence.",
      "Data layer support across both document and relational tables.",
      "Experience with database design and data structure optimizations.",
    ],
    color: "from-blue-500/20 to-blue-500/5",
    borderColor: "border-blue-500/20",
    gridSpan: "lg:col-span-1",
  },
  {
    title: "Styling & UI Systems",
    icon: <Palette className="w-8 h-8 text-indigo-400" />,
    level: 92,
    points: [
      "Designed reusable component libraries on Atomic Design principles.",
      "Tailwind CSS and shadcn/ui for consistent responsive styling.",
      "Enforced design parity and accelerated feature delivery by 20%.",
    ],
    color: "from-indigo-500/20 to-indigo-500/5",
    borderColor: "border-indigo-500/20",
    gridSpan: "lg:col-span-1",
  },
  {
    title: "State & Data Layer",
    icon: <Layers className="w-8 h-8 text-white" />,
    level: 89,
    points: [
      "Optimized data sync with TanStack Query (optimistic updates).",
      "Persistent global states with Redux Toolkit and Context API.",
      "Cut redundant API calls by 40% through re-architected data flows.",
    ],
    color: "from-slate-500/20 to-slate-500/5",
    borderColor: "border-slate-500/20",
    gridSpan: "lg:col-span-2",
  },
];

export default function Skills() {
  return (
    <section
      id="skills"
      className="py-32 px-6 lg:px-12 bg-slate-900/30 border-y border-slate-900 scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          <SectionHeading
            title="Technical Arsenal"
            subtitle="My expertise across core web technologies, from backend systems to frontend motion."
          />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {detailedSkills.map((skill, index) => {
            const totalNotches = 10;
            const filledNotches = Math.round(skill.level / 10);
            return (
              <motion.div
                key={skill.title}
                variants={fadeUpVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: 0.1 + index * 0.08 }}
                className={`h-full ${skill.gridSpan || ""}`}
              >
                <Tilt className="h-full">
                  {/* Outer Bezel Shell */}
                  <div className={`p-2 rounded-[2.5rem] bg-white/5 border ${skill.borderColor} shadow-2xl backdrop-blur-2xl h-full transform-gpu transition-all duration-300 preserve-3d`}>
                    {/* Inner Core Enclosure */}
                    <div className="bg-[#050912]/80 rounded-[calc(2.5rem-0.5rem)] p-8 border border-white/5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] h-full flex flex-col justify-between" style={{ transformStyle: "preserve-3d" }}>
                      
                      <div
                        className={`absolute inset-0 bg-linear-to-br ${skill.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                      />

                      <div className="relative z-10 space-y-6" style={{ transform: "translateZ(10px)" }}>
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-2xl">
                            {skill.icon}
                          </div>
                          <h3 className="text-2xl font-display font-black text-white">
                            {skill.title}
                          </h3>
                        </div>

                        <ul className="space-y-4">
                          {skill.points.map((point) => (
                            <li
                              key={point}
                              className="flex gap-3 text-slate-400 text-sm leading-relaxed group-hover:text-slate-200 transition-colors"
                            >
                              <span className="text-accent font-bold">•</span>
                              {point}
                            </li>
                          ))}
                        </ul>

                        {/* Gaming Notched HUD XP Bar */}
                        <div className="flex flex-wrap items-center gap-1.5 pt-4 border-t border-slate-900/60">
                          <span className="text-[9px] font-display font-black text-slate-500 uppercase tracking-widest mr-2">XP GAUGE</span>
                          <div className="flex gap-1.5">
                            {Array.from({ length: totalNotches }).map((_, i) => {
                              const isFilled = i < filledNotches;
                              return (
                                <div
                                  key={i}
                                  className={`w-2.5 h-3.5 rounded-xs transition-all duration-700 ${
                                    isFilled 
                                      ? "bg-accent border border-accent shadow-[0_0_8px_rgba(0,255,135,0.5)]" 
                                      : "bg-slate-950 border border-slate-800"
                                  }`}
                                />
                              );
                            })}
                          </div>
                          <span className="text-xs font-mono font-bold text-accent ml-auto">{skill.level}%</span>
                        </div>

                      </div>
                    </div>
                  </div>
                </Tilt>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-20 pt-20 border-t border-slate-900">
          <motion.h3
            variants={scaleInVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.3 }}
            className="text-xl font-display font-black text-slate-300 uppercase tracking-[0.2em] text-center mb-10 italic"
          >
            Tools, Middleware & Core Deployment
          </motion.h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { name: "Git & GitHub", icon: "🐙" },
              { name: "Postman", icon: "📨" },
              { name: "Vercel", icon: "▲" },
              { name: "RBAC Auth", icon: "🔒" },
              { name: "RESTful APIs", icon: "⚡" },
              { name: "Atomic Design", icon: "⚛️" },
            ].map((skill, index) => (
              <motion.div
                key={skill.name}
                variants={fadeUpVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: 0.4 + index * 0.05 }}
                className="glass p-6 text-center rounded-3xl hover:border-accent/40 group transition-all duration-300 bg-slate-950/20"
              >
                <div className="text-2xl mb-2 group-hover:scale-125 transition-transform duration-500">
                  {skill.icon}
                </div>
                <h4 className="font-bold text-sm mb-1">{skill.name}</h4>
                <p className="text-[10px] text-accent font-bold uppercase tracking-widest opacity-60">
                  Core Tool
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
