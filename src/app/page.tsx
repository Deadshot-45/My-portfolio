'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { InViewSection } from '../components/InViewSection';
import {
  Project,
  SkyMode,
  ClientMark,
  ClientReview,
  UserProfile,
  ExperienceItem,
  ServiceItem,
} from '../types/index';
import {
  PROJECTS,
  SERVICES,
  CLIENT_MARKS,
  CLIENT_REVIEWS,
  USER_PROFILE,
  WORK_EXPERIENCE,
} from '../data/portfolioData';

// On-demand dynamic imports: chunks are loaded only when the section approaches viewport
const ServicesIntro = dynamic(
  () => import('../components/ServicesIntro').then((m) => m.ServicesIntro),
  { ssr: false }
);

const WhyCustom = dynamic(
  () => import('../components/WhyCustom').then((m) => m.WhyCustom),
  { ssr: false }
);

const SelectedWork = dynamic(
  () => import('../components/SelectedWork').then((m) => m.SelectedWork),
  { ssr: false }
);

const ClientsSection = dynamic(
  () => import('../components/ClientsSection').then((m) => m.ClientsSection),
  { ssr: false }
);

const ProcessSection = dynamic(
  () => import('../components/ProcessSection').then((m) => m.ProcessSection),
  { ssr: false }
);

const ExperienceSection = dynamic(
  () => import('../components/ExperienceSection').then((m) => m.ExperienceSection),
  { ssr: false }
);

const LaptopShowcase = dynamic(
  () => import('../components/LaptopShowcase').then((m) => m.LaptopShowcase),
  { ssr: false }
);

const Footer = dynamic(
  () => import('../components/Footer').then((m) => m.Footer),
  { ssr: false }
);

// Modals are loaded strictly on-demand when activated
const InquiryModal = dynamic(
  () => import('../components/InquiryModal').then((m) => m.InquiryModal),
  { ssr: false }
);

const ProjectDetailModal = dynamic(
  () => import('../components/ProjectDetailModal').then((m) => m.ProjectDetailModal),
  { ssr: false }
);

interface PortfolioApiPayload {
  projects: Project[];
  services: ServiceItem[];
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
    services: SERVICES,
    clients: CLIENT_MARKS,
    testimonials: CLIENT_REVIEWS,
    profile: USER_PROFILE,
    experiences: WORK_EXPERIENCE,
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-sky', skyMode);
  }, [skyMode]);

  // Fetch live CMS data (Sanity / MongoDB) via /api/portfolio
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
            services: json.data.services?.length ? json.data.services : SERVICES,
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
      {/* 1. Header / Navbar - Always loaded immediately */}
      <Navbar
        onOpenInquiry={() => handleOpenInquiry()}
        skyMode={skyMode}
        onSkyModeChange={setSkyMode}
      />

      <main id="main-content">
        {/* 2. Hero Section - Always loaded immediately above the fold */}
        <Hero
          onOpenInquiry={() => handleOpenInquiry()}
          skyMode={skyMode}
          onSkyModeChange={setSkyMode}
          profile={portfolioData.profile}
        />

        {/* 3. Services Overview - Rendered on demand using CMS services */}
        <InViewSection id="services-intro" minHeight="360px">
          <ServicesIntro services={portfolioData.services} />
        </InViewSection>

        {/* 4. Why Custom: Editorial Value & Live Testimonials from CMS */}
        <InViewSection id="why" minHeight="520px">
          <WhyCustom testimonials={portfolioData.testimonials} />
        </InViewSection>

        {/* 5. Selected Work: Live Projects from CMS */}
        <InViewSection id="work" minHeight="720px">
          <SelectedWork
            onSelectProject={setSelectedProject}
            projects={portfolioData.projects}
          />
        </InViewSection>

        {/* 6. Clients & Offerings: Client Ticker & Capability Matrix from CMS */}
        <InViewSection id="clients" minHeight="480px">
          <ClientsSection
            onSelectService={(serviceName) => handleOpenInquiry(serviceName)}
            clients={portfolioData.clients}
            services={portfolioData.services}
          />
        </InViewSection>

        {/* 7. Working Process: 4-Step Sprint Framework */}
        <InViewSection id="process" minHeight="520px">
          <ProcessSection />
        </InViewSection>

        {/* 8. Work Experience & Engineering Track Record from CMS */}
        <InViewSection id="experience" minHeight="560px">
          <ExperienceSection
            theme="dark"
            experiences={portfolioData.experiences}
          />
        </InViewSection>

        {/* 9. Interactive 3D Laptop Showcase */}
        <InViewSection id="showcase" minHeight="90svh">
          <LaptopShowcase />
        </InViewSection>

        {/* 10. Footer & Direct Contact Form Trigger */}
        <InViewSection id="contact" minHeight="420px">
          <Footer
            onOpenInquiry={() => handleOpenInquiry()}
            profile={portfolioData.profile}
          />
        </InViewSection>
      </main>

      {/* Interactive Modals - Code split and mounted strictly on demand when opened */}
      {isInquiryOpen && (
        <InquiryModal
          isOpen={isInquiryOpen}
          onClose={() => setIsInquiryOpen(false)}
          defaultProjectTitle={inquiryDefaultTitle}
          theme="dark"
        />
      )}

      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onStartSimilar={(title) => handleOpenInquiry(`Similar to ${title}`)}
          theme="dark"
        />
      )}
    </div>
  );
}
