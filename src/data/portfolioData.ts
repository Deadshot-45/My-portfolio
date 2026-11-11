import { Project, ServiceItem, ProcessStep, ExperienceItem, TechnicalSkillGroup, UserProfile } from '../types/index';

export const USER_PROFILE: UserProfile = {
  name: 'Mayank Sahu',
  role: 'Full-Stack Developer (MERN / Next.js / TypeScript)',
  location: 'Indore, Madhya Pradesh, India',
  email: 'mayanksahu8179@gmail.com',
  phone: '+91 93019 09040',
  github: 'https://github.com/Deadshot-45',
  linkedin: 'https://linkedin.com/in/mayank-sahu-ou',
  summary:
    'Full-stack software developer with hands-on production experience across React.js/Next.js, Node.js/Express.js, and databases including PostgreSQL, MongoDB, Redis, and Neon DB. Experienced in building real-time Socket.io systems, engineering atomic component libraries, reducing LCP by 18%, and eliminating 40% of redundant API calls.',
};

export const KEY_METRICS = [
  { label: 'LCP Reduction', value: '18%', desc: 'Core Web Vitals tuning via code-splitting & memoization' },
  { label: 'API Calls Cut', value: '40%', desc: 'TanStack Query cache restructuring & client data flow' },
  { label: 'Delivery Velocity', value: '+20%', desc: 'Accelerated cycles via Atomic Design component library' },
  { label: 'System Uptime', value: '99.9%', desc: 'Production IT systems infrastructure at TCI Express' },
];

export const SKILL_GROUPS: TechnicalSkillGroup[] = [
  {
    category: 'Frontend & UI Systems',
    skills: ['React 19', 'Next.js (App Router)', 'TypeScript', 'Tailwind CSS', 'shadcn/ui', 'Atomic Design', 'HTML5 / CSS3'],
  },
  {
    category: 'State & Data Layer',
    skills: ['TanStack Query (React Query)', 'Zustand', 'Redux Toolkit', 'Context API'],
  },
  {
    category: 'Backend & Real-Time',
    skills: ['Node.js', 'Express.js', 'Socket.io', 'RESTful API Architecture', 'WebSockets'],
  },
  {
    category: 'Databases & Caching',
    skills: ['PostgreSQL', 'MongoDB', 'Prisma ORM', 'Neon DB', 'Redis', 'SQL / MySQL'],
  },
  {
    category: 'Auth & Security',
    skills: ['JWT (Access & Refresh Tokens)', 'HTTP-Only Cookies', 'Role-Based Access Control (RBAC)', 'Bcrypt'],
  },
  {
    category: 'DevOps & Tooling',
    skills: ['Git', 'GitHub', 'Docker', 'GitHub Actions CI/CD', 'Postman', 'Vercel', 'Render'],
  },
];

