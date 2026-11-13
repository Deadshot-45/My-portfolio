'use client';

import React from 'react';
import { Project, ThemeMode } from '../types/index';
import { X, ExternalLink, Github, CheckCircle2, Zap, Layers, ArrowUpRight } from 'lucide-react';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
  onStartSimilar: (projectTitle: string) => void;
  theme?: ThemeMode;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onStartSimilar,
  theme = 'dark',
}) => {
  if (!project) return null;
  const isDark = theme === 'dark';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className={`relative w-full max-w-3xl my-8 rounded-3xl border shadow-2xl overflow-hidden ${
        isDark ? 'bg-zinc-900 border-zinc-750 text-white' : 'bg-white border-zinc-200 text-zinc-950'
      }`}>
        
        {/* Top Header Graphic Banner */}
        <div className={`p-6 sm:p-8 border-b ${
          isDark ? 'border-zinc-800 bg-zinc-950/70' : 'border-zinc-200 bg-zinc-100/70'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono font-bold tracking-wider uppercase text-emerald-500">
              {project.categoryLabel}
            </span>

            <button
              onClick={onClose}
              className={`p-2 rounded-xl border transition-colors ${
                isDark ? 'border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800' : 'border-zinc-300 text-zinc-600 hover:text-zinc-950 hover:bg-zinc-200'
              }`}
              aria-label="Close Case Study"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <h2 className={`text-2xl sm:text-4xl font-extrabold tracking-tight ${
            isDark ? 'text-white' : 'text-zinc-950'
          }`}>
            {project.title}
          </h2>
          <p className={`text-sm font-mono mt-1 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
            {project.subtitle || project.categoryLabel || project.client}
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-7">
          
          {/* Key Metrics */}
          <div>
            <h4 className={`text-xs font-mono uppercase tracking-wider mb-3 ${
              isDark ? 'text-zinc-400' : 'text-zinc-600'
            }`}>
              Verified Architecture Outcomes
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {project.metrics.map((m, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border ${
                    isDark ? 'bg-zinc-950/50 border-zinc-800' : 'bg-zinc-50 border-zinc-200'
                  }`}
                >
                  <span className={`text-xl font-extrabold font-mono ${
                    isDark ? 'text-white' : 'text-zinc-950'
                  }`}>
                    {m.value}
                  </span>
                  <span className={`text-xs block mt-1 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                    {m.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Deep Dive Description */}
          <div>
            <h4 className={`text-xs font-mono uppercase tracking-wider mb-2 ${
              isDark ? 'text-zinc-400' : 'text-zinc-600'
            }`}>
              Technical Architecture & Implementation
            </h4>
            <p className={`text-sm sm:text-base leading-relaxed ${
              isDark ? 'text-zinc-300' : 'text-zinc-700'
            }`}>
              {project.longDescription}
            </p>
          </div>

          {/* Key Deliverables */}
          <div>
            <h4 className={`text-xs font-mono uppercase tracking-wider mb-3 ${
              isDark ? 'text-zinc-400' : 'text-zinc-600'
            }`}>
              Key Deliverables Shipped
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.deliverables.map((item, idx) => (
                <div
                  key={idx}
                  className={`flex items-center gap-2.5 p-3 rounded-xl border text-xs ${
                    isDark ? 'bg-zinc-950/40 border-zinc-800 text-zinc-300' : 'bg-zinc-50 border-zinc-200 text-zinc-700'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div>
            <h4 className={`text-xs font-mono uppercase tracking-wider mb-2.5 ${
              isDark ? 'text-zinc-400' : 'text-zinc-600'
            }`}>
              Technologies & Infrastructure
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className={`px-3 py-1 rounded-lg text-xs font-mono border ${
                    isDark ? 'bg-zinc-800/60 border-zinc-700 text-zinc-300' : 'bg-zinc-100 border-zinc-300 text-zinc-800'
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Modal Action Links */}
          <div className="pt-6 border-t border-zinc-800/60 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    isDark
                      ? 'bg-emerald-500 hover:bg-emerald-400 text-black'
                      : 'bg-emerald-600 hover:bg-emerald-500 text-white'
                  }`}
                >
                  <span>Open Live Application</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-mono border transition-all ${
                    isDark
                      ? 'bg-zinc-800 hover:bg-zinc-700 border-zinc-700 text-zinc-300'
                      : 'bg-zinc-100 hover:bg-zinc-200 border-zinc-300 text-zinc-800'
                  }`}
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>View GitHub</span>
                </a>
              )}
            </div>

            <button
              onClick={() => {
                onClose();
                onStartSimilar(project.title);
              }}
              className={`inline-flex items-center gap-1.5 px-5 py-2 rounded-xl font-bold text-xs transition-all active:scale-95 ${
                isDark ? 'bg-white hover:bg-zinc-200 text-black' : 'bg-zinc-950 hover:bg-zinc-800 text-white'
              }`}
            >
              <span>Discuss Similar Project</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
