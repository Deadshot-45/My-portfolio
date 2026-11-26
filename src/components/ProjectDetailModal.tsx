'use client';

import React, { useState } from 'react';
import { Project, ThemeMode } from '../types/index';
import { X, ExternalLink, Github, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { getProjectPreviewUrl, cleanDisplayUrl } from '../utils/portfolioUtils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import Image from 'next/image';

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
  const isDark = theme === 'dark';
  const [modalImgLoaded, setModalImgLoaded] = useState(false);
  const [modalImgError, setModalImgError] = useState(false);
  const previewUrl = project ? getProjectPreviewUrl(project) : undefined;

  return (
    <Dialog open={Boolean(project)}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      {project && (
        <DialogContent
          showCloseButton={false}
          className={`w-[calc(100%-1.5rem)] sm:max-w-3xl p-0 overflow-hidden rounded-3xl border shadow-2xl max-h-[min(90dvh,calc(100dvh-3.5rem))] flex flex-col min-h-0 gap-0 ${
            isDark
              ? "bg-zinc-950/95 border-white/10 text-white backdrop-blur-xl shadow-[0_0_50px_rgba(0,0,0,0.7)]"
              : "bg-white/95 border-zinc-200/80 text-zinc-950 backdrop-blur-xl shadow-2xl"
          }`}
        >
          {/* Top Header Graphic Banner */}
          <DialogHeader
            className={`p-5 sm:p-8 border-b space-y-0 text-left shrink-0 ${
              isDark
                ? "border-white/10 bg-zinc-950/70"
                : "border-zinc-200/80 bg-zinc-100/70"
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono font-bold tracking-wider uppercase text-emerald-500">
                {project.categoryLabel}
              </span>

              <button
                type="button"
                onClick={onClose}
                className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                  isDark
                    ? "border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800"
                    : "border-zinc-300 text-zinc-600 hover:text-zinc-950 hover:bg-zinc-200"
                }`}
                aria-label="Close Case Study"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <DialogTitle
              className={`text-2xl sm:text-4xl font-extrabold tracking-tight ${
                isDark ? "text-white" : "text-zinc-950"
              }`}
            >
              {project.title}
            </DialogTitle>
            <DialogDescription
              className={`text-sm font-mono mt-1 ${isDark ? "text-zinc-400" : "text-zinc-600"}`}
            >
              {project.subtitle || project.categoryLabel || project.client}
            </DialogDescription>
          </DialogHeader>

          {/* Content Body */}
          <div className="p-5 sm:p-8 space-y-7 overflow-y-auto flex-1 min-h-0 overscroll-contain">
            {/* Website Live Preview Mockup */}
            {getProjectPreviewUrl(project) && (
              <div className="rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950 shadow-xl flex flex-col">
                <div className="h-8 px-3.5 bg-zinc-900/90 border-b border-zinc-800 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]/80" />
                  </div>
                  {project.liveUrl && (
                    <span className="text-zinc-400 text-[11px] truncate max-w-50 sm:max-w-xs">
                      {cleanDisplayUrl(project.liveUrl)}
                    </span>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 text-[11px]"
                    >
                      <span>Live Site</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
                <div className="relative aspect-video w-full overflow-hidden bg-zinc-950 flex flex-col justify-between">
                  {/* High-Fidelity Mockup Background */}
                  <div
                    className="absolute inset-0 w-full h-full p-4 sm:p-6 flex flex-col justify-between select-none overflow-hidden"
                    style={{
                      background: `linear-gradient(135deg, ${project.imagePlaceholder?.gradientFrom || "#09090b"}, ${project.imagePlaceholder?.gradientTo || "#18181b"})`,
                    }}
                  >
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <div className="flex items-center gap-2">
                        <span className="w-4 h-4 rounded-md bg-[#9bf35a]/20 border border-[#9bf35a]/40 flex items-center justify-center text-[8px] font-mono font-bold text-[#9bf35a]">
                          ▲
                        </span>
                        <span className="text-xs font-mono font-semibold text-white/90">
                          {project.title}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-zinc-400 px-2 py-0.5 rounded bg-white/5">
                        Production Live
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 sm:gap-3 my-auto py-2">
                      {(project.metrics && project.metrics.length > 0
                        ? project.metrics.slice(0, 3)
                        : [
                            { label: "Uptime", value: "99.9%" },
                            { label: "Latency", value: "<80ms" },
                            { label: "Status", value: "Production" },
                          ]
                      ).map((m, i) => (
                        <div
                          key={i}
                          className="p-2 sm:p-3 rounded-xl bg-white/4 border border-white/10 backdrop-blur-xs flex flex-col justify-between"
                        >
                          <span className="text-[9px] font-mono uppercase tracking-wider text-zinc-400 truncate">
                            {m.label}
                          </span>
                          <span className="text-xs sm:text-base font-grotesk font-bold text-white mt-1 truncate">
                            {m.value}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="rounded-lg bg-black/40 border border-white/5 p-2 flex items-center justify-between text-xs font-mono">
                      <div className="flex items-center gap-1.5 truncate">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                        <span className="text-zinc-300 truncate">
                          {project.imagePlaceholder?.headline ||
                            project.description}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Screenshot Image Overlay */}
                  {previewUrl && !modalImgError && (
                    <Image
                      src={previewUrl}
                      alt={`${project.title} Preview`}
                      fill
                      unoptimized
                      className={`object-cover object-top transition-all duration-700 ${
                        modalImgLoaded ? "opacity-100" : "opacity-0"
                      }`}
                      loading="lazy"
                      onLoad={() => setModalImgLoaded(true)}
                      onError={() => setModalImgError(true)}
                    />
                  )}

                </div>
              </div>
            )}

            {/* Key Metrics */}
            <div>
              <h4
                className={`text-xs font-mono uppercase tracking-wider mb-3 ${
                  isDark ? "text-zinc-400" : "text-zinc-600"
                }`}
              >
                Verified Architecture Outcomes
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {project.metrics.map((m, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-2xl border ${
                      isDark
                        ? "bg-zinc-950/50 border-zinc-800"
                        : "bg-zinc-50 border-zinc-200"
                    }`}
                  >
                    <span
                      className={`text-xl font-extrabold font-mono ${
                        isDark ? "text-white" : "text-zinc-950"
                      }`}
                    >
                      {m.value}
                    </span>
                    <span
                      className={`text-xs block mt-1 ${isDark ? "text-zinc-400" : "text-zinc-600"}`}
                    >
                      {m.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Deep Dive Description */}
            <div>
              <h4
                className={`text-xs font-mono uppercase tracking-wider mb-2 ${
                  isDark ? "text-zinc-400" : "text-zinc-600"
                }`}
              >
                Technical Architecture & Implementation
              </h4>
              <p
                className={`text-sm sm:text-base leading-relaxed ${
                  isDark ? "text-zinc-300" : "text-zinc-700"
                }`}
              >
                {project.longDescription}
              </p>
            </div>

            {/* Key Deliverables */}
            <div>
              <h4
                className={`text-xs font-mono uppercase tracking-wider mb-3 ${
                  isDark ? "text-zinc-400" : "text-zinc-600"
                }`}
              >
                Key Deliverables Shipped
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {project.deliverables.map((item, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center gap-2.5 p-3 rounded-xl border text-xs ${
                      isDark
                        ? "bg-zinc-950/40 border-zinc-800 text-zinc-300"
                        : "bg-zinc-50 border-zinc-200 text-zinc-700"
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
              <h4
                className={`text-xs font-mono uppercase tracking-wider mb-2.5 ${
                  isDark ? "text-zinc-400" : "text-zinc-600"
                }`}
              >
                Technologies & Infrastructure
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`px-3 py-1 rounded-lg text-xs font-mono border ${
                      isDark
                        ? "bg-zinc-800/60 border-zinc-700 text-zinc-300"
                        : "bg-zinc-100 border-zinc-300 text-zinc-800"
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Action Links */}
            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3.5 pb-6">
              <div className="flex flex-wrap items-center gap-2.5">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex-1 sm:flex-initial text-center ${
                      isDark
                        ? "bg-emerald-500 hover:bg-emerald-400 text-black"
                        : "bg-emerald-600 hover:bg-emerald-500 text-white"
                    }`}
                  >
                    <span className="whitespace-nowrap">
                      Open Live Application
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                  </a>
                )}

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-mono border transition-all flex-1 sm:flex-initial text-center ${
                      isDark
                        ? "bg-zinc-800 hover:bg-zinc-700 border-zinc-700 text-zinc-300"
                        : "bg-zinc-100 hover:bg-zinc-200 border-zinc-300 text-zinc-800"
                    }`}
                  >
                    <Github className="w-3.5 h-3.5 shrink-0" />
                    <span className="whitespace-nowrap">View GitHub</span>
                  </a>
                )}
              </div>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  onStartSimilar(project.title);
                }}
                className={`inline-flex items-center justify-center gap-1.5 px-5 py-3 rounded-xl font-bold text-xs transition-all active:scale-95 cursor-pointer w-full sm:w-auto shrink-0 whitespace-nowrap ${
                  isDark
                    ? "bg-white hover:bg-zinc-200 text-black"
                    : "bg-zinc-950 hover:bg-zinc-800 text-white"
                }`}
              >
                <span className="whitespace-nowrap">
                  Discuss Similar Project
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
              </button>
            </div>

            {/* Bottom scroll clearance buffer for mobile viewports */}
            <div className="h-6 sm:h-2" aria-hidden="true" />
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
};
