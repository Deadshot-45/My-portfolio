import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Read portfolioData.ts manually to extract objects safely without ts-node
const portfolioDataPath = path.join(rootDir, 'src', 'data', 'portfolioData.ts');
const portfolioContent = fs.readFileSync(portfolioDataPath, 'utf8');

// Output target: studio-portfolio/data/portfolio-seed.ndjson
const outputDir = path.join(rootDir, 'studio-portfolio', 'data');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}
const outputPath = path.join(outputDir, 'portfolio-seed.ndjson');

// Exact current data from src/data/portfolioData.ts
const projects = [
  {
    _id: 'project-imessage-web',
    _type: 'project',
    title: 'iMessage Web',
    slug: { _type: 'slug', current: 'imessage-web' },
    clientName: 'Personal Project',
    location: 'Indore, India',
    year: '2026',
    category: 'websites',
    categoryLabel: 'Real-Time / Sockets',
    shortDescription: 'Production-ready macOS-inspired real-time chat with Socket.io, optimistic UI updates, three-tier delivery state machine, and Redis caching.',
    description: 'Built a production-ready, macOS-inspired real-time chat app with Socket.io, optimistic UI updates, a three-tier message delivery state machine, JWT auth, and Redis caching, containerized with Docker and GitHub Actions CI/CD.',
    technologies: ['React 19', 'TypeScript', 'Zustand', 'Socket.io', 'Node.js', 'Redis', 'Docker'],
    metrics: [
      { _type: 'object', label: 'Message Delivery', value: '3-Tier State' },
      { _type: 'object', label: 'Event Engine', value: 'Socket.io + Redis' },
      { _type: 'object', label: 'Deployment', value: 'Docker & Render' },
    ],
    deliverables: ['Socket.io WebSocket Layer', 'Optimistic UI Engine', 'Docker Pipeline'],
    liveUrl: 'https://imessage-hydf.onrender.com',
    githubUrl: 'https://github.com/Deadshot-45',
    accentColor: '#0284c7',
    featured: true,
    coverImageUrl: '/images/projects/imessage-web.jpg',
    headline: 'iMessage Web Realtime Engine',
    badge: 'macOS • WebSockets',
    displayOrder: 0,
  },
  {
    _id: 'project-crm-platform',
    _type: 'project',
    title: 'CRM Management Platform',
    slug: { _type: 'slug', current: 'crm-platform' },
    clientName: 'Enterprise Client',
    location: 'Indore, India',
    year: '2026',
    category: 'websites',
    categoryLabel: 'Enterprise CRM / RBAC',
    shortDescription: 'Role-based sales CRM where Team Leaders assign leads to Sales Executives, tracking follow-ups with PostgreSQL and Prisma ORM on Neon DB.',
    description: 'Built a role-based CRM where Team Leaders assign leads to Sales Executives, who log and track follow-ups, with PostgreSQL schema design via Prisma ORM and refresh/access token authentication.',
    technologies: ['Next.js', 'Express.js', 'PostgreSQL', 'Prisma ORM', 'Neon DB', 'RBAC'],
    metrics: [
      { _type: 'object', label: 'Access Control', value: 'Multi-Role RBAC' },
      { _type: 'object', label: 'Database', value: 'PostgreSQL / Neon' },
      { _type: 'object', label: 'ORM Architecture', value: 'Prisma Client' },
    ],
    deliverables: ['Role Pipelines', 'Relational PostgreSQL Schemas', 'Token Rotation'],
    liveUrl: 'https://crm-management-zrog.vercel.app/',
    githubUrl: 'https://github.com/Deadshot-45',
    accentColor: '#059669',
    featured: true,
    coverImageUrl: '/images/projects/crm-platform.jpg',
    headline: 'CRM Lead Assignment Pipeline',
    badge: 'Enterprise • Next.js',
    displayOrder: 1,
  },
  {
    _id: 'project-vault-vogue',
    _type: 'project',
    title: 'Vault-Vogue',
    slug: { _type: 'slug', current: 'vault-vogue' },
    clientName: 'Vault-Vogue Inc',
    location: 'Indore, India',
    year: '2026',
    category: 'ecommerce',
    categoryLabel: 'MERN E-Commerce',
    shortDescription: 'Independent full-stack digital storefront with responsive product catalog, cart persistence, RESTful APIs, and MongoDB schema.',
    description: 'Independently built the full stack — product UI, REST APIs, MongoDB schema — deployed on Vercel.',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Redux Toolkit', 'Tailwind CSS'],
    metrics: [
      { _type: 'object', label: 'State Layer', value: 'Redux Toolkit' },
      { _type: 'object', label: 'Backend API', value: 'Express REST' },
      { _type: 'object', label: 'Deployment', value: 'Vercel' },
    ],
    deliverables: ['Responsive Storefront', 'RESTful API Services', 'MongoDB Schema'],
    liveUrl: 'https://vault-vogue-lite.vercel.app/',
    githubUrl: 'https://github.com/Deadshot-45',
    accentColor: '#d97706',
    featured: true,
    coverImageUrl: '/images/projects/vault-vogue.jpg',
    headline: 'Vault-Vogue Digital Storefront',
    badge: 'E-Commerce • MERN',
    displayOrder: 2,
  },
];

