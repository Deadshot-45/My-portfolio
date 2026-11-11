# DESIGN.md — Mayank Sahu Portfolio

## 1. Visual World & Editorial Philosophy
- **Identity:** Engineering-first portfolio for Mayank Sahu, Full-Stack Developer (MERN / Next.js / TypeScript).
- **Tone:** Technical authority, architectural clarity, and high-craft editorial restraint. Zero marketing fluff, zero AI-slop badges, zero rainbow gradients.
- **Modes Supported:** Native Dark Mode (`#09090b`) and Crisp Light Mode (`#fafafa` / `#ffffff`), switchable via the navbar and stored in `localStorage`.

## 2. Real Profile & Data Authority
- **Engineer:** Mayank Sahu
- **Primary Roles:** Full-Stack Developer, MERN Stack Developer, Frontend Performance Engineer
- **Base:** Indore, Madhya Pradesh, India (GMT +5:30)
- **Contact:** `mayanksahu8179@gmail.com` | `+91 93019 09040`
- **GitHub:** `https://github.com/Deadshot-45`
- **LinkedIn:** `https://linkedin.com/in/mayank-sahu-ou`

## 3. Real Projects Featured
1. **iMessage Web** — Real-time macOS-inspired chat with Socket.io, 3-tier delivery state machine (`sent`, `delivered`, `seen`), optimistic UI, JWT auth, Redis caching, Docker. Live: `https://imessage-hydf.onrender.com`
2. **CRM Management Platform** — Role-based CRM for Lead Assignment & Follow-ups, Next.js App Router, Express, PostgreSQL, Prisma ORM, Neon DB. Live: `https://crm-management-zrog.vercel.app/`
3. **Vault-Vogue** — Independent full-stack digital storefront (MERN Stack: React, Redux Toolkit, Tailwind CSS, Node.js, Express, MongoDB). Live: `https://vault-vogue-lite.vercel.app/`
4. **Psych-Up Healthcare Platform** — Healthcare platform engineered at LincPay Solution Pvt. Ltd. (React, TypeScript, TanStack Query, RBAC across 5 user tiers, 40% reduction in redundant API calls).

## 4. Typography & Color System
- **Display & Headings:** `Plus Jakarta Sans`, `-apple-system`, `BlinkMacSystemFont`, `Segoe UI`, sans-serif. Tight tracking (`-0.03em`), bold weights (700/800), solid ink contrast.
- **Body:** Neutral sans-serif with 65–75ch measure, generous line height (`leading-relaxed`).
- **Code & Numbers:** `JetBrains Mono`, `Space Mono`, monospace for endpoints, metrics, commits, and timestamps.
- **Color Tokens:**
  - Dark Surface: `#09090b` (canvas), `#121316` (card surface), `#27272a` (borders)
  - Light Surface: `#fafafa` (canvas), `#ffffff` (card surface), `#e4e4e7` (borders)
  - Accents: Emerald (`#10b981`), Sky (`#0284c7`), Amber (`#f59e0b`), Violet (`#7c3aed`)

## 5. Components Matrix
- `Navbar.tsx`: Floating header with monogram mark, dark/light toggle, Web Audio API SFX toggle, GitHub/LinkedIn links, and direct contact trigger.
- `Hero.tsx`: High-contrast headline, live IST time ticker, real verified metrics (-18% LCP, -40% API calls, 99.9% uptime), and interactive Three.js particle canvas (`Hero3DCanvas.tsx`).
- `SelectedWork.tsx`: Real project cards with working `Live Demo` links, GitHub links, category filtering, and modal case study triggers.
- `TechnicalArsenal.tsx`: 6 skill clusters (Frontend, State, Backend, Database, Security, DevOps) and engineering philosophy cards.
- `ExperienceSection.tsx`: Work history at LincPay Solution Pvt. Ltd., TCI Express Ltd, J-Spider, and formal MCA education.
- `CoreCapabilities.tsx`: 4 engineering capabilities with deliverables and tech stacks.
- `CraftSection.tsx`: Precision engineering philosophy with interactive Three.js WebGL Torusknot.
- `ProcessSection.tsx`: 4-phase lifecycle (Architect -> Engine -> Interface -> Deploy).
- `FAQ.tsx`: Technical FAQs.
- `Footer.tsx`: Direct email with 1-click copy, phone, location, GitHub, LinkedIn, and back-to-top.
- `InquiryModal.tsx` & `ProjectDetailModal.tsx`: Accessible drawers for direct communication and architecture deep dives.
