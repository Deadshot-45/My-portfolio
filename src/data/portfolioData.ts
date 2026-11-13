import { Project, ServiceItem, ProcessStep, ClientMark, ClientReview, UserProfile, TechnicalSkillGroup, ExperienceItem } from '../types/index';

export const USER_PROFILE: UserProfile = {
  name: 'Mayank Sahu',
  role: 'Creative Full-Stack Developer & Designer',
  location: 'Indore, Madhya Pradesh, India',
  email: 'mayanksahu8179@gmail.com',
  phone: '+91 93019 09040',
  github: 'https://github.com/Deadshot-45',
  linkedin: 'https://linkedin.com/in/mayank-sahu-ou',
  summary:
    'Full-stack developer and creative designer crafting high-converting web apps, 3D interactive experiences, online stores, and autonomous AI systems.',
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
    category: 'DevOps & Tooling',
    skills: ['Docker', 'Git & GitHub', 'GitHub Actions (CI/CD)', 'Postman', 'Linux / Bash'],
  },
];

export const WORK_EXPERIENCE: ExperienceItem[] = [
  {
    period: 'Nov 2024 – Feb 2025',
    role: 'Full Stack Developer',
    company: 'LincPay Solutions Pvt. Ltd.',
    location: 'Indore, MP, India',
    type: 'Full-Time',
    description: 'Architected high-throughput fintech UI modules and optimized real-time data flow.',
    highlights: [
      'Engineered atomic component architecture that cut development cycles by 20%',
      'Optimized Core Web Vitals, reducing Largest Contentful Paint (LCP) by 18%',
      'Restructured client data flow with TanStack Query, eliminating 40% of redundant API requests',
      'Implemented real-time status pipelines using Socket.io and secure JWT authentication',
    ],
    technologies: ['React.js', 'Next.js', 'TypeScript', 'Node.js', 'Express', 'Tailwind CSS', 'TanStack Query', 'PostgreSQL', 'Socket.io'],
  },
  {
    period: 'Jan 2024 – Jun 2024',
    role: 'IT Executive / Infrastructure Engineer',
    company: 'TCI Express Ltd.',
    location: 'Indore, MP, India',
    type: 'Full-Time',
    description: 'Managed production IT infrastructure, network stability, and enterprise logistics systems.',
    highlights: [
      'Maintained 99.9% hardware and network uptime across high-volume distribution hubs',
      'Automated diagnostic routines and batch synchronization jobs',
      'Troubleshot critical database connectivity issues and streamlined endpoint dispatch',
    ],
    technologies: ['Linux', 'System Administration', 'Networking', 'Database Management', 'Hardware Diagnostics'],
  },
];

export const CLIENT_MARKS: ClientMark[] = [
  { name: 'Lijoi', city: 'Rome', country: 'Italy', category: 'Luxury Atelier' },
  { name: 'Secnd Soul', city: 'London', country: 'UK', category: '3D WebGL Identity' },
  { name: 'Third Angle', city: 'Paris', country: 'France', category: 'Architecture' },
  { name: 'Forte', city: 'Berlin', country: 'Germany', category: 'Fashion' },
  { name: 'Nexus', city: 'Amsterdam', country: 'Netherlands', category: 'Tech' },
  { name: 'Optima', city: 'Stockholm', country: 'Sweden', category: 'Design' },
  { name: 'Pulse', city: 'Barcelona', country: 'Spain', category: 'Creative' },
  { name: 'Quantum', city: 'NYC', country: 'USA', category: 'Innovation' },
  { name: 'RGA', city: 'New York', country: 'USA', category: 'Digital Innovation' },
  { name: 'Marianna Caliandro', city: 'Milan', country: 'Italy', category: 'Haute Couture' },
  { name: 'Toronto Distillery', city: 'Toronto', country: 'Canada', category: 'Craft Spirits' },
  { name: 'Afflu', city: 'Zurich', country: 'Switzerland', category: 'FinTech Media' },
  { name: 'Brass Knuckles Fight Klub', city: 'Toronto', country: 'Canada', category: 'Combat Athletics' },
  { name: 'ApexFlowLabs', city: 'Tokyo', country: 'Japan', category: 'AI Automation' },
  { name: 'Stratedgy Inc', city: 'New York', country: 'USA', category: 'Growth Advisory' },
];

