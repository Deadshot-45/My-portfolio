export const heroHighlights = [
  "MERN Stack Developer",
  "React & Next.js Frontend Systems",
  "Node.js & Express API Architectures",
] as const;

export const aboutBlurb = [
  "MERN Stack Developer with hands-on experience across the full stack — React.js and Next.js on the frontend, Node.js and Express.js on the backend, with MongoDB and SQL for data persistence.",
  "Built and consumed RESTful APIs in production, reduced Largest Contentful Paint by 18% through frontend optimization, and cut redundant API calls by 40% by re-architecting client-side data flow. Built a reusable, accessible component library on Atomic Design principles that accelerated feature delivery by 20% across a multi-role enterprise product, and implemented Role-Based Access Control (RBAC) end-to-end.",
];

export const skillGroups = [
  {
    title: "Languages & Frontend",
    description: "Interface systems built with TypeScript, React, and Next.js.",
    items: [
      { name: "JavaScript (ES6+)", level: 95 },
      { name: "TypeScript", level: 90 },
      { name: "React.js", level: 94 },
      { name: "Next.js (App Router)", level: 92 },
      { name: "HTML5 & CSS3", level: 95 },
    ],
  },
  {
    title: "Backend & Databases",
    description:
      "Scalable REST APIs and database schemas for data persistence.",
    items: [
      { name: "Node.js", level: 88 },
      { name: "Express.js", level: 90 },
      { name: "RESTful API Design", level: 92 },
      { name: "MongoDB", level: 85 },
      { name: "SQL/MySQL", level: 80 },
    ],
  },
  {
    title: "State, Styling & Tooling",
    description: "State management, design systems, and workflow tools.",
    items: [
      { name: "TanStack Query", level: 90 },
      { name: "Redux Toolkit", level: 88 },
      { name: "Tailwind CSS & shadcn/ui", level: 92 },
      { name: "Atomic Design Principles", level: 85 },
      { name: "Git, GitHub & Vercel", level: 90 },
    ],
  },
] as const;

export const experiences = [
  {
    role: "React Developer (Intern)",
    company: "LincPay Solution Pvt. Ltd.",
    type: "Internship",
    period: "Dec 2025 – Apr 2026",
    location: "Bhopal, India",
    details: [
      "Architected an application-wide performance optimization strategy using React.memo, useMemo, and dynamic imports (code-splitting), reducing Largest Contentful Paint (LCP) by 18% and improving SEO Core Web Vitals.",
      "Engineered a centralized UI component library in React and TypeScript based on Atomic Design principles, accelerating multi-role feature delivery cycles by 20%.",
      "Built Psych-Up, a healthcare management platform (React, TypeScript, TanStack Query), architecting a scalable UI ecosystem that enforced design parity across 3+ enterprise modules and cut engineering overhead by 20%.",
      "Implemented a secure Role-Based Access Control (RBAC) framework using React Higher-Order Components (HOCs), ensuring data isolation across 5 distinct user personas.",
      "Engineered an optimized data layer with TanStack Query, implementing optimistic state updates and cache invalidation strategies that cut API calls by 40%.",
    ],
    isCurrent: true,
  },
  {
    role: "IT Systems Engineer",
    company: "TCI Express Ltd",
    type: "Full-time",
    period: "Apr 2025 – Nov 2025",
    location: "Chennai, India",
    details: [
      "Maintained 99.9% system uptime while transitioning technical focus toward full-stack development and the MERN stack.",
    ],
    isCurrent: false,
  },
  {
    role: "MERN Stack Trainee",
    company: "J-Spider Training Center",
    type: "Training & Development",
    period: "Sep 2024 – Mar 2025",
    location: "Bengaluru, India",
    details: [
      "Built and integrated secure RESTful APIs using Node.js and Express.js, connecting them to mobile-first user interfaces built with asynchronous JavaScript and modular ES6 structures for cross-browser maintainability.",
    ],
    isCurrent: false,
  },
] as const;

export const education = [
  {
    institution: "Oriental University, Indore",
    degree: "Master in Computer Applications (MCA)",
    field: "Computer Application",
    period: "2022 - 2024",
    grade: "",
    description:
      "A postgraduate degree focusing on advanced computing, software engineering, databases, and algorithms. Relevant Coursework: Data Structures & Algorithms, DBMS, Software Engineering.",
    icon: "GraduationCap",
  },
  {
    institution: "Zakir Husain Delhi College, Delhi University",
    degree: "BA in Economics and Mathematics",
    field: "Economics & Mathematics",
    period: "2019 - 2022",
    grade: "6.7 CGPA",
    description:
      "Focus on analytical problem solving, mathematical modeling, and statistical analysis. Provides a strong logical and quantitative foundation for software engineering.",
    icon: "BookOpen",
  },
  {
    institution: "J-Spider Development Center",
    degree: "MERN Full-Stack Development Certificate",
    field: "6-Month Intensive Program",
    period: "2025",
    grade: "",
    description:
      "Comprehensive training covering MongoDB, Express.js, React, Node.js, and modern full-stack web development methodologies.",
    icon: "Award",
  },
] as const;

