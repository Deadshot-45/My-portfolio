import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";
import { randomUUID } from "node:crypto";
import fs from "node:fs";
//import { PROJECTS } from "../src/data/portfolioData"

const PROJECTS = [
  {
    id: "imessage-web",
    title: "iMessage Web",
    client: "Personal Project",
    location: "Indore, India",
    year: "2026",
    category: "websites",
    categoryLabel: "Real-Time / Sockets",
    description:
      "Production-ready macOS-inspired real-time chat with Socket.io, optimistic UI updates, three-tier delivery state machine, and Redis caching.",
    longDescription:
      "Built a production-ready, macOS-inspired real-time chat app with Socket.io, optimistic UI updates, a three-tier message delivery state machine, JWT auth, and Redis caching, containerized with Docker and GitHub Actions CI/CD.",
    tags: [
      "React 19",
      "TypeScript",
      "Zustand",
      "Socket.io",
      "Node.js",
      "Redis",
      "Docker",
    ],
    metrics: [
      { label: "Message Delivery", value: "3-Tier State" },
      { label: "Event Engine", value: "Socket.io + Redis" },
      { label: "Deployment", value: "Docker & Render" },
    ],
    deliverables: [
      "Socket.io WebSocket Layer",
      "Optimistic UI Engine",
      "Docker Pipeline",
    ],
    liveUrl: "https://imessage-hydf.onrender.com",
    githubUrl: "https://github.com/Deadshot-45/iMessage",
    accentColor: "#0284c7",
    featured: true,
    coverImage: "/images/projects/imessage-web.jpg",
    imagePlaceholder: {
      badge: "macOS • WebSockets",
      headline: "iMessage Web Realtime Engine",
      gradientFrom: "#0a1622",
      gradientTo: "#050c14",
    },
  },
  {
    id: "crm-platform",
    title: "CRM Management Platform",
    client: "Enterprise Client",
    location: "Indore, India",
    year: "2026",
    category: "websites",
    categoryLabel: "Enterprise CRM / RBAC",
    description:
      "Role-based sales CRM where Team Leaders assign leads to Sales Executives, tracking follow-ups with PostgreSQL and Prisma ORM on Neon DB.",
    longDescription:
      "Built a role-based CRM where Team Leaders assign leads to Sales Executives, who log and track follow-ups, with PostgreSQL schema design via Prisma ORM and refresh/access token authentication.",
    tags: [
      "Next.js",
      "Express.js",
      "PostgreSQL",
      "Prisma ORM",
      "Neon DB",
      "RBAC",
    ],
    metrics: [
      { label: "Access Control", value: "Multi-Role RBAC" },
      { label: "Database", value: "PostgreSQL / Neon" },
      { label: "ORM Architecture", value: "Prisma Client" },
    ],
    deliverables: [
      "Role Pipelines",
      "Relational PostgreSQL Schemas",
      "Token Rotation",
    ],
    liveUrl: "https://crm-management-zrog.vercel.app/",
    githubUrl: "https://github.com/Deadshot-45/crm-management",
    accentColor: "#059669",
    featured: true,
    coverImage: "/images/projects/crm-platform.jpg",
    imagePlaceholder: {
      badge: "Enterprise • Next.js",
      headline: "CRM Lead Assignment Pipeline",
      gradientFrom: "#081c15",
      gradientTo: "#040d0a",
    },
  },
  {
    id: "vault-vogue",
    title: "Vault-Vogue",
    client: "Vault-Vogue Inc",
    location: "Indore, India",
    year: "2026",
    category: "ecommerce",
    categoryLabel: "MERN E-Commerce",
    description:
      "Independent full-stack digital storefront with responsive product catalog, cart persistence, RESTful APIs, and MongoDB schema.",
    longDescription:
      "Independently built the full stack — product UI, REST APIs, MongoDB schema — deployed on Vercel.",
    tags: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Redux Toolkit",
      "Tailwind CSS",
    ],
    metrics: [
      { label: "State Layer", value: "Redux Toolkit" },
      { label: "Backend API", value: "Express REST" },
      { label: "Deployment", value: "Vercel" },
    ],
    deliverables: [
      "Responsive Storefront",
      "RESTful API Services",
      "MongoDB Schema",
    ],
    liveUrl: "https://vault-vogue-lite.vercel.app/",
    githubUrl: "https://github.com/Deadshot-45/vault-vogue",
    accentColor: "#d97706",
    featured: true,
    coverImage: "/images/projects/vault-vogue.jpg",
    imagePlaceholder: {
      badge: "E-Commerce • MERN",
      headline: "Vault-Vogue Digital Storefront",
      gradientFrom: "#1c1408",
      gradientTo: "#0d0a04",
    },
  },
];

