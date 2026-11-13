import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title:
    "Mayank Sahu — Full-Stack Developer | React, Next.js, Node.js, TypeScript",
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
  openGraph: {
    title: "Mayank Sahu — Full-Stack Developer (MERN / Next.js / TypeScript)",
    description:
      "Full-Stack Developer building scalable web applications and real-time systems. Reduced LCP by 18%, cut redundant API calls by 40%, and maintained 99.9% uptime.",
    type: "website",
    locale: "en_US",
    siteName: "Mayank Sahu Portfolio",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className="antialiased selection:bg-emerald-500 selection:text-black">
        {children}
      </body>
    </html>
  );
}