export const PROJECTS: Project[] = [
  {
    id: 'imessage-web',
    title: 'iMessage Web',
    subtitle: 'Real-Time macOS-Inspired Web Chat Application',
    category: 'realtime',
    categoryLabel: 'Real-Time / WebSockets',
    description:
      'Production-grade real-time chat application inspired by macOS iMessage. Engineered with Socket.io, optimistic UI updates, three-tier delivery state machine, and Redis caching.',
    longDescription:
      'Built a production-ready, macOS-inspired real-time chat application featuring Socket.io for instantaneous bidirectional event streaming. Implemented a deterministic three-tier message delivery state machine (sent, delivered, seen), optimistic client UI updates with error-rollback, JWT authentication with secure HTTP-only cookies, and Redis pub/sub caching. Fully containerized with Docker and automated via GitHub Actions CI/CD.',
    tags: ['React 19', 'TypeScript', 'Zustand', 'Socket.io', 'Node.js', 'Express 5', 'MongoDB', 'Redis', 'Docker'],
    metrics: [
      { label: 'Message Delivery', value: '3-Tier State' },
      { label: 'Event Engine', value: 'Socket.io + Redis' },
      { label: 'Deployment', value: 'Docker & Render' },
    ],
    deliverables: [
      'Bidirectional Socket.io WebSocket Layer',
      'Optimistic Client UI with State Machine',
      'Redis Caching & Dockerized Container Pipeline',
    ],
    liveUrl: 'https://imessage-hydf.onrender.com',
    githubUrl: 'https://github.com/Deadshot-45',
    accentColor: '#0284c7',
    featured: true,
  },
  {
    id: 'crm-platform',
    title: 'CRM Management Platform',
    subtitle: 'Enterprise Role-Based Lead Management System',
    category: 'crm',
    categoryLabel: 'Enterprise CRM / RBAC',
    description:
      'Multi-role sales CRM where Team Leaders assign incoming leads to Sales Executives, who track follow-ups and conversion pipelines with Prisma ORM and PostgreSQL.',
    longDescription:
      'Architected an enterprise CRM system with strict role-based access control (RBAC). Team Leaders manage sales pipelines, assign leads, and monitor executive conversion metrics; Sales Executives log call notes, schedule follow-ups, and update stage status. Backed by relational PostgreSQL on Neon DB via Prisma ORM, featuring secure refresh and access token rotation.',
    tags: ['Next.js', 'Express.js', 'PostgreSQL', 'Prisma ORM', 'Neon DB', 'RBAC', 'JWT'],
    metrics: [
      { label: 'Access Control', value: 'Multi-Role RBAC' },
      { label: 'Database', value: 'PostgreSQL / Neon' },
      { label: 'ORM Architecture', value: 'Prisma Client' },
    ],
    deliverables: [
      'Hierarchical Role Pipelines (Team Lead / Sales Exec)',
      'Relational PostgreSQL Schema via Prisma',
      'Secure Token Rotation Authentication',
    ],
    liveUrl: 'https://crm-management-zrog.vercel.app/',
    githubUrl: 'https://github.com/Deadshot-45',
    accentColor: '#059669',
    featured: true,
  },
  {
    id: 'vault-vogue',
    title: 'Vault-Vogue',
    subtitle: 'Premium E-Commerce Application (MERN Stack)',
    category: 'ecommerce',
    categoryLabel: 'Full-Stack E-Commerce',
    description:
      'Independent full-stack digital storefront with responsive product catalog, Redux Toolkit cart state, RESTful API services, and MongoDB schema.',
    longDescription:
      'Independently developed and deployed the full stack for Vault-Vogue, a luxury e-commerce application. Crafted responsive product displays, filterable categories, resilient cart persistence using Redux Toolkit, and comprehensive RESTful API endpoints written in Express.js and backed by MongoDB.',
    tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Redux Toolkit', 'Tailwind CSS'],
    metrics: [
      { label: 'State Layer', value: 'Redux Toolkit' },
      { label: 'API Backend', value: 'Express REST' },
      { label: 'Deployment', value: 'Vercel Production' },
    ],
    deliverables: [
      'Responsive E-Commerce Storefront UI',
      'Full-Stack RESTful API Services',
      'MongoDB Catalog & Cart Schema',
    ],
    liveUrl: 'https://vault-vogue-lite.vercel.app/',
    githubUrl: 'https://github.com/Deadshot-45',
    accentColor: '#d97706',
    featured: true,
  },
  {
    id: 'psych-up',
    title: 'Psych-Up Healthcare Platform',
    subtitle: 'Healthcare Platform at LincPay Solution Pvt. Ltd.',
    category: 'fullstack',
    categoryLabel: 'Healthcare / Architecture',
    description:
      'Clinical and patient management platform cutting redundant API calls by 40% with TanStack Query and enforcing RBAC across 5 distinct user roles.',
    longDescription:
      'Built for LincPay Solution Pvt. Ltd., Psych-Up is a comprehensive healthcare management platform. Implemented advanced TanStack Query caching that reduced redundant API calls by 40%, engineered role-based access control across 5 distinct user roles, and integrated with a custom Atomic Design component library.',
    tags: ['React', 'TypeScript', 'TanStack Query', 'RBAC', 'RESTful APIs', 'Atomic Design'],
    metrics: [
      { label: 'API Redundancy', value: '-40% Network Calls' },
      { label: 'Security Model', value: '5 User Roles' },
      { label: 'Design System', value: 'Atomic Principles' },
    ],
    deliverables: [
      'TanStack Query Layered Cache Engine',
      '5-Role Access Control Matrix',
      'Reusable Atomic Design UI Tokens',
    ],
    githubUrl: 'https://github.com/Deadshot-45',
    accentColor: '#7c3aed',
    featured: true,
  },
];

