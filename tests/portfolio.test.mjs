import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { filterProjectsByCategory, calculateCaffeinePerk, formatInquiryMailto, getSkySceneConfig, cleanDisplayUrl, getProjectPreviewUrl } from '../dist-test/utils/portfolioUtils.js';
import { PROJECTS, SERVICES, CLIENT_REVIEWS, CLIENT_MARKS } from '../dist-test/data/portfolioData.js';

describe('Portfolio Reference & Integrity Tests', () => {
  test('filterProjectsByCategory returns all projects when category is "all"', () => {
    const all = filterProjectsByCategory(PROJECTS, 'all');
    assert.equal(all.length, PROJECTS.length);
    assert.ok(all.length >= 3, 'Should have at least 3 featured projects');
  });

  test('filterProjectsByCategory filters correctly by category', () => {
    const ecommerce = filterProjectsByCategory(PROJECTS, 'ecommerce');
    assert.ok(ecommerce.length > 0);
    assert.ok(ecommerce.every((p) => p.category === 'ecommerce'));

    const websites = filterProjectsByCategory(PROJECTS, 'websites');
    assert.ok(websites.length > 0);
    assert.ok(websites.every((p) => p.category === 'websites'));
  });

  test('calculateCaffeinePerk handles boundary values without error', () => {
    const level1 = calculateCaffeinePerk(0);
    assert.equal(level1.title, 'Cold Brew Ignition');

    const level2 = calculateCaffeinePerk(4);
    assert.equal(level2.title, 'Double Shot Velocity');

    const level3 = calculateCaffeinePerk(8);
    assert.equal(level3.title, 'Triple Ristretto God-Mode');
  });

  test('formatInquiryMailto encodes user details properly', () => {
    const link = formatInquiryMailto({
      name: 'Elena Rostova',
      email: 'elena@stratedgy.com',
      projectType: 'Autonomous AI Assistant',
      budgetRange: '$10,000 - $20,000',
      timeline: 'Standard (2 - 4 weeks)',
      message: 'Need an AI assistant for client onboarding.',
    });

    assert.ok(link.startsWith('mailto:mayanksahu8179@gmail.com?subject='));
    assert.ok(link.includes('Elena%20Rostova'));
  });

  test('cleanDisplayUrl and getProjectPreviewUrl generate clean preview URLs and hostnames', () => {
    // URL cleaning
    assert.equal(cleanDisplayUrl('https://crm-management-zrog.vercel.app/'), 'crm-management-zrog.vercel.app');
    assert.equal(cleanDisplayUrl('http://www.example.com/demo'), 'example.com');
    assert.equal(cleanDisplayUrl(''), '');

    // Preview URL generation
    const withCover = getProjectPreviewUrl({ coverImage: 'https://ik.imagekit.io/crm.jpg', liveUrl: 'https://demo.com' });
    assert.equal(withCover, 'https://ik.imagekit.io/crm.jpg');

    const withLiveUrl = getProjectPreviewUrl({ liveUrl: 'https://crm-management-zrog.vercel.app/' });
    assert.ok(withLiveUrl?.includes('wp.com/mshots/v1/'));
    assert.ok(withLiveUrl?.includes('crm-management-zrog.vercel.app'));

    const empty = getProjectPreviewUrl({});
    assert.equal(empty, undefined);
  });

  test('all required services exist in portfolioData', () => {
    const serviceIds = SERVICES.map((s) => s.id);
    assert.ok(serviceIds.includes('websites'), 'Websites service must exist');
    assert.ok(serviceIds.includes('threejs'), '3D & Animated Sites service must exist');
    assert.ok(serviceIds.includes('ecommerce'), 'Online Stores service must exist');
    assert.ok(serviceIds.includes('ai'), 'AI Assistants service must exist');
  });

  test('client marks and reviews exist for reference compatibility', () => {
    assert.ok(CLIENT_MARKS.length >= 8);
    assert.ok(CLIENT_REVIEWS.length >= 5);
  });

  test('getSkySceneConfig returns accurate contrast and filter state per SkyMode', () => {
    const day = getSkySceneConfig('day');
    assert.equal(day.isDarkText, true);
    assert.notEqual(day.imageFilter, 'none');

    const sunset = getSkySceneConfig('sunset');
    assert.equal(sunset.isDarkText, false);
    assert.equal(sunset.imageFilter, 'none');

    const night = getSkySceneConfig('night');
    assert.equal(night.isDarkText, false);
    assert.ok(night.imageFilter.includes('brightness(0.38)'));
  });

  test('navbar difference blend contrast guarantees readable inverted colors across all surfaces', () => {
    function computeDifferenceColor(hexBg) {
      const cleanHex = hexBg.replace('#', '');
      const r = parseInt(cleanHex.substring(0, 2), 16);
      const g = parseInt(cleanHex.substring(2, 4), 16);
      const b = parseInt(cleanHex.substring(4, 6), 16);
      // In difference mode against pure white (255, 255, 255):
      return {
        r: 255 - r,
        g: 255 - g,
        b: 255 - b,
      };
    }

    // Relative luminance calculation for WCAG contrast verification
    function getLuminance({ r, g, b }) {
      const a = [r, g, b].map((v) => {
        const val = v / 255;
        return val <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
      });
      return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
    }

    function getContrast(hexBg) {
      const fg = computeDifferenceColor(hexBg);
      const cleanHex = hexBg.replace('#', '');
      const bg = {
        r: parseInt(cleanHex.substring(0, 2), 16),
        g: parseInt(cleanHex.substring(2, 4), 16),
        b: parseInt(cleanHex.substring(4, 6), 16),
      };
      const l1 = Math.max(getLuminance(fg), getLuminance(bg));
      const l2 = Math.min(getLuminance(fg), getLuminance(bg));
      return (l1 + 0.05) / (l2 + 0.05);
    }

    // 1. White sections (WhyCustom, Craft, Process): pure black inverted output
    const whiteOut = computeDifferenceColor('ffffff');
    assert.deepEqual(whiteOut, { r: 0, g: 0, b: 0 });
    assert.ok(getContrast('ffffff') >= 20, 'Contrast on white surfaces must be >= 20:1');

    // 2. Dark sections (ServicesIntro, SelectedWork, Experience): crisp near-white output
    const darkOut = computeDifferenceColor('07070a');
    assert.ok(darkOut.r >= 240 && darkOut.g >= 240 && darkOut.b >= 240);
    assert.ok(getContrast('07070a') >= 15, 'Contrast on dark surfaces must be >= 15:1');

    // 3. Laptop stage center mockup (0f0f0f) - solves the center wordmark clash!
    const laptopOut = computeDifferenceColor('0f0f0f');
    assert.ok(laptopOut.r >= 235 && laptopOut.g >= 235 && laptopOut.b >= 235);
    assert.ok(getContrast('0f0f0f') >= 14, 'Contrast on laptop bezel must be >= 14:1');

    // 4. Footer container card (050505) - solves the footer card clash!
    const footerCardOut = computeDifferenceColor('050505');
    assert.ok(footerCardOut.r >= 245 && footerCardOut.g >= 245 && footerCardOut.b >= 245);
    assert.ok(getContrast('050505') >= 18, 'Contrast on footer dark card must be >= 18:1');
  });

  test('Tailwind CSS v4 CSS-first configuration and tokens are valid', () => {
    const cssPath = path.resolve('src/app/globals.css');
    assert.ok(fs.existsSync(cssPath), 'globals.css must exist');
    const css = fs.readFileSync(cssPath, 'utf8');

    // Verify v4 import and custom variant
    assert.ok(css.includes('@import "tailwindcss";'), 'globals.css must import tailwindcss v4');
    assert.ok(css.includes('@custom-variant dark'), 'globals.css must define class-based custom dark variant');
    assert.ok(css.includes('@theme {'), 'globals.css must define @theme directive');

    // Verify key design tokens
    assert.ok(css.includes('--color-dark-950: #060608;'), 'Must preserve dark-950 palette');
    assert.ok(css.includes('--color-accent-emerald: #10b981;'), 'Must preserve emerald accent');
    assert.ok(css.includes('--animate-marquee:'), 'Must preserve marquee animation token');
    assert.ok(css.includes('--color-border: var(--border);'), 'Must map semantic border token');
    assert.ok(css.includes('--color-background: var(--background);'), 'Must map semantic background token');

    // Verify PostCSS config points to @tailwindcss/postcss
    const postCssPath = path.resolve('postcss.config.mjs');
    assert.ok(fs.existsSync(postCssPath), 'postcss.config.mjs must exist');
    const postCss = fs.readFileSync(postCssPath, 'utf8');
    assert.ok(postCss.includes('@tailwindcss/postcss'), 'PostCSS config must use @tailwindcss/postcss');
  });

  test('InquiryModal and ProjectDetailModal integrate Shadcn Dialog primitives with accessible labels', () => {
    const inquiryPath = path.resolve('src/components/InquiryModal.tsx');
    const projectPath = path.resolve('src/components/ProjectDetailModal.tsx');

    assert.ok(fs.existsSync(inquiryPath), 'InquiryModal must exist');
    assert.ok(fs.existsSync(projectPath), 'ProjectDetailModal must exist');

    const inquirySrc = fs.readFileSync(inquiryPath, 'utf8');
    const projectSrc = fs.readFileSync(projectPath, 'utf8');

    // Both must use Shadcn Dialog components
    assert.ok(inquirySrc.includes("from '@/components/ui/dialog'"), 'InquiryModal must import from shadcn dialog');
    assert.ok(inquirySrc.includes('<Dialog open={isOpen}'), 'InquiryModal must use Dialog with open prop');
    assert.ok(inquirySrc.includes('<DialogTitle'), 'InquiryModal must provide DialogTitle');
    assert.ok(inquirySrc.includes('<DialogDescription'), 'InquiryModal must provide DialogDescription');

    assert.ok(projectSrc.includes("from '@/components/ui/dialog'"), 'ProjectDetailModal must import from shadcn dialog');
    assert.ok(projectSrc.includes('<Dialog open={Boolean(project)}'), 'ProjectDetailModal must use Dialog with open prop');
    assert.ok(projectSrc.includes('<DialogTitle'), 'ProjectDetailModal must provide DialogTitle');
    assert.ok(projectSrc.includes('<DialogDescription'), 'ProjectDetailModal must provide DialogDescription');

    // Both must use responsive bottom layout to prevent small screen cramping
    assert.ok(inquirySrc.includes('flex flex-col-reverse sm:flex-row'), 'InquiryModal must stack bottom actions on small screens');
    assert.ok(projectSrc.includes('flex flex-col sm:flex-row'), 'ProjectDetailModal must stack action links on small screens');
    assert.ok(inquirySrc.includes('100dvh'), 'InquiryModal must fit within dynamic viewport height');
    assert.ok(projectSrc.includes('100dvh'), 'ProjectDetailModal must fit within dynamic viewport height');
  });

  test('InViewSection and page.tsx implement on-demand viewport-based section imports', () => {
    const inViewSectionPath = path.resolve('src/components/InViewSection.tsx');
    const pagePath = path.resolve('src/app/page.tsx');

    assert.ok(fs.existsSync(inViewSectionPath), 'InViewSection.tsx must exist');
    assert.ok(fs.existsSync(pagePath), 'page.tsx must exist');

    const inViewSrc = fs.readFileSync(inViewSectionPath, 'utf8');
    const pageSrc = fs.readFileSync(pagePath, 'utf8');

    // InViewSection must use IntersectionObserver, handle hash deep-links, and clean up observer
    assert.ok(inViewSrc.includes('IntersectionObserver'), 'InViewSection must use native IntersectionObserver');
    assert.ok(inViewSrc.includes('rootMargin'), 'InViewSection must support rootMargin pre-fetching');
    assert.ok(inViewSrc.includes('window.location.hash'), 'InViewSection must support URL hash anchor navigation');
    assert.ok(inViewSrc.includes('observer.disconnect()'), 'InViewSection must clean up observer on intersection or unmount');

    // page.tsx must use dynamic imports for below-the-fold sections
    assert.ok(pageSrc.includes("import dynamic from 'next/dynamic'"), 'page.tsx must import dynamic from next/dynamic');
    assert.ok(pageSrc.includes('dynamic('), 'page.tsx must configure dynamic imports');
    assert.ok(pageSrc.includes('<InViewSection'), 'page.tsx must wrap below-the-fold sections in InViewSection');
    assert.ok(pageSrc.includes('isInquiryOpen && ('), 'page.tsx must conditionally mount InquiryModal on demand');
    assert.ok(pageSrc.includes('selectedProject && ('), 'page.tsx must conditionally mount ProjectDetailModal on demand');
  });

  test('GitHub Actions CI and Deploy workflows use pnpm with correct lockfile caching', () => {
    const ciPath = path.resolve('.github/workflows/ci.yml');
    const deployPath = path.resolve('.github/workflows/deploy.yml');

    assert.ok(fs.existsSync(ciPath), 'ci.yml must exist');
    assert.ok(fs.existsSync(deployPath), 'deploy.yml must exist');

    const ciSrc = fs.readFileSync(ciPath, 'utf8');
    const deploySrc = fs.readFileSync(deployPath, 'utf8');

    // Both workflows must use pnpm setup action and pnpm cache
    assert.ok(ciSrc.includes('pnpm/action-setup'), 'ci.yml must use pnpm/action-setup');
    assert.ok(ciSrc.includes("cache: 'pnpm'"), 'ci.yml must configure setup-node with pnpm cache');
    assert.ok(ciSrc.includes('pnpm install --frozen-lockfile'), 'ci.yml must install via pnpm frozen lockfile');
    assert.ok(ciSrc.includes('pnpm-lock.yaml'), 'ci.yml cache key must track pnpm-lock.yaml');

    assert.ok(deploySrc.includes('pnpm/action-setup'), 'deploy.yml must use pnpm/action-setup');
    assert.ok(deploySrc.includes("cache: 'pnpm'"), 'deploy.yml must configure setup-node with pnpm cache');
    assert.ok(deploySrc.includes('pnpm install --frozen-lockfile'), 'deploy.yml must install via pnpm frozen lockfile');
  });

  test('Route transition progress bar, loading skeletons, and faded dialog modal borders', () => {
    const layoutPath = path.resolve('src/app/layout.tsx');
    const skeletonPath = path.resolve('src/components/ui/skeleton.tsx');
    const loadingPath = path.resolve('src/app/loading.tsx');
    const cmsLoadingPath = path.resolve('src/app/cms/loading.tsx');
    const dialogPath = path.resolve('src/components/ui/dialog.tsx');
    const inquiryPath = path.resolve('src/components/InquiryModal.tsx');
    const projectDetailPath = path.resolve('src/components/ProjectDetailModal.tsx');

    assert.ok(fs.existsSync(layoutPath), 'layout.tsx must exist');
    assert.ok(fs.existsSync(skeletonPath), 'skeleton.tsx must exist');
    assert.ok(fs.existsSync(loadingPath), 'app/loading.tsx must exist');
    assert.ok(fs.existsSync(cmsLoadingPath), 'app/cms/loading.tsx must exist');

    const layoutSrc = fs.readFileSync(layoutPath, 'utf8');
    const dialogSrc = fs.readFileSync(dialogPath, 'utf8');
    const inquirySrc = fs.readFileSync(inquiryPath, 'utf8');
    const projectDetailSrc = fs.readFileSync(projectDetailPath, 'utf8');

    // Route progress loader must be present in RootLayout
    assert.ok(layoutSrc.includes('NextTopLoader'), 'layout.tsx must render NextTopLoader');
    assert.ok(layoutSrc.includes('#9bf35a'), 'NextTopLoader must use signature brand color');

    // Dialog borders must use soft faded borders instead of stark grey borders
    assert.ok(dialogSrc.includes('border-white/10'), 'ui/dialog.tsx must use faded border-white/10');
    assert.ok(inquirySrc.includes('border-white/10'), 'InquiryModal must use faded border-white/10 in dark mode');
    assert.ok(projectDetailSrc.includes('border-white/10'), 'ProjectDetailModal must use faded border-white/10 in dark mode');
  });
});
