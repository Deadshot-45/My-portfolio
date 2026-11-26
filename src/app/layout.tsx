import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";
import { seoConfig, getSiteUrl, isProductionEnvironment } from "@/lib/seo";
import { getSeoSettings } from "@/lib/cms/settings";

const siteUrl = getSiteUrl();

export async function generateMetadata(): Promise<Metadata> {
  const isProduction = isProductionEnvironment();

  let cmsTitle = `${seoConfig.name} | ${seoConfig.role}`;
  let cmsDesc = seoConfig.description;
  let cmsKeywords = seoConfig.keywords;
  let cmsOgImage = `${siteUrl}/images/hero-sunset.jpg`;
  let cmsCanonical = siteUrl;

  try {
    const rawSettings = await getSeoSettings();
    const map: Record<string, string> = {};
    for (const s of rawSettings) {
      if (s.value) map[s.key] = s.value;
    }
    if (map['seo:meta_title']) cmsTitle = map['seo:meta_title'];
    if (map['seo:meta_description']) cmsDesc = map['seo:meta_description'];
    if (map['seo:keywords']) cmsKeywords = map['seo:keywords'].split(',').map((k) => k.trim()).filter(Boolean);
    if (map['seo:og_image']) {
      cmsOgImage = map['seo:og_image'].startsWith('http')
        ? map['seo:og_image']
        : `${siteUrl}${map['seo:og_image'].startsWith('/') ? '' : '/'}${map['seo:og_image']}`;
    }
    if (map['seo:canonical_url']) cmsCanonical = map['seo:canonical_url'];
  } catch {
    // Safe fallback to static seoConfig during cold starts or build time
  }

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: cmsTitle,
      template: `%s | ${seoConfig.name}`,
    },
    description: cmsDesc,
    authors: [{ name: seoConfig.name, url: siteUrl }],
    creator: seoConfig.name,
    publisher: seoConfig.name,
    keywords: cmsKeywords,
    robots: isProduction
      ? {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        }
      : {
          index: false,
          follow: false,
          nocache: true,
        },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: cmsCanonical,
      siteName: `${seoConfig.name} Portfolio`,
      title: cmsTitle,
      description: cmsDesc,
      images: [
        {
          url: cmsOgImage,
          width: 1200,
          height: 630,
          alt: `${seoConfig.name} — ${seoConfig.role}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: cmsTitle,
      description: cmsDesc,
      images: [cmsOgImage],
      creator: "@Deadshot_45",
    },
    alternates: {
      canonical: cmsCanonical,
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteUrl}/#person`,
    name: seoConfig.name,
    alternateName: [seoConfig.shortName, "Deadshot-45"],
    jobTitle: seoConfig.role,
    description: seoConfig.description,
    url: siteUrl,
    image: `${siteUrl}/images/hero-sunset.jpg`,
    email: `mailto:${seoConfig.email}`,
    telephone: seoConfig.phone,
    sameAs: [seoConfig.socials.github, seoConfig.socials.linkedin].filter(Boolean),
    address: {
      "@type": "PostalAddress",
      addressLocality: seoConfig.location.city,
      addressRegion: seoConfig.location.state,
      addressCountry: seoConfig.location.countryCode,
    },
    knowsAbout: seoConfig.skills,
    mainEntityOfPage: {
      "@type": "ProfilePage",
      "@id": `${siteUrl}/#profilepage`,
    },
  };

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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
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