export const assetBaseUrl =
  process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_API_URL || "";

export function getAssetUrl(path: string) {
  if (!assetBaseUrl) {
    return path.startsWith("/") ? path : `/${path}`;
  }

  const normalizedBase = assetBaseUrl.endsWith("/")
    ? assetBaseUrl.slice(0, -1)
    : assetBaseUrl;
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return `${normalizedBase}${normalizedPath}`;
}

export const projects = [
  {
    slug: "vogue-vault",
    title: "Vault-Vogue - Premium E-Commerce Application",
    category: "E-Commerce (MERN Stack)",
    tagline:
      "A polished storefront focused on speed, conversion, and premium presentation.",
    description:
      "Independently designed and built the full stack — frontend UI with dynamic product collections and advanced filtering, backend REST APIs, and MongoDB schema design.",
    longDescription:
      "Vault-Vogue was shaped around product clarity and browsing momentum. Implemented persistent cart management with Redux Toolkit and optimized asset loading, bundle size, and image delivery for zero layout shifts. Owned deployment end-to-end on Vercel.",
    image: getAssetUrl("/Vault-vogue-lite.png"),
    tags: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Redux Toolkit",
      "Tailwind CSS",
    ],
    metrics: [
      "Full stack e-commerce",
      "Zero layout shifts",
      "Optimized loading",
    ],
    link: "https://vault-vogue-lite.vercel.app/",
    featured: true,
  },
  {
    slug: "psych-up",
    title: "Psych-up - Digital Healthcare",
    category: "Digital Healthcare",
    tagline:
      "A therapy platform tailored for modern, guided mental healthcare journeys.",
    description:
      "Built Psych-Up, a healthcare platform with a scalable UI ecosystem that enforced design parity across 3+ enterprise modules and cut engineering overhead by 20%.",
    longDescription:
      "This product experience focused on making healthcare interactions feel intuitive and calm. Enforced design parity across enterprise modules using React, TypeScript, and TanStack Query, optimizing data layer with cache invalidation and optimistic updates.",
    image: getAssetUrl("/Psychup.png"),
    tags: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "TanStack Query",
      "REST APIs",
    ],
    metrics: [
      "Scalable UI ecosystem",
      "RBAC Security",
      "Optimistic state updates",
    ],
    link: "https://dev.psychup.health/",
    featured: true,
  },
  {
    slug: "my-portfolio",
    title: "Personal Portfolio",
    category: "AI Product",
    tagline:
      "A resume-driven portfolio showcasing frontend engineering and AI-focused interface design.",
    description:
      "Built a high-performance portfolio to present projects, skills, and product thinking through a clean, structured, and interactive experience.",
    longDescription:
      "Designed and developed a modern portfolio that reflects both engineering depth and product sensibility. Focused on creating a scalable component system, smooth animations, and strong visual hierarchy to present information clearly. Implemented performance optimizations, responsive layouts, and reusable UI patterns to ensure consistency across sections while maintaining a polished user experience.",
    image: getAssetUrl("/portfolio.png"),
    tags: ["Next.js", "TypeScript", "Framer Motion"],
    metrics: [
      "Portfolio architecture",
      "Performance optimization",
      "Reusable UI system",
    ],
    link: "https://mayank-sahu.vercel.app/",
    featured: true,
  },
  {
    slug: "procurelinc",
    title: "Procurelinc e-Procurement Solution",
    category: "B2B SaaS / Fintech",
    tagline:
      "A secure and scalable e-procurement platform for government and enterprise tendering workflows.",
    description:
      "Contributed to UI enhancements, bug resolution, and feature improvements for a large-scale procurement platform used by Government and PSU departments.",
    longDescription:
      "Worked on improving the frontend experience of a complex e-procurement system by refining UI components, fixing critical bugs, and implementing new features. Focused on enhancing usability across tendering workflows, ensuring consistency in design, and improving overall interaction quality. Collaborated within an existing codebase to deliver stable updates while maintaining platform reliability and performance.",
    image: getAssetUrl("/procurelinc.png"),
    tags: [
      "Frontend Development",
      "UI Enhancements",
      "Bug Fixing",
      "Feature Implementation",
    ],
    metrics: [
      "Improved UI consistency",
      "Resolved production issues",
      "Enhanced user workflows",
    ],
    link: "https://dev.procurelinc.in/",
    featured: true,
  },
] as const;