export const WORK_EXPERIENCE: ExperienceItem[] = [
  {
    id: 'lincpay',
    role: 'React Developer (Intern)',
    company: 'LincPay Solution Pvt. Ltd.',
    location: 'Bhopal, India',
    period: 'Dec 2025 – Apr 2026',
    summary:
      'Drove frontend performance engineering, constructed an Atomic Design component system, and shipped core features for a multi-role healthcare platform.',
    achievements: [
      'Architected an application-wide performance optimization strategy using React.memo, useMemo, and dynamic imports (code-splitting), reducing Largest Contentful Paint (LCP) by 18% and improving Core Web Vitals.',
      'Engineered a centralized UI component library in React and TypeScript based on Atomic Design principles, accelerating multi-role feature delivery cycles by 20%.',
      'Built Psych-Up, a healthcare management platform (React, TypeScript, TanStack Query), cutting redundant API calls by 40% and implementing RBAC across 5 user roles.',
    ],
    technologies: ['React', 'TypeScript', 'TanStack Query', 'Atomic Design', 'Performance', 'RBAC'],
  },
  {
    id: 'tci-express',
    role: 'IT Systems Engineer',
    company: 'TCI Express Ltd',
    location: 'Chennai, India',
    period: 'Apr 2025 – Nov 2025',
    summary:
      'Guaranteed high infrastructure availability while transitioning technical specialization toward MERN full-stack development.',
    achievements: [
      'Maintained 99.9% system uptime across operational logistics infrastructure.',
      'Transitioned technical focus toward modern JavaScript engineering, API integrations, and MERN stack architectures.',
    ],
    technologies: ['IT Systems', 'Network Reliability', 'JavaScript', 'Linux', 'Infrastructure'],
  },
  {
    id: 'j-spider',
    role: 'MERN Stack Trainee',
    company: 'J-Spider Training Center',
    location: 'Bengaluru, India',
    period: 'Sep 2024 – Mar 2025',
    summary:
      'Completed an intensive 6-month hands-on curriculum focused on backend API design, database schemas, and modern frontend application development.',
    achievements: [
      'Built and integrated secure RESTful APIs using Node.js and Express.js, connecting them to mobile-first user interfaces.',
      'Mastered asynchronous JavaScript, modular ES6+ architecture, and scalable database design.',
    ],
    technologies: ['Node.js', 'Express.js', 'MongoDB', 'React.js', 'REST APIs', 'SQL'],
  },
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'fullstack',
    number: '01',
    title: 'Full-Stack Web Applications',
    subtitle: 'From database schema to responsive interface',
    description:
      'End-to-end applications built on React 19, Next.js App Router, and Node.js. Clean component hierarchies, atomic design patterns, and bulletproof server communication.',
    tags: ['React 19', 'Next.js', 'TypeScript', 'Node.js', 'Tailwind CSS'],
    deliverables: [
      { title: 'Atomic Design Systems', description: 'Modular, reusable UI components accelerating long-term delivery.' },
      { title: 'Server & Client Synchronization', description: 'Efficient state management with TanStack Query and Zustand.' },
      { title: 'Core Web Vitals Optimization', description: 'Sub-second initial paint, memoization, and dynamic code splitting.' },
    ],
    techStack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
  },
  {
    id: 'realtime',
    number: '02',
    title: 'Real-Time Architecture & Sockets',
    subtitle: 'Sub-millisecond event streaming & state sync',
    description:
      'Bidirectional WebSockets and Socket.io pipelines for live messaging, notifications, collaborative canvases, and state machines with Redis pub/sub caching.',
    tags: ['Socket.io', 'WebSockets', 'Redis', 'Node.js', 'Zustand'],
    deliverables: [
      { title: 'Three-Tier Delivery State', description: 'Sent, delivered, and seen verification with optimistic rollbacks.' },
      { title: 'Redis Pub/Sub Layer', description: 'Scalable cache and horizontal message distribution.' },
      { title: 'Reconnection Resilience', description: 'Automatic client backoff and packet reconciliation.' },
    ],
    techStack: ['Socket.io', 'Redis', 'Express', 'Zustand'],
  },
  {
    id: 'apis',
    number: '03',
    title: 'APIs, Auth & Database Engineering',
    subtitle: 'Relational & document schemas with RBAC',
    description:
      'RESTful backend services engineered with Express and Node.js. Relational PostgreSQL via Prisma ORM, MongoDB document design, and JWT access/refresh token rotation.',
    tags: ['PostgreSQL', 'Prisma ORM', 'Neon DB', 'MongoDB', 'JWT / RBAC'],
    deliverables: [
      { title: 'Role-Based Access Control', description: 'Granular permissions across administrative and executive user tiers.' },
      { title: 'Prisma & SQL Schemas', description: 'Type-safe database queries, foreign key integrity, and migrations.' },
      { title: 'Token Security', description: 'HTTP-only cookie storage with secure token rotation.' },
    ],
    techStack: ['PostgreSQL', 'Prisma', 'MongoDB', 'Express', 'JWT'],
  },
  {
    id: 'devops',
    number: '04',
    title: 'DevOps & Performance Tuning',
    subtitle: 'Docker containers, CI/CD, and Lighthouse 95+',
    description:
      'Containerization with Docker, automated deployment pipelines via GitHub Actions, and systematic Core Web Vitals profiling that cuts LCP and network overhead.',
    tags: ['Docker', 'GitHub Actions', 'Vercel', 'Render', 'Lighthouse'],
    deliverables: [
      { title: 'LCP & Memory Profiling', description: 'Profiler-verified bundle reduction and re-render elimination.' },
      { title: 'Automated CI/CD Pipelines', description: 'Continuous testing, linting, and automated Docker image builds.' },
      { title: 'Production Containerization', description: 'Lightweight multi-stage Dockerfiles for cloud deployment.' },
    ],
    techStack: ['Docker', 'GitHub Actions', 'Postman', 'Vercel'],
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: '01',
    title: 'Architect',
    subtitle: 'Domain Modeling & Schema Design',
    summary:
      'Map out business entities, relational/document database schemas, and authentication boundaries before touching code.',
    details: [
      'Database schema planning (PostgreSQL / MongoDB / Prisma)',
      'API contract specification & role-based permission matrix',
      'Component breakdown following Atomic Design principles',
    ],
  },
  {
    step: '02',
    title: 'Engine',
    subtitle: 'API Implementation & Data Flow',
    summary:
      'Build resilient RESTful endpoints, Socket.io event pipelines, and server-side authentication with strict validation.',
    details: [
      'RESTful endpoints with Node.js, Express, and JWT security',
      'Socket.io real-time layer with deterministic state machines',
      'TanStack Query cache policies cutting redundant requests',
    ],
  },
  {
    step: '03',
    title: 'Interface',
    subtitle: 'High-Performance React/Next.js UI',
    summary:
      'Develop pixel-perfect, responsive interfaces with React 19, Next.js, and Tailwind CSS tuned for sub-second LCP.',
    details: [
      'Type-safe React & Next.js App Router components',
      'Tailwind CSS styling with full light and dark mode support',
      'Core Web Vitals profiling, memoization, and code splitting',
    ],
  },
  {
    step: '04',
    title: 'Deploy',
    subtitle: 'Docker, CI/CD & Production Release',
    summary:
      'Containerize applications, automate build verification through GitHub Actions, and deploy to Vercel/Render.',
    details: [
      'Multi-stage Docker builds and automated GitHub Actions CI/CD',
      'Database migrations on Neon DB / MongoDB Atlas',
      'Continuous uptime monitoring and post-launch verification',
    ],
  },
];

