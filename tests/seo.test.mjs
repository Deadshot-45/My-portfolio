import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import {
  generatePersonProfileJsonLd,
  getRobotsConfig,
  getSitemapConfig,
  DEFAULT_SITE_URL,
} from '../dist-test/utils/seoUtils.js';
import { USER_PROFILE, SKILL_GROUPS } from '../dist-test/data/portfolioData.js';

describe('SEO & Structured Data Verification Tests', () => {
  test('generatePersonProfileJsonLd returns valid Schema.org graph with Person and ProfilePage', () => {
    const allSkills = SKILL_GROUPS.flatMap((g) => g.skills);
    const jsonLd = generatePersonProfileJsonLd({
      baseUrl: 'https://mayank-sahu-dev.vercel.app/',
      profile: USER_PROFILE,
      skills: allSkills,
    });

    assert.equal(jsonLd['@context'], 'https://schema.org');
    assert.ok(Array.isArray(jsonLd['@graph']), 'Should contain @graph array');

    const graph = jsonLd['@graph'];
    const profilePage = graph.find((item) => item['@type'] === 'ProfilePage');
    const person = graph.find((item) => item['@type'] === 'Person');
    const website = graph.find((item) => item['@type'] === 'WebSite');

    assert.ok(profilePage, 'ProfilePage entity must be present in @graph');
    assert.ok(person, 'Person entity must be present in @graph');
    assert.ok(website, 'WebSite entity must be present in @graph');

    // Person assertions
    assert.equal(person.name, 'Mayank Sahu');
    assert.equal(person.url, 'https://mayank-sahu-dev.vercel.app');
    assert.ok(person.sameAs.includes('https://github.com/Deadshot-45'));
    assert.ok(person.sameAs.includes('https://linkedin.com/in/mayank-sahu-ou'));
    assert.ok(person.knowsAbout.length >= 5, 'Must list primary engineering competencies');
    assert.ok(person.knowsAbout.includes('React 19') || person.knowsAbout.includes('Next.js (App Router)'));
  });

  test('generatePersonProfileJsonLd handles custom base URL and trims trailing slashes', () => {
    const customUrl = 'https://custom-preview.mayanksahu.dev///';
    const jsonLd = generatePersonProfileJsonLd({ baseUrl: customUrl });
    const person = jsonLd['@graph'].find((item) => item['@type'] === 'Person');
    assert.equal(person.url, 'https://custom-preview.mayanksahu.dev');
  });

  test('getRobotsConfig protects CMS paths while permitting public indexing', () => {
    const robots = getRobotsConfig('https://mayank-sahu-dev.vercel.app');
    assert.ok(Array.isArray(robots.rules));
    const rule = robots.rules[0];
    assert.equal(rule.userAgent, '*');
    assert.equal(rule.allow, '/');
    assert.ok(Array.isArray(rule.disallow));
    assert.ok(rule.disallow.includes('/cms'));
    assert.ok(rule.disallow.includes('/api/cms'));
    assert.equal(robots.sitemap, 'https://mayank-sahu-dev.vercel.app/sitemap.xml');
  });

  test('getSitemapConfig emits canonical root URL with weekly update frequency', () => {
    const fixedDate = new Date('2026-11-13T00:00:00.000Z');
    const sitemap = getSitemapConfig('https://mayank-sahu-dev.vercel.app/', fixedDate);
    assert.ok(Array.isArray(sitemap));
    assert.equal(sitemap.length, 1);
    assert.equal(sitemap[0].url, 'https://mayank-sahu-dev.vercel.app/');
    assert.equal(sitemap[0].changeFrequency, 'weekly');
    assert.equal(sitemap[0].priority, 1.0);
    assert.equal(sitemap[0].lastModified, fixedDate);
  });

  test('seoConfig exports verified portfolio identity and dynamic URL resolution', async () => {
    const { seoConfig, getSiteUrl, isProductionEnvironment } = await import('../dist-test/lib/seo.js');

    assert.equal(seoConfig.name, 'Mayank Sahu');
    assert.equal(seoConfig.shortName, 'Mayank');
    assert.equal(seoConfig.role, 'Creative Full-Stack Developer & Designer');
    assert.equal(seoConfig.email, 'mayanksahu8179@gmail.com');
    assert.equal(seoConfig.phone, '+91 93019 09040');
    assert.equal(seoConfig.location.city, 'Indore');
    assert.equal(seoConfig.socials.github, 'https://github.com/Deadshot-45');
    assert.equal(seoConfig.socials.linkedin, 'https://linkedin.com/in/mayank-sahu-ou');
    assert.ok(seoConfig.skills.length >= 8);
    assert.ok(seoConfig.skills.includes('React 19'));
    assert.ok(seoConfig.skills.includes('Next.js (App Router)') || seoConfig.skills.includes('Next.js'));

    // URL resolution
    const prevSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;
    process.env.NEXT_PUBLIC_SITE_URL = 'https://custom-domain.com/';
    assert.equal(getSiteUrl(), 'https://custom-domain.com');
    delete process.env.NEXT_PUBLIC_SITE_URL;

    process.env.VERCEL_PROJECT_PRODUCTION_URL = 'mayank-portfolio-prod.vercel.app';
    assert.equal(getSiteUrl(), 'https://mayank-portfolio-prod.vercel.app');
    delete process.env.VERCEL_PROJECT_PRODUCTION_URL;

    // Production environment check
    process.env.VERCEL_ENV = 'preview';
    assert.equal(isProductionEnvironment(), false);

    process.env.VERCEL_ENV = 'production';
    assert.equal(isProductionEnvironment(), true);
    delete process.env.VERCEL_ENV;

    if (prevSiteUrl) process.env.NEXT_PUBLIC_SITE_URL = prevSiteUrl;
  });
});
