'use client';

import { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { ServicesIntro } from '../components/ServicesIntro';
import { WhyCustom } from '../components/WhyCustom';
import { SelectedWork } from '../components/SelectedWork';
import { ClientsSection } from '../components/ClientsSection';
import { ProcessSection } from '../components/ProcessSection';
import { ExperienceSection } from '../components/ExperienceSection';
import { LaptopShowcase } from '../components/LaptopShowcase';
import { Footer } from '../components/Footer';
import { InquiryModal } from '../components/InquiryModal';
import { ProjectDetailModal } from '../components/ProjectDetailModal';
import {
  Project,
  SkyMode,
  ClientMark,
  ClientReview,
  UserProfile,
  ExperienceItem,
} from '../types/index';
import {
  PROJECTS,
  CLIENT_MARKS,
  CLIENT_REVIEWS,
  USER_PROFILE,
  WORK_EXPERIENCE,
} from '../data/portfolioData';

interface PortfolioApiPayload {
  projects: Project[];
  clients: ClientMark[];
  testimonials: ClientReview[];
  profile: UserProfile;
  experiences: ExperienceItem[];
}

export default function Home() {
  const [skyMode, setSkyMode] = useState<SkyMode>('sunset');
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [inquiryDefaultTitle, setInquiryDefaultTitle] = useState<string>('');

  // Live state initialized with authoritative static defaults for zero layout shift
  const [portfolioData, setPortfolioData] = useState<PortfolioApiPayload>({
    projects: PROJECTS,
    clients: CLIENT_MARKS,
    testimonials: CLIENT_REVIEWS,
    profile: USER_PROFILE,
    experiences: WORK_EXPERIENCE,
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-sky', skyMode);
  }, [skyMode]);

  // Fetch live API data from MongoDB via /api/portfolio
  useEffect(() => {
    let isMounted = true;
    fetch('/api/portfolio')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((json) => {
        if (isMounted && json?.success && json?.data) {
          setPortfolioData({
            projects: json.data.projects?.length ? json.data.projects : PROJECTS,
            clients: json.data.clients?.length ? json.data.clients : CLIENT_MARKS,
            testimonials: json.data.testimonials?.length ? json.data.testimonials : CLIENT_REVIEWS,
            profile: json.data.profile || USER_PROFILE,
            experiences: json.data.experiences?.length ? json.data.experiences : WORK_EXPERIENCE,
          });
        }
      })
      .catch((err) => {
        // Fallback to static defaults gracefully
        console.warn('[Home] Using static portfolio fallback:', err);
      });

    return () => {
      isMounted = false;
    };
  }, []);

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
          profile={portfolioData.profile}
        />

        {/* 3. Services Overview */}
        <ServicesIntro />

        {/* 4. Why Custom: Editorial Value & Live Testimonials */}
        <WhyCustom testimonials={portfolioData.testimonials} />

        {/* 5. Selected Work: Live Projects from MongoDB / CMS */}
        <SelectedWork
          onSelectProject={setSelectedProject}
          projects={portfolioData.projects}
        />

        {/* 6. Clients & Offerings: Client Ticker & Capability Matrix */}
        <ClientsSection
          onSelectService={(serviceName) => handleOpenInquiry(serviceName)}
          clients={portfolioData.clients}
        />

        {/* 7. Working Process: 4-Step Sprint Framework */}
        <ProcessSection />

        {/* 8. Work Experience & Engineering Track Record */}
        <ExperienceSection
          theme="dark"
          experiences={portfolioData.experiences}
        />

        {/* 9. Interactive 3D Laptop Showcase */}
        <LaptopShowcase />

        {/* 10. Footer & Direct Contact Form Trigger */}
        <Footer
          onOpenInquiry={() => handleOpenInquiry()}
          profile={portfolioData.profile}
        />
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