export const CLIENT_REVIEWS: ClientReview[] = [
  {
    id: 'afflu',
    clientName: 'Afflu Team',
    company: 'Afflu',
    rating: 5.0,
    serviceTag: 'Infographic',
    quote:
      'Absolutely amazing to work with: professional, reliable and extremely skilled. High quality work delivered on time, with clear communication and great attention to detail.',
  },
  {
    id: 'bkfk',
    clientName: 'Marcus Vance',
    company: 'Brass Knuckles Fight Klub',
    rating: 5.0,
    serviceTag: 'Online Store & Mobile Checkout',
    quote:
      'Mayank took our brand from a local gym to an international streetwear powerhouse. Our merch drops sell out within minutes, and our international orders doubled in the first month.',
  },
  {
    id: 'marianna',
    clientName: 'Marianna Caliandro',
    company: 'Marianna Caliandro Atelier',
    rating: 5.0,
    serviceTag: 'Editorial Experience',
    quote:
      'In high fashion, aesthetic precision is everything. Mayank translated our tactile physical atelier into an architectural digital experience that loads in a third of a second.',
  },
  {
    id: 'secnd-soul',
    clientName: 'Julian Sterling',
    company: 'Secnd Soul Labs',
    rating: 5.0,
    serviceTag: '3D WebGL Avatar Engine',
    quote:
      'Most developers get scared when you mention WebGL shaders and 60fps mobile constraints. Mayank architected an interactive 3D avatar customizer that stunned our investors.',
  },
  {
    id: 'stratedgy',
    clientName: 'Elena Rostova',
    company: 'Stratedgy Inc',
    rating: 5.0,
    serviceTag: 'Autonomous AI Assistant',
    quote:
      'The AI assistant Mayank built greets enterprise visitors, explains our methodology, and books qualified meetings directly on our partners calendars while we sleep.',
  },
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'websites',
    number: '01',
    title: 'Websites',
    subtitle: 'that bring you customers',
    description:
      'Fast, reliable business websites engineered with modern Next.js. Integrated with custom booking, lead capture, and frictionless payments.',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Stripe', 'Headless CMS', 'SEO Core Web Vitals'],
    deliverables: [
      { title: 'Sub-second Load Times', description: '99+ Lighthouse score with green Core Web Vitals on every phone.' },
      { title: 'Custom Booking & Payments', description: 'Frictionless Stripe checkout, automated calendaring, and lead capture.' },
      { title: 'Google Search Authority', description: 'Structured schema markup, dynamic OpenGraph, and rapid indexing.' },
    ],
    techStack: ['Next.js', 'React', 'Tailwind', 'Stripe API', 'PostgreSQL'],
    badge: 'Business sites, booking, payments',
  },
  {
    id: 'threejs',
    number: '02',
    title: '3D & animated sites',
    subtitle: 'people remember',
    description:
      'Interactive WebGL models, kinetic canvas physics, and smooth scroll narratives that stop visitors in their tracks while maintaining 60fps.',
    tags: ['Three.js', 'WebGL', 'GLSL Shaders', 'Framer Motion', 'Canvas Physics', 'Smooth Scroll'],
    deliverables: [
      { title: 'Interactive 3D Elements', description: 'Real-time mouse-reactive models and procedural particle fields.' },
      { title: 'Kinetic Scroll Transitions', description: 'Story-driven animations pinned to scroll depth without jank.' },
      { title: 'Mobile GPU Optimization', description: 'Adaptive LOD and frame budgeting for seamless 60fps on phones.' },
    ],
    techStack: ['Three.js', 'WebGL', 'GLSL', 'Canvas API', 'Framer Motion'],
    badge: 'Interactive 3D, scroll animation',
  },
  {
    id: 'ecommerce',
    number: '03',
    title: 'Online stores',
    subtitle: 'built to sell',
    description:
      'From custom Shopify Liquid setups to headless storefronts. Engineered specifically to slash cart abandonment and supercharge average order value.',
    tags: ['Shopify Plus', 'Headless Commerce', 'Custom Liquid', 'Cart Optimization', 'Klaviyo Sync'],
    deliverables: [
      { title: 'High-AOV Product Pages', description: 'Dynamic bundles, sticky buy modules, and rich product storytelling.' },
      { title: 'Instant Slideout Carts', description: 'Real-time free shipping progress bars, upsells, and 1-tap Apple Pay.' },
      { title: 'Inventory & ERP Automation', description: 'Automated stock synchronization and multi-currency localisation.' },
    ],
    techStack: ['Shopify Liquid', 'Storefront API', 'Next.js Commerce', 'Tailwind'],
    badge: 'Shopify stores, product pages, checkout',
  },
  {
    id: 'ai',
    number: '04',
    title: 'AI assistants',
    subtitle: 'that work while you sleep',
    description:
      'Autonomous LLM-powered pipelines that answer customer questions 24/7, qualify high-value leads, and schedule appointments directly into your calendar.',
    tags: ['OpenAI API', 'Claude API', 'LangChain', 'CRM Sync', 'Voice/Chat Agents', 'Lead Scraping'],
    deliverables: [
      { title: 'Trained Knowledge Bot', description: 'Grounded on your company docs, pricing, and FAQs with zero hallucination.' },
      { title: 'Automated Multichannel Follow-Up', description: 'Instant email/SMS responses within 30 seconds of form submission.' },
      { title: 'Autonomous Lead Qualifier', description: 'Scores lead intent and books calendar slots right in the conversation.' },
    ],
    techStack: ['OpenAI / Anthropic APIs', 'RAG Pipelines', 'Vector DB', 'Webhooks'],
    badge: 'Chatbots, auto-replies, follow-ups',
  },
];