// Load environment variables natively in Node.js from .env.local and .env
for (const envFile of [".env.local", ".env"]) {
  if (fs.existsSync(envFile)) {
    try {
      if (typeof process.loadEnvFile === "function") {
        process.loadEnvFile(envFile);
      } else {
        const content = fs.readFileSync(envFile, "utf-8");
        for (const line of content.split("\n")) {
          const trimmed = line.trim();
          if (!trimmed || trimmed.startsWith("#")) continue;
          const eqIdx = trimmed.indexOf("=");
          if (eqIdx !== -1) {
            const key = trimmed.slice(0, eqIdx).trim();
            let val = trimmed.slice(eqIdx + 1).trim();
            if (
              (val.startsWith('"') && val.endsWith('"')) ||
              (val.startsWith("'") && val.endsWith("'"))
            ) {
              val = val.slice(1, -1);
            }
            if (!process.env[key]) {
              process.env[key] = val;
            }
          }
        }
      }
    } catch {
      // safe fallback
    }
  }
}

const uri =
  process.env.MONGODB_URI ||
  process.env.mongodb ||
  process.env.DATABASE_URL ||
  "mongodb://127.0.0.1:27017/mayank_portfolio";

const sanitizedUri = uri ? uri.replace(/\/\/[^@]+@/, "//***:***@") : "unknown";

