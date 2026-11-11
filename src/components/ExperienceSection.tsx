'use client';

import React from 'react';
import { WORK_EXPERIENCE } from '../data/portfolioData';
import { ThemeMode } from '../types/index';
import { Briefcase, Calendar, MapPin, CheckCircle2, GraduationCap, Award } from 'lucide-react';

interface ExperienceSectionProps {
  theme: ThemeMode;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ theme }) => {
  const isDark = theme === 'dark';

  return (
    <section id="experience" className={`py-24 border-t relative overflow-hidden ${
      isDark ? 'border-zinc-800/80 bg-zinc-950/70' : 'border-zinc-200 bg-zinc-50/60'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <h2 className={`text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight mb-4 ${
            isDark ? 'text-white' : 'text-zinc-950'
          }`}>
            Work Experience & Track Record.
          </h2>
          <p className={`text-base sm:text-lg leading-relaxed ${
            isDark ? 'text-zinc-300' : 'text-zinc-700'
          }`}>
            Proven delivery across production applications, infrastructure reliability, and full-stack engineering teams.
          </p>
        </div>

        {/* Experience Timeline Cards */}
        <div className="space-y-6 mb-16">
          {WORK_EXPERIENCE.map((exp) => (
            <div
              key={exp.id}
              className={`p-7 sm:p-9 rounded-3xl border transition-all ${
                isDark
                  ? 'bg-zinc-900/60 border-zinc-800/80 hover:border-zinc-700'
                  : 'bg-white border-zinc-200 hover:border-zinc-300 shadow-sm'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div>
                  <h3 className={`text-xl sm:text-2xl font-bold tracking-tight ${
                    isDark ? 'text-white' : 'text-zinc-950'
                  }`}>
                    {exp.role}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 mt-1 text-xs font-mono">
                    <span className="font-bold text-emerald-500">{exp.company}</span>
                    <span className={isDark ? 'text-zinc-600' : 'text-zinc-400'}>•</span>
                    <span className={`flex items-center gap-1 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                      <MapPin className="w-3 h-3" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-mono self-start sm:self-auto ${
                  isDark ? 'bg-zinc-800/60 border-zinc-700 text-zinc-300' : 'bg-zinc-100 border-zinc-200 text-zinc-800'
                }`}>
                  <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                  <span>{exp.period}</span>
                </div>
              </div>

              <p className={`text-sm sm:text-base leading-relaxed mb-6 ${
                isDark ? 'text-zinc-300' : 'text-zinc-700'
              }`}>
                {exp.summary}
              </p>

              {/* Bulleted Achievements */}
              <ul className="space-y-3 mb-6">
                {exp.achievements.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span className={isDark ? 'text-zinc-300' : 'text-zinc-700'}>{item}</span>
                  </li>
                ))}
              </ul>

              {/* Technology Tags */}
              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-zinc-800/50">
                {exp.technologies.map((tech) => (
                  <span
                    key={tech}
                    className={`text-xs font-mono px-2.5 py-0.5 rounded-md border ${
                      isDark
                        ? 'bg-zinc-800/30 border-zinc-800 text-zinc-400'
                        : 'bg-zinc-100 border-zinc-200 text-zinc-700'
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Education & Academic Credentials */}
        <div className={`p-8 sm:p-10 rounded-3xl border ${
          isDark ? 'bg-zinc-900/40 border-zinc-800' : 'bg-white border-zinc-200 shadow-sm'
        }`}>
          <h3 className={`text-xl font-bold mb-6 flex items-center gap-2 ${
            isDark ? 'text-white' : 'text-zinc-950'
          }`}>
            <GraduationCap className="w-5 h-5 text-sky-500" />
            <span>Education & Formal Credentials</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            
            <div className="flex flex-col">
              <span className={`font-bold ${isDark ? 'text-white' : 'text-zinc-950'}`}>
                Master in Computer Applications (MCA)
              </span>
              <span className={`text-xs font-mono mt-1 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`}>
                Oriental University, Indore · 2024
              </span>
              <span className={`text-xs mt-2 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                Focus: Data Structures & Algorithms, DBMS, Software Engineering
              </span>
            </div>

            <div className="flex flex-col">
              <span className={`font-bold ${isDark ? 'text-white' : 'text-zinc-950'}`}>
                BA in Economics and Mathematics
              </span>
              <span className={`text-xs font-mono mt-1 ${isDark ? 'text-sky-400' : 'text-sky-600'}`}>
                Delhi University (Zakir Husain Delhi College) · 2022
              </span>
              <span className={`text-xs mt-2 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                Focus: Analytical Problem Solving, Mathematical Modeling, Statistical Analysis
              </span>
            </div>

            <div className="flex flex-col">
              <span className={`font-bold ${isDark ? 'text-white' : 'text-zinc-950'}`}>
                MERN Full-Stack Certification
              </span>
              <span className={`text-xs font-mono mt-1 ${isDark ? 'text-amber-400' : 'text-amber-600'}`}>
                J-Spider Development Center · 2025
              </span>
              <span className={`text-xs mt-2 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                6-Month Intensive Software Engineering Certification
              </span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
