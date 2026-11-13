'use client';

import React, { useState } from 'react';
import { Project, ProjectCategory, ThemeMode } from '../types/index';
import { PROJECTS } from '../data/portfolioData';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';
import { filterProjectsByCategory } from '../utils/portfolioUtils';

interface SelectedWorkProps {
  onSelectProject: (project: Project) => void;
  theme?: ThemeMode;
  projects?: Project[];
}

export const SelectedWork: React.FC<SelectedWorkProps> = ({
  onSelectProject,
  projects = PROJECTS,
}) => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');

  const filteredProjects = filterProjectsByCategory(projects, activeCategory);

  const categories: { label: string; value: ProjectCategory }[] = [
    { label: 'All Work', value: 'all' },
    { label: 'Websites', value: 'websites' },
    { label: 'Online Stores', value: 'ecommerce' },
    { label: '3D & Interactive', value: 'threejs' },
    { label: 'AI Assistants', value: 'ai' },
  ];

  return (
    <section
      id="work"
      data-surface="dark"
      aria-labelledby="work-title"
      className="relative z-10 w-full min-h-[100svh] bg-[#07070a] text-white px-[4vw] md:px-[var(--page-x)] py-20 md:py-28 border-t border-white/10"
    >
      {/* 1. Header with Signature Period Accent matching ex.tsx */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div>
          <h2
            id="work-title"
            className="font-grotesk text-[clamp(2.5rem,7vw,5.5rem)] font-light leading-[1.02] tracking-[-0.035em] text-white m-0"
          >
            <span>Selected Work</span>
            <i
              className="inline-block w-3 h-3 md:w-3.5 md:h-3.5 rounded-full bg-[#9bf35a] ml-2 shadow-[0_0_12px_#9bf35a] align-baseline"
              aria-hidden="true"
            />
          </h2>
          <p className="font-grotesk text-[clamp(1rem,1.3vw,1.25rem)] text-zinc-400 mt-4 max-w-2xl leading-relaxed">
            Real websites for real businesses, live today. I built each one myself, start to finish.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 p-1 rounded-full bg-white/5 border border-white/10 self-start md:self-auto">
          {categories.map((cat) => (
            <button
              key={cat.value}
              type="button"
              onClick={() => setActiveCategory(cat.value)}
              className={`px-4 py-2 rounded-full text-xs font-mono transition-all duration-300 ${
                activeCategory === cat.value
                  ? 'bg-white text-black font-bold shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Interactive Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
        {filteredProjects.map((project, idx) => (
          <article
            key={project.id}
            onClick={() => onSelectProject(project)}
            className="group relative rounded-3xl border border-white/10 bg-zinc-950/80 p-6 md:p-8 flex flex-col justify-between overflow-hidden cursor-pointer transition-all duration-500 hover:border-white/30 hover:-translate-y-1"
          >
            {/* Visual Canvas / Gradient Poster */}
            <div
              className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden mb-6 flex flex-col justify-between p-6 transition-transform duration-700 group-hover:scale-[1.02]"
              style={{
                background: `linear-gradient(135deg, ${project.imagePlaceholder.gradientFrom}, ${project.imagePlaceholder.gradientTo})`,
              }}
            >
              <div className="flex items-center justify-between z-10">
                <span className="font-mono text-xs uppercase px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-white border border-white/15">
                  {project.imagePlaceholder.badge}
                </span>
                <span className="font-mono text-xs text-white/70">
                  {project.year}
                </span>
              </div>

              <div className="z-10">
                <h4 className="font-grotesk text-2xl md:text-3xl font-bold text-white tracking-tight drop-shadow-md">
                  {project.imagePlaceholder.headline}
                </h4>
              </div>

              {/* Overlay glow */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Meta & Info */}
            <div className="flex flex-col flex-1 justify-between">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h3 className="font-grotesk text-2xl font-bold text-white tracking-tight group-hover:text-[#9bf35a] transition-colors">
                    {project.title}
                  </h3>
                  <div className="p-2 rounded-full bg-white/5 group-hover:bg-[#9bf35a] group-hover:text-black transition-all">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                <p className="font-grotesk text-sm text-zinc-400 line-clamp-2 leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[11px] px-2.5 py-1 rounded-md bg-white/5 text-zinc-300 border border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Links */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                <span className="text-zinc-500">
                  0{idx + 1} / {project.client}
                </span>

                <div className="flex items-center gap-3">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1 text-zinc-300 hover:text-[#9bf35a] transition-colors"
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
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1 text-zinc-400 hover:text-white transition-colors"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>Code</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* 3. Bottom Note */}
      <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono text-xs text-zinc-400">
        <p className="font-grotesk text-sm text-zinc-400 max-w-2xl m-0">
          They open fast on any phone, don’t break when lots of people visit, and feel smooth to use. I stay on after launch to keep them that way.
        </p>
        <span className="text-zinc-500">All live builds verified</span>
      </div>
    </section>
  );
};