async function main() {
  console.log(`[MongoDB] Connecting to ${sanitizedUri}...`);
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log(`[MongoDB] Connected successfully to ${sanitizedUri}`);
    const db = client.db("mayank_portfolio");

    // 1. Setup Indexes
    console.log("[MongoDB] Setting up collection indexes...");
    await Promise.all([
      db.collection("admin_users").createIndex({ email: 1 }, { unique: true }),
      db.collection("sessions").createIndex({ tokenHash: 1 }, { unique: true }),
      db.collection("sessions").createIndex({ expiresAt: 1 }),
      db.collection("projects").createIndex({ slug: 1 }, { unique: true }),
      db.collection("projects").createIndex({ status: 1 }),
      db.collection("projects").createIndex({ displayOrder: 1 }),
      db.collection("services").createIndex({ slug: 1 }, { unique: true }),
      db.collection("services").createIndex({ active: 1 }),
      db.collection("clients").createIndex({ slug: 1 }, { unique: true }),
      db.collection("clients").createIndex({ active: 1 }),
      db.collection("testimonials").createIndex({ status: 1 }),
      db.collection("site_settings").createIndex({ key: 1 }, { unique: true }),
    ]);
    console.log("[MongoDB] Collection indexes verified.");

    const now = new Date();

    // 2. Admin User Seeding
    const email = (process.env.ADMIN_SEED_EMAIL || "admin@example.com")
      .trim()
      .toLowerCase();
    const password =
      process.env.ADMIN_SEED_PASSWORD || "ChangeMeImmediately123!";
    const passwordHash = await bcrypt.hash(password, 12);
    const existingAdmin = await db.collection("admin_users").findOne({ email });

    if (!existingAdmin) {
      await db.collection("admin_users").insertOne({
        id: randomUUID(),
        email,
        name: "Administrator",
        passwordHash,
        role: "ADMIN",
        isActive: true,
        createdAt: now,
        updatedAt: now,
      });
      console.log(`[MongoDB] Seeded admin account: ${email}`);
    } else {
      await db
        .collection("admin_users")
        .updateOne(
          { email },
          { $set: { passwordHash, isActive: true, updatedAt: now } },
        );
      console.log(
        `[MongoDB] Verified & updated admin account password for: ${email}`,
      );
    }

    // 3. Projects Seeding
    const initialProjects = PROJECTS;
    //[
    //  {
    //    id: randomUUID(),
    //    title: "iMessage Web Realtime Engine",
    //    slug: "imessage-web-realtime-engine",
    //    shortDescription:
    //      "Production macOS-inspired chat app with Socket.io, optimistic UI, and Redis.",
    //    description:
    //      "Built a production-ready, macOS-inspired real-time chat app with Socket.io, optimistic UI updates, a three-tier message delivery state machine, JWT auth, and Redis caching, containerized with Docker.",
    //    coverImage: "/images/projects/imessage-web.jpg",
    //    category: "websites",
    //    technologies:
    //      "React 19, TypeScript, Zustand, Socket.io, Node.js, Redis, Docker",
    //    liveUrl: "https://imessage-hydf.onrender.com",
    //    githubUrl: "https://github.com/Deadshot-45",
    //    clientName: "Mayank Sahu",
    //    duration: "4 weeks",
    //    featured: true,
    //    displayOrder: 1,
    //    seoTitle: "iMessage Web Realtime Engine — Mayank Sahu",
    //    seoDescription:
    //      "High-throughput real-time web messaging engine with Socket.io and Redis.",
    //    status: "PUBLISHED",
    //    images: [],
    //    createdAt: now,
    //    updatedAt: now,
    //  },
    //  {
    //    id: randomUUID(),
    //    title: "Enterprise CRM Management Platform",
    //    slug: "crm-management-platform",
    //    shortDescription:
    //      "Role-based sales CRM with lead assignment pipelines and multi-role RBAC.",
    //    description:
    //      "Built a role-based sales CRM where Team Leaders assign leads to Sales Executives, tracking follow-ups with PostgreSQL schema design, token rotation, and activity logs.",
    //    coverImage: "/images/projects/crm-platform.jpg",
    //    category: "websites",
    //    technologies:
    //      "Next.js, Express.js, PostgreSQL, Prisma ORM, Neon DB, RBAC",
    //    liveUrl: "https://crm-management-zrog.vercel.app/",
    //    githubUrl: "https://github.com/Deadshot-45",
    //    clientName: "Enterprise Client",
    //    duration: "6 weeks",
    //    featured: true,
    //    displayOrder: 2,
    //    seoTitle: "Enterprise CRM Platform — Mayank Sahu",
    //    seoDescription:
    //      "Scalable CRM architecture with role-based access control and lead workflows.",
    //    status: "PUBLISHED",
    //    images: [],
    //    createdAt: now,
    //    updatedAt: now,
    //  },
    //  {
    //    id: randomUUID(),
    //    title: "Vault-Vogue Digital Storefront",
    //    slug: "vault-vogue",
    //    shortDescription:
    //      "Full-stack MERN e-commerce storefront with cart persistence and REST APIs.",
    //    description:
    //      "Independently built the full stack — responsive storefront UI, REST APIs, MongoDB schema, and cart state — deployed on Vercel.",
    //    coverImage: "/images/projects/vault-vogue.jpg",
    //    category: "ecommerce",
    //    technologies:
    //      "React, Node.js, Express, MongoDB, Redux Toolkit, Tailwind CSS",
    //    liveUrl: "https://vault-vogue-lite.vercel.app/",
    //    githubUrl: "https://github.com/Deadshot-45",
    //    clientName: "Vault-Vogue Inc",
    //    duration: "3 weeks",
    //    featured: true,
    //    displayOrder: 3,
    //    seoTitle: "Vault-Vogue Storefront — Mayank Sahu",
    //    seoDescription:
    //      "Responsive modern e-commerce storefront built with MERN stack.",
    //    status: "PUBLISHED",
    //    images: [],
    //    createdAt: now,
    //    updatedAt: now,
    //  },
    //];

    console.log(initialProjects)

    for (const project of initialProjects) {
      await db
        .collection("projects")
        .updateOne(
          { slug: project.slug },
          { $setOnInsert: project },
          { upsert: true },
        );
    }
    console.log(
      `[MongoDB] Verified ${initialProjects.length} projects in collection.`,
    );

    // 4. Services Seeding
    const initialServices = [
      {
        id: randomUUID(),
        title: "Websites",
        slug: "websites",
        shortDescription: "that bring you customers",
        description:
          "Fast, reliable business websites engineered with modern Next.js. Integrated with custom booking, lead capture, and frictionless payments.",
        icon: "Globe",
        features:
          "Sub-second Load Times, Custom Booking & Payments, Google Search Authority",
        displayOrder: 1,
        active: true,
        seoTitle: "Websites That Sell — Mayank Sahu",
        seoDescription:
          "Conversion-driven business websites built with Next.js and Tailwind CSS.",
        createdAt: now,
        updatedAt: now,
      },
      {
        id: randomUUID(),
        title: "3D & Animated Sites",
        slug: "threejs",
        shortDescription: "people remember",
        description:
          "Interactive WebGL models, kinetic canvas physics, and smooth scroll narratives that stop visitors in their tracks while maintaining 60fps.",
        icon: "Sparkles",
        features:
          "60fps WebGL Shaders, Interactive Product Viewers, Scroll-Linked Timelines",
        displayOrder: 2,
        active: true,
        seoTitle: "3D & Animated Websites — Mayank Sahu",
        seoDescription:
          "Memorable 3D experiences and WebGL animations for forward-thinking brands.",
        createdAt: now,
        updatedAt: now,
      },
      {
        id: randomUUID(),
        title: "Online Stores",
        slug: "ecommerce",
        shortDescription: "built to convert",
        description:
          "Custom e-commerce storefronts with frictionless checkout, dynamic bundles, and seamless inventory management.",
        icon: "ShoppingBag",
        features:
          "One-Click Mobile Checkout, Cart Recovery Automations, Multi-Currency Support",
        displayOrder: 3,
        active: true,
        seoTitle: "High-Converting Online Stores — Mayank Sahu",
        seoDescription:
          "Custom online shops and e-commerce platforms engineered for revenue.",
        createdAt: now,
        updatedAt: now,
      },
      {
        id: randomUUID(),
        title: "AI Assistants",
        slug: "ai",
        shortDescription: "that never sleep",
        description:
          "Autonomous AI chatbots, qualification workflows, and auto-reply pipelines that engage visitors 24/7.",
        icon: "Bot",
        features:
          "Autonomous Lead Qualifier, CRM Sync & Auto-Handoff, Document & Knowledge RAG",
        displayOrder: 4,
        active: true,
        seoTitle: "Autonomous AI Assistants & Chatbots — Mayank Sahu",
        seoDescription:
          "Smart AI assistants that handle inquiries and automate workflows around the clock.",
        createdAt: now,
        updatedAt: now,
      },
    ];

    for (const service of initialServices) {
      await db
        .collection("services")
        .updateOne(
          { slug: service.slug },
          { $setOnInsert: service },
          { upsert: true },
        );
    }
    console.log(
      `[MongoDB] Verified ${initialServices.length} services in collection.`,
    );

    // 5. Testimonials Seeding
    const initialTestimonials = [
      {
        id: randomUUID(),
        clientName: "Marcus Vance",
        clientDesignation: "Founder & CEO",
        company: "Brass Knuckles Fight Klub",
        content:
          "Mayank took our brand from a local gym to an international streetwear powerhouse. Our merch drops sell out within minutes, and our international orders doubled in the first month.",
        rating: 5,
        featured: true,
        displayOrder: 1,
        status: "PUBLISHED",
        createdAt: now,
        updatedAt: now,
      },
      {
        id: randomUUID(),
        clientName: "Elena Rostova",
        clientDesignation: "Partner",
        company: "Stratedgy Inc",
        content:
          "The AI assistant Mayank built greets enterprise visitors, explains our methodology, and books qualified meetings directly on our partners calendars while we sleep.",
        rating: 5,
        featured: true,
        displayOrder: 2,
        status: "PUBLISHED",
        createdAt: now,
        updatedAt: now,
      },
      {
        id: randomUUID(),
        clientName: "Julian Sterling",
        clientDesignation: "CTO",
        company: "Secnd Soul Labs",
        content:
          "Most developers get scared when you mention WebGL shaders and 60fps mobile constraints. Mayank architected an interactive 3D avatar customizer that stunned our investors.",
        rating: 5,
        featured: true,
        displayOrder: 3,
        status: "PUBLISHED",
        createdAt: now,
        updatedAt: now,
      },
    ];

    for (const testimonial of initialTestimonials) {
      await db
        .collection("testimonials")
        .updateOne(
          { clientName: testimonial.clientName, company: testimonial.company },
          { $setOnInsert: testimonial },
          { upsert: true },
        );
    }
    console.log(
      `[MongoDB] Verified ${initialTestimonials.length} testimonials in collection.`,
    );

    // 6. Clients Seeding
    const initialClients = [
      {
        id: randomUUID(),
        name: "Lijoi",
        slug: "lijoi",
        description: "Rome, Italy",
        displayOrder: 1,
        active: true,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: randomUUID(),
        name: "Marianna Caliandro",
        slug: "marianna-caliandro",
        description: "Milan, Italy",
        displayOrder: 2,
        active: true,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: randomUUID(),
        name: "Secnd Soul",
        slug: "secnd-soul",
        description: "San Francisco, USA",
        displayOrder: 3,
        active: true,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: randomUUID(),
        name: "Stratedgy",
        slug: "stratedgy-client",
        description: "New York, USA",
        displayOrder: 4,
        active: true,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: randomUUID(),
        name: "Brass Knuckles",
        slug: "brass-knuckles",
        description: "Toronto, Canada",
        displayOrder: 5,
        active: true,
        createdAt: now,
        updatedAt: now,
      },
    ];

    for (const cl of initialClients) {
      await db
        .collection("clients")
        .updateOne({ slug: cl.slug }, { $setOnInsert: cl }, { upsert: true });
    }
    console.log(
      `[MongoDB] Verified ${initialClients.length} clients in collection.`,
    );

    // 7. Profile Seeding
    await db.collection("profiles").updateOne(
      { email: "mayanksahu8179@gmail.com" },
      {
        $setOnInsert: {
          id: randomUUID(),
          name: "Mayank Sahu",
          headline: "Creative Full-Stack Developer & Designer",
          introduction: "Websites That Sell. AI That Never Sleeps.",
          biography:
            "Full-stack developer and creative designer crafting high-converting web apps, 3D interactive experiences, online stores, and autonomous AI systems.",
          profileImage: "/images/hero-sunset.jpg",
          location: "Indore, Madhya Pradesh, India",
          availability: "Open for new projects",
          email: "mayanksahu8179@gmail.com",
          socialLinks: JSON.stringify({
            github: "https://github.com/Deadshot-45",
            linkedin: "https://linkedin.com/in/mayank-sahu-ou",
          }),
          createdAt: now,
          updatedAt: now,
        },
      },
      { upsert: true },
    );
    console.log("[MongoDB] Verified profile in collection.");

    // 8. Site Settings Seeding
    const initialSettings = [
      {
        id: randomUUID(),
        key: "site_title",
        value: "Mayank Sahu — Full-Stack Developer & Designer",
        createdAt: now,
        updatedAt: now,
      },
      {
        id: randomUUID(),
        key: "availability_status",
        value: "Open for new projects",
        createdAt: now,
        updatedAt: now,
      },
      {
        id: randomUUID(),
        key: "contact_email",
        value: "mayanksahu8179@gmail.com",
        createdAt: now,
        updatedAt: now,
      },
    ];

    for (const setting of initialSettings) {
      await db
        .collection("site_settings")
        .updateOne(
          { key: setting.key },
          { $setOnInsert: setting },
          { upsert: true },
        );
    }
    console.log("[MongoDB] Verified site settings in collection.");

    console.log(
      "✅ [MongoDB] Seeding complete! Database is initialized and ready.",
    );
  } finally {
    await client.close();
  }
}

main().catch((err) => {
  console.error("[MongoDB] Connection or seeding failed:", err.message);
  process.exit(1);
});