const profile = {
  _id: 'profile-mayank-sahu',
  _type: 'profile',
  name: 'Mayank Sahu',
  headline: 'Creative Full-Stack Developer & Designer',
  bio: 'Full-stack developer and creative designer crafting high-converting web apps, 3D interactive experiences, online stores, and autonomous AI systems.',
  location: 'Indore, Madhya Pradesh, India',
  email: 'mayanksahu8179@gmail.com',
  phone: '+91 93019 09040',
  statusText: 'Available for Q1/Q2 contracts & high-impact full-stack roles',
  availableForWork: true,
  socialLinks: [
    { platform: 'GitHub', url: 'https://github.com/Deadshot-45', label: 'github.com/Deadshot-45' },
    { platform: 'LinkedIn', url: 'https://linkedin.com/in/mayank-sahu-ou', label: 'linkedin.com/in/mayank-sahu-ou' },
  ],
};

const services = [
  {
    _id: 'service-websites',
    _type: 'service',
    number: '01',
    title: 'Websites',
    subtitle: 'that bring you customers',
    badge: 'Business sites, booking, payments',
    description: 'Fast, reliable business websites engineered with modern Next.js. Integrated with custom booking, lead capture, and frictionless payments.',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Stripe', 'Headless CMS', 'SEO Core Web Vitals'],
    deliverables: [
      { title: 'Sub-second Load Times', description: '99+ Lighthouse score with green Core Web Vitals on every phone.' },
      { title: 'Custom Booking & Payments', description: 'Frictionless Stripe checkout, automated calendaring, and lead capture.' },
      { title: 'Google Search Authority', description: 'Structured schema markup, dynamic OpenGraph, and rapid indexing.' },
    ],
    techStack: ['Next.js', 'React', 'Tailwind', 'Stripe API', 'PostgreSQL'],
    displayOrder: 0,
  },
  {
    _id: 'service-threejs',
    _type: 'service',
    number: '02',
    title: '3D & animated sites',
    subtitle: 'people remember',
    badge: 'Interactive 3D, scroll animation',
    description: 'Interactive WebGL models, kinetic canvas physics, and smooth scroll narratives that stop visitors in their tracks while maintaining 60fps.',
    tags: ['Three.js', 'WebGL', 'GLSL Shaders', 'Framer Motion', 'Canvas Physics', 'Smooth Scroll'],
    deliverables: [
      { title: 'Interactive 3D Elements', description: 'Real-time mouse-reactive models and procedural particle fields.' },
      { title: 'Kinetic Scroll Transitions', description: 'Story-driven animations pinned to scroll depth without jank.' },
      { title: 'Mobile GPU Optimization', description: 'Adaptive LOD and frame budgeting for seamless 60fps on phones.' },
    ],
    techStack: ['Three.js', 'WebGL', 'GLSL', 'Canvas API', 'Framer Motion'],
    displayOrder: 1,
  },
  {
    _id: 'service-ecommerce',
    _type: 'service',
    number: '03',
    title: 'Online stores',
    subtitle: 'built to sell',
    badge: 'Shopify stores, product pages, checkout',
    description: 'From custom Shopify Liquid setups to headless storefronts. Engineered specifically to slash cart abandonment and supercharge average order value.',
    tags: ['Shopify Plus', 'Headless Commerce', 'Custom Liquid', 'Cart Optimization', 'Klaviyo Sync'],
    deliverables: [
      { title: 'High-AOV Product Pages', description: 'Dynamic bundles, sticky buy modules, and rich product storytelling.' },
      { title: 'Instant Slideout Carts', description: 'Real-time free shipping progress bars, upsells, and 1-tap Apple Pay.' },
      { title: 'Inventory & ERP Automation', description: 'Automated stock synchronization and multi-currency localisation.' },
    ],
    techStack: ['Shopify Liquid', 'Storefront API', 'Next.js Commerce', 'Tailwind'],
    displayOrder: 2,
  },
  {
    _id: 'service-ai',
    _type: 'service',
    number: '04',
    title: 'AI assistants',
    subtitle: 'that work while you sleep',
    badge: 'Chatbots, auto-replies, follow-ups',
    description: 'Autonomous LLM-powered pipelines that answer customer questions 24/7, qualify high-value leads, and schedule appointments directly into your calendar.',
    tags: ['OpenAI API', 'Claude API', 'LangChain', 'CRM Sync', 'Voice/Chat Agents', 'Lead Scraping'],
    deliverables: [
      { title: 'Trained Knowledge Bot', description: 'Grounded on your company docs, pricing, and FAQs with zero hallucination.' },
      { title: 'Automated Multichannel Follow-Up', description: 'Instant email/SMS responses within 30 seconds of form submission.' },
      { title: 'Autonomous Lead Qualifier', description: 'Scores lead intent and books calendar slots right in the conversation.' },
    ],
    techStack: ['OpenAI / Anthropic APIs', 'RAG Pipelines', 'Vector DB', 'Webhooks'],
    displayOrder: 3,
  },
];

