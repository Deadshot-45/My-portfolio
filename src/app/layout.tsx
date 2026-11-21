import type { Metadata } from "next";
import "./globals.css";
import { generatePersonProfileJsonLd, DEFAULT_SITE_URL } from "@/utils/seoUtils";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Mayank Sahu — Full-Stack Developer | React, Next.js, Node.js, TypeScript",
    template: "%s | Mayank Sahu",
  },
  description:
    "Full-Stack Developer with hands-on experience across React.js/Next.js on the frontend, Node.js/Express.js on the backend, and PostgreSQL, MongoDB, Redis, and Socket.io. Building real-time systems, role-based CRMs, and high-performance web applications.",
  keywords: [
    "Mayank Sahu",
    "Full-Stack Developer",
    "MERN Stack Developer",
    "React 19",
    "Next.js App Router",
    "TypeScript",
    "Node.js",
    "Express.js",
    "Socket.io",
    "PostgreSQL",
    "Prisma ORM",
    "Neon DB",
    "MongoDB",
    "Redis",
    "Docker",
    "Indore Developer",
  ],
  authors: [{ name: "Mayank Sahu", url: "https://github.com/Deadshot-45" }],
  creator: "Mayank Sahu",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Mayank Sahu — Full-Stack Developer (MERN / Next.js / TypeScript)",
    description:
      "Full-Stack Developer building scalable web applications and real-time systems. Reduced LCP by 18%, cut redundant API calls by 40%, and maintained 99.9% uptime.",
    url: siteUrl,
    type: "website",
    locale: "en_US",
    siteName: "Mayank Sahu Portfolio",
    images: [
      {
        url: "/images/hero-sunset.jpg",
        width: 1200,
        height: 630,
        alt: "Mayank Sahu — Creative Full-Stack Developer & Designer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mayank Sahu — Full-Stack Developer & Designer",
    description:
      "Full-Stack Developer building scalable web applications, real-time systems, and high-performance interactive experiences.",
    images: ["/images/hero-sunset.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = generatePersonProfileJsonLd({ baseUrl: siteUrl });

  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased selection:bg-emerald-500 selection:text-black">
        {children}
      </body>
    </html>
  );
}
