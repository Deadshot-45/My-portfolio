'use client';

import { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { LaptopShowcase } from '../components/LaptopShowcase';
import { Footer } from '../components/Footer';
import { InquiryModal } from '../components/InquiryModal';
import { ProjectDetailModal } from '../components/ProjectDetailModal';
import { Project, SkyMode } from '../types/index';

export default function Home() {
  const [skyMode, setSkyMode] = useState<SkyMode>('sunset');
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [inquiryDefaultTitle, setInquiryDefaultTitle] = useState<string>('');

  useEffect(() => {
    document.documentElement.setAttribute('data-sky', skyMode);
  }, [skyMode]);

  const handleOpenInquiry = (defaultTitle?: string) => {
    setInquiryDefaultTitle(defaultTitle || '');
    setIsInquiryOpen(true);
  };

  return (
    <div
      data-sky={skyMode}
      className="relative min-h-screen bg-[#07070a] text-white selection:bg-[#9bf35a] selection:text-black font-sans"
    >
      {/* 1. Header / Navbar */}
      <Navbar
        onOpenInquiry={() => handleOpenInquiry()}
        skyMode={skyMode}
        onSkyModeChange={setSkyMode}
      />

      <main id="main-content">
        {/* 2. Hero Section */}
        <Hero
          onOpenInquiry={() => handleOpenInquiry()}
          skyMode={skyMode}
          onSkyModeChange={setSkyMode}
        />

        {/* 3. LaptopShowcase: White Surface */}
        <LaptopShowcase />

        {/* 4. Footer Section */}
        <Footer onOpenInquiry={() => handleOpenInquiry()} />
      </main>

      {/* Interactive Modals */}
      <InquiryModal
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
        defaultProjectTitle={inquiryDefaultTitle}
        theme="dark"
      />

      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onStartSimilar={(title) => handleOpenInquiry(`Similar to ${title}`)}
        theme="dark"
      />
    </div>
  );
}