const testimonials = [
  {
    _id: 'testimonial-afflu',
    _type: 'testimonial',
    clientName: 'Afflu Team',
    company: 'Afflu',
    clientDesignation: 'Infographic',
    content: 'Absolutely amazing to work with: professional, reliable and extremely skilled. High quality work delivered on time, with clear communication and great attention to detail.',
    rating: 5,
    displayOrder: 0,
  },
  {
    _id: 'testimonial-bkfk',
    _type: 'testimonial',
    clientName: 'Marcus Vance',
    company: 'Brass Knuckles Fight Klub',
    clientDesignation: 'Online Store & Mobile Checkout',
    content: 'Mayank took our brand from a local gym to an international streetwear powerhouse. Our merch drops sell out within minutes, and our international orders doubled in the first month.',
    rating: 5,
    displayOrder: 1,
  },
  {
    _id: 'testimonial-marianna',
    _type: 'testimonial',
    clientName: 'Marianna Caliandro',
    company: 'Marianna Caliandro Atelier',
    clientDesignation: 'Editorial Experience',
    content: 'In high fashion, aesthetic precision is everything. Mayank translated our tactile physical atelier into an architectural digital experience that loads in a third of a second.',
    rating: 5,
    displayOrder: 2,
  },
  {
    _id: 'testimonial-secnd-soul',
    _type: 'testimonial',
    clientName: 'Julian Sterling',
    company: 'Secnd Soul Labs',
    clientDesignation: '3D WebGL Avatar Engine',
    content: 'Most developers get scared when you mention WebGL shaders and 60fps mobile constraints. Mayank architected an interactive 3D avatar customizer that stunned our investors.',
    rating: 5,
    displayOrder: 3,
  },
  {
    _id: 'testimonial-stratedgy',
    _type: 'testimonial',
    clientName: 'Elena Rostova',
    company: 'Stratedgy Inc',
    clientDesignation: 'Autonomous AI Assistant',
    content: 'The AI assistant Mayank built greets enterprise visitors, explains our methodology, and books qualified meetings directly on our partners calendars while we sleep.',
    rating: 5,
    displayOrder: 4,
  },
];

const clients = [
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
].map((item, idx) => ({
  _id: `client-${item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
  _type: 'client',
  name: item.name,
  city: item.city,
  country: item.country,
  category: item.category,
  displayOrder: idx,
}));

const experiences = [
  {
    _id: 'experience-lincpay',
    _type: 'experience',
    title: 'Full Stack Developer',
    company: 'LincPay Solutions Pvt. Ltd.',
    location: 'Indore, MP, India',
    employmentType: 'Full-Time',
    period: 'Nov 2024 – Feb 2025',
    description: 'Architected high-throughput fintech UI modules and optimized real-time data flow.',
    highlights: [
      'Engineered atomic component architecture that cut development cycles by 20%',
      'Optimized Core Web Vitals, reducing Largest Contentful Paint (LCP) by 18%',
      'Restructured client data flow with TanStack Query, eliminating 40% of redundant API requests',
      'Implemented real-time status pipelines using Socket.io and secure JWT authentication',
    ],
    technologies: ['React.js', 'Next.js', 'TypeScript', 'Node.js', 'Express', 'Tailwind CSS', 'TanStack Query', 'PostgreSQL', 'Socket.io'],
    displayOrder: 0,
  },
  {
    _id: 'experience-tci-express',
    _type: 'experience',
    title: 'IT Executive / Infrastructure Engineer',
    company: 'TCI Express Ltd.',
    location: 'Indore, MP, India',
    employmentType: 'Full-Time',
    period: 'Jan 2024 – Jun 2024',
    description: 'Managed production IT infrastructure, network stability, and enterprise logistics systems.',
    highlights: [
      'Maintained 99.9% hardware and network uptime across high-volume distribution hubs',
      'Automated diagnostic routines and batch synchronization jobs',
      'Troubleshot critical database connectivity issues and streamlined endpoint dispatch',
    ],
    technologies: ['Linux', 'System Administration', 'Networking', 'Database Management', 'Hardware Diagnostics'],
    displayOrder: 1,
  },
];

const allDocuments = [
  ...projects,
  profile,
  ...services,
  ...testimonials,
  ...clients,
  ...experiences,
];

const ndjson = allDocuments.map((doc) => JSON.stringify(doc)).join('\n');
fs.writeFileSync(outputPath, ndjson, 'utf8');

console.log(`Successfully exported ${allDocuments.length} Sanity documents to ${outputPath}`);
console.log(`- ${projects.length} Projects`);
console.log(`- 1 Profile`);
console.log(`- ${services.length} Services`);
console.log(`- ${testimonials.length} Testimonials`);
console.log(`- ${clients.length} Clients`);
console.log(`- ${experiences.length} Experiences`);
