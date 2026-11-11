'use client';

import { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { TechnicalArsenal } from '../components/TechnicalArsenal';
import { SelectedWork } from '../components/SelectedWork';
import { ExperienceSection } from '../components/ExperienceSection';
import { CoreCapabilities } from '../components/CoreCapabilities';
import { CraftSection } from '../components/CraftSection';
import { ProcessSection } from '../components/ProcessSection';
import { FAQ } from '../components/FAQ';
import { Footer } from '../components/Footer';
import { InquiryModal } from '../components/InquiryModal';
import { ProjectDetailModal } from '../components/ProjectDetailModal';
import { Project, ThemeMode } from '../types/index';

export default function Home() {
  const [theme, setTheme] = useState<ThemeMode>('dark');
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [inquiryDefaultTitle, setInquiryDefaultTitle] = useState<string>('');

  // Persist theme selection
  useEffect(() => {
    try {
      const saved = localStorage.getItem('mayank_portfolio_theme') as ThemeMode | null;
      if (saved === 'dark' || saved === 'light') {
        setTheme(saved);
      }
    } catch {
      // safe fallback
    }
  }, []);

  const handleToggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    try {
      localStorage.setItem('mayank_portfolio_theme', nextTheme);
    } catch {
      // safe fallback
    }
  };

  const handleOpenInquiry = (defaultTitle?: string) => {
    setInquiryDefaultTitle(defaultTitle || '');
    setIsInquiryOpen(true);
  };

  const isDark = theme === 'dark';

  return (
    <div
      className={`relative min-h-screen transition-colors duration-500 font-sans selection:bg-emerald-500 selection:text-black ${
        isDark ? 'bg-[#09090b] text-zinc-100' : 'bg-[#fafafa] text-zinc-900'
      }`}
    >
      {/* 1. Header / Navbar with Dark/Light Toggle */}
      <Navbar
        onOpenInquiry={() => handleOpenInquiry()}
        theme={theme}
        onToggleTheme={handleToggleTheme}
      />

      <main>
        {/* 2. Hero Section (Authentic Headline, Key Metrics, IST Clock & 3D WebGL Element) */}
        <Hero
          onOpenInquiry={() => handleOpenInquiry()}
          theme={theme}
        />

        {/* 3. Featured Engineering Projects (iMessage Web, CRM Platform, Vault-Vogue, Psych-Up) */}
        <SelectedWork
          onSelectProject={(project) => setSelectedProject(project)}
          theme={theme}
        />

        {/* 4. Technical Arsenal & Skill Groups */}
        <TechnicalArsenal theme={theme} />

        {/* 5. Professional Work Experience & Education Track Record */}
        <ExperienceSection theme={theme} />

        {/* 6. Core Engineering Capabilities */}
        <CoreCapabilities
          onSelectService={(service) => handleOpenInquiry(`Inquiry regarding ${service}`)}
          theme={theme}
        />

        {/* 7. Architecture & Real-Time WebGL Craft */}
        <CraftSection theme={theme} />

        {/* 8. Software Engineering Lifecycle (Architect -> Engine -> Interface -> Deploy) */}
        <ProcessSection theme={theme} />

        {/* 9. Frequently Asked Questions */}
        <FAQ theme={theme} />
      </main>

      {/* 10. Footer / Contact Details */}
      <Footer
        onOpenInquiry={() => handleOpenInquiry()}
        theme={theme}
      />

      {/* Interactive Modals */}
      <InquiryModal
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
        defaultProjectTitle={inquiryDefaultTitle}
        theme={theme}
      />

      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onStartSimilar={(title) => handleOpenInquiry(`Similar to ${title}`)}
        theme={theme}
      />
    </div>
  );
}