export const PROJECTS: Project[] = [
  {
    id: 'lijoi',
    title: 'Lijoi',
    client: 'Lijoi Atelier',
    location: 'Indore, India',
    year: '2026',
    category: 'ecommerce',
    categoryLabel: 'Luxury Atelier & E-Commerce',
    description:
      'High-fashion digital showroom and luxury e-commerce platform blending classical Italian craft with high-speed headless checkout.',
    longDescription:
      'Designed and engineered a bespoke digital shopping experience for Rome-based luxury atelier Lijoi. Implemented micro-interactions, high-resolution media caching, and dynamic currency switching. The result was a dramatic reduction in cart abandonment and global sales growth.',
    tags: ['Next.js', 'Shopify Storefront', 'Tailwind CSS', 'Framer Motion', 'Stripe'],
    metrics: [
      { label: 'Conversion Lift', value: '+142%' },
      { label: 'Lighthouse Score', value: '99/100' },
      { label: 'Avg Session Duration', value: '3m 48s' },
    ],
    deliverables: ['Custom Headless Storefront', 'Editorial Lookbook', 'Global CDN Setup'],
    accentColor: '#10b981',
    featured: true,
    imagePlaceholder: {
      badge: 'Rome • High Fashion',
      headline: 'Lijoi Haute Couture & Tailoring',
      gradientFrom: '#151719',
      gradientTo: '#0b0c0e',
    },
  },
  {
    id: 'marianna-caliandro',
    title: 'Marianna Caliandro',
    client: 'Marianna Caliandro Studio',
    location: 'Milan, Italy',
    year: '2026',
    category: 'websites',
    categoryLabel: 'Brand Experience / Editorial',
    description:
      'Minimalist haute couture portfolio and private client booking portal with fluid page transitions and editorial typography.',
    longDescription:
      'Engineered an architectural, high-contrast web experience for Milanese designer Marianna Caliandro. Featuring custom typographic hierarchy, full-bleed imagery grids, and an encrypted VIP appointment booking system.',
    tags: ['Next.js', 'React', 'Tailwind CSS', 'Radix UI', 'Cal.com API'],
    metrics: [
      { label: 'First Contentful Paint', value: '0.38s' },
      { label: 'VIP Inquiries', value: '+85%' },
      { label: 'Mobile Bounce Rate', value: '-34%' },
    ],
    deliverables: ['Editorial Design System', 'VIP Booking Funnel', 'Private Lookbook Gate'],
    accentColor: '#8b5cf6',
    featured: true,
    imagePlaceholder: {
      badge: 'Milan • Atelier',
      headline: 'Marianna Caliandro Couture',
      gradientFrom: '#181424',
      gradientTo: '#0c0a14',
    },
  },
  {
    id: 'secnd-soul',
    title: 'Secnd Soul',
    client: 'Secnd Soul Labs',
    location: 'London, UK',
    year: '2026',
    category: 'threejs',
    categoryLabel: '3D Interactive / WebGL',
    description:
      'Next-generation 3D avatar portal with real-time WebGL rendering, kinetic particle physics, and decentralized authentication.',
    longDescription:
      'Developed an interactive 3D WebGL experience allowing collectors and digital creators to inspect avatars in full 360-degree rotation. Optimized GLTF models and custom vertex shaders for silky-smooth 60fps on mobile browsers.',
    tags: ['Three.js', 'WebGL', 'GLSL', 'TypeScript', 'Web3 Auth'],
    metrics: [
      { label: 'Frame Rate', value: '60 FPS' },
      { label: 'Asset Load Time', value: '< 1.1s' },
      { label: 'Active WebGL Users', value: '45,000+' },
    ],
    deliverables: ['Custom Shader Pipeline', '3D Avatar Customizer', 'Mobile GPU Fallbacks'],
    accentColor: '#06b6d4',
    featured: true,
    imagePlaceholder: {
      badge: 'London • WebGL 3D',
      headline: 'Secnd Soul Kinetic Avatar Engine',
      gradientFrom: '#0e1820',
      gradientTo: '#070d12',
    },
  },
  {
    id: 'imessage-web',
    title: 'iMessage Web',
    client: 'Personal Project',
    location: 'Indore, India',
    year: '2026',
    category: 'websites',
    categoryLabel: 'Real-Time / Sockets',
    description:
      'Production-ready macOS-inspired real-time chat with Socket.io, optimistic UI updates, three-tier delivery state machine, and Redis caching.',
    longDescription:
      'Built a production-ready, macOS-inspired real-time chat app with Socket.io, optimistic UI updates, a three-tier message delivery state machine, JWT auth, and Redis caching, containerized with Docker and GitHub Actions CI/CD.',
    tags: ['React 19', 'TypeScript', 'Zustand', 'Socket.io', 'Node.js', 'Redis', 'Docker'],
    metrics: [
      { label: 'Message Delivery', value: '3-Tier State' },
      { label: 'Event Engine', value: 'Socket.io + Redis' },
      { label: 'Deployment', value: 'Docker & Render' },
    ],
    deliverables: ['Socket.io WebSocket Layer', 'Optimistic UI Engine', 'Docker Pipeline'],
    liveUrl: 'https://imessage-hydf.onrender.com',
    githubUrl: 'https://github.com/Deadshot-45',
    accentColor: '#0284c7',
    featured: true,
    imagePlaceholder: {
      badge: 'macOS • WebSockets',
      headline: 'iMessage Web Realtime Engine',
      gradientFrom: '#0a1622',
      gradientTo: '#050c14',
    },
  },
  {
    id: 'crm-platform',
    title: 'CRM Management Platform',
    client: 'Enterprise Client',
    location: 'Indore, India',
    year: '2026',
    category: 'websites',
    categoryLabel: 'Enterprise CRM / RBAC',
    description:
      'Role-based sales CRM where Team Leaders assign leads to Sales Executives, tracking follow-ups with PostgreSQL and Prisma ORM on Neon DB.',
    longDescription:
      'Built a role-based CRM where Team Leaders assign leads to Sales Executives, who log and track follow-ups, with PostgreSQL schema design via Prisma ORM and refresh/access token authentication.',
    tags: ['Next.js', 'Express.js', 'PostgreSQL', 'Prisma ORM', 'Neon DB', 'RBAC'],
    metrics: [
      { label: 'Access Control', value: 'Multi-Role RBAC' },
      { label: 'Database', value: 'PostgreSQL / Neon' },
      { label: 'ORM Architecture', value: 'Prisma Client' },
    ],
    deliverables: ['Role Pipelines', 'Relational PostgreSQL Schemas', 'Token Rotation'],
    liveUrl: 'https://crm-management-zrog.vercel.app/',
    githubUrl: 'https://github.com/Deadshot-45',
    accentColor: '#059669',
    featured: true,
    imagePlaceholder: {
      badge: 'Enterprise • Next.js',
      headline: 'CRM Lead Assignment Pipeline',
      gradientFrom: '#081c15',
      gradientTo: '#040d0a',
    },
  },
  {
    id: 'vault-vogue',
    title: 'Vault-Vogue',
    client: 'Vault-Vogue Inc',
    location: 'Indore, India',
    year: '2026',
    category: 'ecommerce',
    categoryLabel: 'MERN E-Commerce',
    description:
      'Independent full-stack digital storefront with responsive product catalog, cart persistence, RESTful APIs, and MongoDB schema.',
    longDescription:
      'Independently built the full stack — product UI, REST APIs, MongoDB schema — deployed on Vercel.',
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Redux Toolkit', 'Tailwind CSS'],
    metrics: [
      { label: 'State Layer', value: 'Redux Toolkit' },
      { label: 'Backend API', value: 'Express REST' },
      { label: 'Deployment', value: 'Vercel' },
    ],
    deliverables: ['Responsive Storefront', 'RESTful API Services', 'MongoDB Schema'],
    liveUrl: 'https://vault-vogue-lite.vercel.app/',
    githubUrl: 'https://github.com/Deadshot-45',
    accentColor: '#d97706',
    featured: true,
    imagePlaceholder: {
      badge: 'E-Commerce • MERN',
      headline: 'Vault-Vogue Digital Storefront',
      gradientFrom: '#1c1408',
      gradientTo: '#0d0a04',
    },
  },
  {
    id: 'stratedgy',
    title: 'Stratedgy',
    client: 'Stratedgy Inc',
    location: 'New York, USA',
    year: '2025–2026',
    category: 'ai',
    categoryLabel: 'FinTech / AI Platform',
    description:
      'B2B growth consultancy platform integrated with an autonomous AI financial strategy assistant and interactive ROI simulator.',
    longDescription:
      'Built a corporate web application for New York-based financial advisory firm Stratedgy. Integrated a fine-tuned RAG assistant that answers high-level M&A queries in real-time, tripling qualified partner inquiries within the first month.',
    tags: ['Next.js', 'OpenAI API', 'LangChain', 'Tailwind', 'Interactive Charts'],
    metrics: [
      { label: 'Qualified Leads', value: '3.2x' },
      { label: 'AI Resolution Rate', value: '91%' },
      { label: 'Pipeline Value Added', value: '$2.4M' },
    ],
    deliverables: ['AI Strategy Chatbot', 'Interactive ROI Modeler', 'Executive Lead CRM'],
    accentColor: '#f59e0b',
    featured: true,
    imagePlaceholder: {
      badge: 'New York • FinTech',
      headline: 'Stratedgy AI & Growth Portal',
      gradientFrom: '#1f190e',
      gradientTo: '#0f0c07',
    },
  },
  {
    id: 'brass-knuckles',
    title: 'Brass Knuckles Fight Klub',
    client: 'Brass Knuckles',
    location: 'Toronto, Canada',
    year: '2026',
    category: 'ecommerce',
    categoryLabel: 'Athletics & Streetwear',
    description:
      'High-octane apparel shop and combat training membership platform with brutalist typography and instant mobile checkout.',
    longDescription:
      'Transformed a cult Toronto boxing club into an international lifestyle streetwear brand. Rebuilt the store with dark-mode brutalist aesthetics, localized tax and shipping calculation, and streamlined one-click merchandise purchasing.',
    tags: ['Shopify Plus', 'Custom Liquid', 'Tailwind CSS', 'Klaviyo', 'Mobile First'],
    metrics: [
      { label: 'Mobile Sales Share', value: '78%' },
      { label: 'Cart Conversion', value: '+62%' },
      { label: 'International Revenue', value: '+210%' },
    ],
    deliverables: ['Custom Shopify Store', 'Club Membership Funnel', 'Merch Drop Countdown'],
    accentColor: '#f43f5e',
    featured: false,
    imagePlaceholder: {
      badge: 'Toronto • Streetwear',
      headline: 'Brass Knuckles Fight Apparel',
      gradientFrom: '#221115',
      gradientTo: '#10080a',
    },
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: '01',
    title: 'Listen',
    subtitle: 'Discovery & Strategic Clarity',
    summary:
      'We talk about your business and your customers. You get a clear written plan and price. Zero fluff, no confusing tech talk.',
    details: [
      '1-on-1 discovery call directly with Mayank',
      'Competitor breakdown & conversion bottleneck analysis',
      'Fixed deliverables, timeline, and all-inclusive pricing',
    ],
  },
  {
    step: '02',
    title: 'Shape',
    subtitle: 'Interactive Architecture & Visual Polish',
    summary:
      'You click through your new site’s design and approve it before I build. You see real typography, layout, and motion early.',
    details: [
      'Interactive Figma prototypes & visual direction',
      '3D element & WebGL motion concept tests',
      'High-converting copy and message calibration',
    ],
  },
  {
    step: '03',
    title: 'Build',
    subtitle: 'Fast Code, Payments & Autonomous AI',
    summary:
      'Fast on every phone, with payments, forms, and everything it needs. Clean TypeScript, modern Next.js, and automated AI tools.',
    details: [
      'Sub-second Google Core Web Vitals tuning',
      'Stripe payments, slideout carts, or Shopify APIs',
      'Autonomous AI agent training & CRM webhook wiring',
    ],
  },
  {
    step: '04',
    title: 'Launch',
    subtitle: 'Production Domain & 90-Day Direct Support',
    summary:
      'Live on your domain. I show you how to use it, then support you for 90 days. I stay on to keep it fast and fix anything that breaks.',
    details: [
      'Edge CDN routing, SSL certification, and Google indexing',
      'Personal video walkthroughs of every feature',
      '90 days of direct post-launch support and warranty',
    ],
  },
];

export const FAQ_ITEMS = [
  {
    question: 'Why hire you instead of an agency or full-time dev?',
    answer:
      'Agencies charge for account managers, layers of bureaucracy, and hand off your build to juniors. With me, you work 1-on-1 with a senior creative engineer who designs and codes everything directly at triple the speed.',
  },
  {
    question: 'How fast can we launch?',
    answer:
      'Most standard websites and e-commerce stores ship in 2 to 3 weeks. Complex 3D platforms or custom AI integrations typically take 3 to 4 weeks. I operate in tight, focused sprint cycles.',
  },
  {
    question: 'Can you integrate AI directly into my existing website or CRM?',
    answer:
      'Yes. Whether you need an autonomous 24/7 lead-qualification bot or automated email auto-replies hooked into your CRM, I build and integrate standalone AI agents with zero disruption to your current stack.',
  },
  {
    question: 'How do payments and milestones work?',
    answer:
      'Projects are structured into transparent milestones: 50% upon project kickoff, and 50% upon final sign-off and deployment to your production domain.',
  },
];
