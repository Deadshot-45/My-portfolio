'use client';

import React, { useState } from 'react';
import { Project, ProjectCategory, ThemeMode } from '../types/index';
import { PROJECTS } from '../data/portfolioData';
import { ExternalLink, Github, ArrowUpRight, Layers, CheckCircle2 } from 'lucide-react';
import { filterProjectsByCategory } from '../utils/portfolioUtils';

interface SelectedWorkProps {
  onSelectProject: (project: Project) => void;
  theme: ThemeMode;
}

export const SelectedWork: React.FC<SelectedWorkProps> = ({ onSelectProject, theme }) => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');
  const isDark = theme === 'dark';

  const filteredProjects = filterProjectsByCategory(PROJECTS, activeCategory);

  const categories: { label: string; value: ProjectCategory }[] = [
    { label: 'All Projects', value: 'all' },
    { label: 'Real-Time / Sockets', value: 'realtime' },
    { label: 'Enterprise CRM / RBAC', value: 'crm' },
    { label: 'Full-Stack E-Commerce', value: 'ecommerce' },
  ];

  return (
    <section id="work" className={`py-24 border-t relative overflow-hidden ${
      isDark ? 'border-zinc-800/80 bg-zinc-950/40' : 'border-zinc-200 bg-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2 className={`text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight ${
              isDark ? 'text-white' : 'text-zinc-950'
            }`}>
              Featured Engineering Projects.
            </h2>
            <p className={`text-base sm:text-lg mt-3 max-w-2xl ${
              isDark ? 'text-zinc-400' : 'text-zinc-600'
            }`}>
              Production applications built and deployed with live endpoints, GitHub repositories, and verifiable architectural outcomes.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className={`flex flex-wrap items-center gap-1.5 p-1 rounded-xl border self-start md:self-auto ${
            isDark ? 'bg-zinc-900/60 border-zinc-800' : 'bg-zinc-100 border-zinc-200'
          }`}>
            {categories.map((cat) => (
              <button
                key={cat.value}
                type="button"
                onClick={() => setActiveCategory(cat.value)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all ${
                  activeCategory === cat.value
                    ? isDark
                      ? 'bg-zinc-800 text-white font-bold shadow-sm'
                      : 'bg-white text-zinc-950 font-bold shadow-sm'
                    : isDark
                    ? 'text-zinc-400 hover:text-white'
                    : 'text-zinc-600 hover:text-zinc-950'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className={`rounded-3xl border flex flex-col justify-between overflow-hidden transition-all duration-300 hover:translate-y-[-2px] ${
                isDark
                  ? 'bg-zinc-900/60 border-zinc-800/80 hover:border-zinc-700 shadow-xl'
                  : 'bg-zinc-50 border-zinc-200 hover:border-zinc-300 shadow-md'
              }`}
            >
              {/* Card Top: Header & Category */}
              <div className="p-7 sm:p-8">
                
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <span className="text-xs font-mono font-semibold tracking-wider uppercase text-emerald-500">
                      {project.categoryLabel}
                    </span>
                    <h3 className={`text-2xl font-bold tracking-tight mt-1 ${
                      isDark ? 'text-white' : 'text-zinc-950'
                    }`}>
                      {project.title}
                    </h3>
                  </div>

                  <span className={`text-xs font-mono px-2.5 py-1 rounded-full border ${
                    isDark ? 'bg-zinc-800 border-zinc-700 text-zinc-300' : 'bg-white border-zinc-300 text-zinc-700'
                  }`}>
                    {project.subtitle}
                  </span>
                </div>

                <p className={`text-sm sm:text-base leading-relaxed mb-6 ${
                  isDark ? 'text-zinc-300' : 'text-zinc-700'
                }`}>
                  {project.description}
                </p>

                {/* Key Technical Metrics */}
                <div className={`grid grid-cols-3 gap-2 p-3 rounded-2xl border mb-6 text-xs font-mono ${
                  isDark ? 'bg-zinc-950/60 border-zinc-800/60' : 'bg-white border-zinc-200'
                }`}>
                  {project.metrics.map((metric) => (
                    <div key={metric.label} className="flex flex-col">
                      <span className={`font-bold ${isDark ? 'text-white' : 'text-zinc-950'}`}>
                        {metric.value}
                      </span>
                      <span className={`text-[10px] truncate ${isDark ? 'text-zinc-500' : 'text-zinc-500'}`}>
                        {metric.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`text-[11px] font-mono px-2.5 py-0.5 rounded-md border ${
                        isDark
                          ? 'bg-zinc-800/40 border-zinc-800 text-zinc-400'
                          : 'bg-zinc-200/50 border-zinc-300 text-zinc-700'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

              </div>

              {/* Card Footer: Action Links */}
              <div className={`p-5 sm:px-8 border-t flex flex-wrap items-center justify-between gap-3 ${
                isDark ? 'border-zinc-800/80 bg-zinc-950/40' : 'border-zinc-200 bg-white/70'
              }`}>
                <div className="flex items-center gap-3">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-bold text-xs transition-all active:scale-95 ${
                        isDark
                          ? 'bg-emerald-500 hover:bg-emerald-400 text-black'
                          : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                      }`}
                    >
                      <span>Live Demo</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono border transition-all active:scale-95 ${
                        isDark
                          ? 'bg-zinc-800 hover:bg-zinc-750 border-zinc-700 text-zinc-300 hover:text-white'
                          : 'bg-zinc-100 hover:bg-zinc-200 border-zinc-300 text-zinc-800'
                      }`}
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>Code</span>
                    </a>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => onSelectProject(project)}
                  className={`inline-flex items-center gap-1 text-xs font-medium hover:underline ${
                    isDark ? 'text-zinc-300 hover:text-white' : 'text-zinc-700 hover:text-zinc-950'
                  }`}
                >
                  <span>Architecture Details</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