export const FAQ_ITEMS = [
  {
    question: 'What is your primary tech stack?',
    answer:
      'My core expertise is across the MERN and Next.js ecosystems: React 19, Next.js (App Router), TypeScript, and Tailwind CSS on the frontend; Node.js, Express 5, and Socket.io on the backend; and PostgreSQL (Prisma / Neon DB), MongoDB, and Redis for data persistence and caching.',
  },
  {
    question: 'How do you approach application performance?',
    answer:
      'I profile real render cycles and network waterfalls rather than guessing. At LincPay, I reduced Largest Contentful Paint (LCP) by 18% via dynamic code-splitting and memoization, and cut redundant API calls by 40% through TanStack Query cache layering.',
  },
  {
    question: 'Are you open to full-time engineering roles or contracts?',
    answer:
      'Yes. I am actively open to Full-Stack, Frontend, or MERN developer roles (both full-time and high-impact contractual engineering projects) where clean architecture, real-time systems, and code quality matter.',
  },
  {
    question: 'How can we get in touch?',
    answer:
      'You can reach me directly via email at mayanksahu8179@gmail.com, phone at +91 93019 09040, or connect on LinkedIn (linkedin.com/in/mayank-sahu-ou) and GitHub (github.com/Deadshot-45).',
  },
];
