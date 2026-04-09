export const heroHighlights = [
  "Motion-led interfaces",
  "Fast, accessible frontend systems",
  "Scalable TypeScript architecture",
] as const;

export const aboutBlurb = [
  "I design and build digital products that feel premium on first impression and reliable after extended use.",
  "My sweet spot is translating product goals into crisp interfaces, maintainable frontend systems, and experiences that stay fast even as complexity grows.",
];

export const skillGroups = [
  {
    title: "Frontend",
    description:
      "Interface systems tuned for clarity, motion, and performance.",
    items: [
      { name: "Next.js", level: 92 },
      { name: "React", level: 94 },
      { name: "TypeScript", level: 90 },
      { name: "Tailwind CSS", level: 93 },
      { name: "Framer Motion", level: 88 },
    ],
  },
  {
    title: "Backend",
    description: "Practical API and data-layer work for full-stack delivery.",
    items: [
      { name: "Node.js", level: 82 },
      { name: "Express", level: 84 },
      { name: "REST APIs", level: 86 },
      { name: "MongoDB", level: 78 },
      { name: "SQL", level: 72 },
    ],
  },
  {
    title: "Tools",
    description:
      "Workflow tooling for shipping confidently and iterating quickly.",
    items: [
      { name: "Git & GitHub", level: 90 },
      { name: "Figma", level: 76 },
      { name: "Vercel", level: 85 },
      { name: "Postman", level: 82 },
      { name: "Performance Audits", level: 80 },
    ],
  },
] as const;

export const experiences = [
  {
    company: "LincPay",
    role: "React Developer Intern",
    from: "Dec 2025",
    to: undefined,
    location: "Bhopal, India",
    summary:
      "Building reusable interface components, resolving UI issues, and contributing to frontend quality across production flows.",
    bullets: [
      "Implemented reusable UI building blocks from design specs with TypeScript and React.",
      "Delivered minor features and bug fixes without disrupting existing flows.",
      "Contributed to documentation and test-friendly component patterns.",
    ],
  },
  {
    company: "TCIExpress Ltd",
    role: "Senior Supervisor IT",
    from: "Apr 2025",
    to: "Dec 2025",
    location: "Chennai, India",
    summary:
      "Owned operational stability for internal systems and improved reliability across day-to-day IT workflows.",
    bullets: [
      "Maintained high system availability through troubleshooting and device support.",
      "Improved workstation updates and baseline security processes for user teams.",
    ],
  },
  {
    company: "JSpiders",
    role: "MERN Stack Trainee",
    from: "Sep 2024",
    to: "Mar 2025",
    location: "Bengaluru, India",
    summary:
      "Strengthened full-stack fundamentals with hands-on delivery across frontend, backend, and architecture topics.",
    bullets: [
      "Built applications using MongoDB, Express, React, and Node.js.",
      "Sharpened modern JavaScript, semantic HTML, CSS, and API design skills.",
      "Focused on scalable structure, maintainability, and production-minded coding.",
    ],
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
    slug: "psych-up",
    title: "Psych-up - Digital Healthcare",
    category: "Digital Healthcare",
    tagline:
      "A therapy platform tailored for modern, guided mental healthcare journeys.",
    description:
      "Psych-up brings therapist-led sessions, assessments, and personalized care paths into a cohesive digital experience designed for trust and clarity.",
    longDescription:
      "This product experience focused on making healthcare interactions feel intuitive and calm. I worked across interface polish, responsive behavior, and reusable patterns so the platform could scale while keeping a reassuring visual tone.",
    image: getAssetUrl("/psychup.png"),
    tags: ["React", "TypeScript", "Tailwind CSS", "REST APIs"],
    metrics: ["Healthcare UX", "Responsive design", "Reusable components"],
    link: "https://dev.psychup.health/",
    featured: true,
  },
  {
    slug: "vogue-vault",
    title: "Vogue-Vault E-commerce",
    category: "E-commerce",
    tagline:
      "A polished storefront focused on speed, conversion, and premium presentation.",
    description:
      "An e-commerce experience with strong visual merchandising, organized collections, and a modern retail browsing flow.",
    longDescription:
      "Vogue Vault was shaped around product clarity and browsing momentum. The interface balances editorial product presentation with practical shopping features so users can move from discovery to checkout smoothly.",
    image: getAssetUrl("/e-com.png"),
    tags: ["Next.js", "Tailwind CSS", "Express.js"],
    metrics: ["Performance-first", "Collection layout", "Retail interactions"],
    link: "https://vault-vogue-lite.vercel.app/",
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
    image: getAssetUrl("/myPortfolio.png"),
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
      "A comprehensive, Cert-In certified 360-degree e-procurement and auction platform.",
    description:
      "Developed a highly secure, zero-cost procurement platform for Government, Semi-Government, and PSU departments to manage end-to-end tendering processes.",
    longDescription:
      "Engineered a robust e-procurement ecosystem featuring live auction capabilities, real-time bid tracking, and automated comparison sheets. The platform prioritizes security through PKI Digital Signature integration and adherence to Cert-In standards. It simplifies complex procurement workflows with an envelope-based tendering system, automated bidder management, and a seamless payment gateway integration, all while maintaining a 'Zero Cost' model for buyer departments.",
    image: getAssetUrl("/procurelinc-preview.png"), // Placeholder based on your pattern
    tags: ["e-Tendering", "Digital Signatures", "Live Auction", "Cert-In Certified"],
    metrics: [
      "Zero-cost buyer model",
      "Real-time bid synchronization",
      "PKI-based security integrity",
    ],
    link: "https://dev.procurelinc.in/",
    featured: true,
}
  // {
  //   slug: "crypto-flow",
  //   title: "Crypto Flow",
  //   category: "Fintech",
  //   tagline: "A crypto analytics concept with sharp data visualization and responsive motion.",
  //   description:
  //     "A finance-focused experience for tracking markets, portfolio movement, and key cryptocurrency metrics.",
  //   longDescription:
  //     "Crypto Flow explored how animation and visual rhythm can support comprehension in data-heavy experiences without becoming distracting.",
  //   image: "/cryptoflow.png",
  //   tags: ["React", "Tailwind CSS", "Charts", "Motion"],
  //   metrics: ["Fintech UI", "Responsive cards", "Interactive states"],
  //   link: "",
  //   featured: false,
  // },
] as const;
