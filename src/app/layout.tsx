import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";
import { generatePersonProfileJsonLd, DEFAULT_SITE_URL } from "@/utils/seoUtils";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || DEFAULT_SITE_URL;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Mayank | Full-Stack Developer & UI/UX Designer",
    template: "%s | Mayank Portfolio",
  },
  description:
    "Portfolio of Mayank, a Full-Stack Developer and UI/UX Designer specializing in building performant, accessible web applications and immersive digital experiences.",
  authors: [{ name: "Mayank", url: siteUrl }],
  creator: "Mayank",
  publisher: "Mayank",
  keywords: [
    "Full-Stack Developer",
    "UI/UX Designer",
    "Next.js Developer",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Web Development",
    "Portfolio",
    "Creative Developer",
  ],
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Mayank Portfolio",
    title: "Mayank | Full-Stack Developer & UI/UX Designer",
    description:
      "Crafting performant digital experiences, modern full-stack web applications, and intuitive user interfaces.",
    images: [
      {
        url: "/images/hero-sunset.jpg",
        width: 1200,
        height: 630,
        alt: "Mayank Portfolio - Full-Stack Developer & UI/UX Designer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mayank | Full-Stack Developer & UI/UX Designer",
    description:
      "Crafting performant digital experiences, modern full-stack web applications, and intuitive user interfaces.",
    images: ["/images/hero-sunset.jpg"],
    creator: "@mayank",
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = generatePersonProfileJsonLd({ baseUrl: siteUrl });

  return (
    <html lang="en" className="dark" data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Space+Grotesk:wght@300;400;500;600;700&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="dark antialiased selection:bg-emerald-500/20 selection:text-emerald-300">
        <NextTopLoader
          color="#9bf35a"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #9bf35a,0 0 5px #9bf35a"
        />
        {children}
      </body>
    </html>
  );
}
