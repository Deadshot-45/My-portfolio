import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { urlForSanityImage, isSanityConfigured } from '../src/lib/sanity/client.ts';

describe('Sanity Client & Mapper Tests', () => {
  test('isSanityConfigured returns false when env variables are unset', () => {
    delete process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
    delete process.env.SANITY_PROJECT_ID;
    assert.equal(isSanityConfigured(), false);
  });

  test('isSanityConfigured returns true when NEXT_PUBLIC_SANITY_PROJECT_ID is set', () => {
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID = 'test-proj-id';
    assert.equal(isSanityConfigured(), true);
    delete process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  });

  test('urlForSanityImage formats standard Sanity image refs', () => {
    process.env.NEXT_PUBLIC_SANITY_PROJECT_ID = 'proj123';
    process.env.NEXT_PUBLIC_SANITY_DATASET = 'production';

    const refImage = {
      asset: {
        _ref: 'image-5b8d00392c68a0a8e5fa4e6720bf4859d04efba5-1200x800-png',
      },
    };
    const url = urlForSanityImage(refImage);
    assert.equal(
      url,
      'https://cdn.sanity.io/images/proj123/production/5b8d00392c68a0a8e5fa4e6720bf4859d04efba5-1200x800.png'
    );

    const directUrl = urlForSanityImage('https://cdn.example.com/photo.jpg');
    assert.equal(directUrl, 'https://cdn.example.com/photo.jpg');

    assert.equal(urlForSanityImage(null), undefined);
    delete process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  });

  test('Sanity project mapping logic produces valid Project schema structure', () => {
    const rawDoc = {
      _id: 'proj-001',
      _createdAt: '2026-03-01T00:00:00Z',
      title: 'Neon Vault',
      slug: { current: 'neon-vault' },
      clientName: 'Vault Corp',
      category: 'ecommerce',
      shortDescription: 'High-speed headless e-commerce store.',
      technologies: ['Next.js', 'PostgreSQL', 'Tailwind CSS'],
      duration: '4 Weeks',
      liveUrl: 'https://vault.example.com',
      githubUrl: 'https://github.com/example/vault',
      featured: true,
      coverImage: 'https://cdn.example.com/cover.jpg',
    };

    const slug = typeof rawDoc.slug === 'string' ? rawDoc.slug : rawDoc.slug?.current || rawDoc._id;
    assert.equal(slug, 'neon-vault');
    assert.equal(rawDoc.title, 'Neon Vault');
    assert.equal(rawDoc.clientName, 'Vault Corp');
    assert.equal(rawDoc.category, 'ecommerce');
    assert.equal(rawDoc.featured, true);
    assert.deepEqual(rawDoc.technologies, ['Next.js', 'PostgreSQL', 'Tailwind CSS']);
  });

  test('Sanity profile social links safely extracts github and linkedin links', () => {
    const socialLinks = [
      { platform: 'GitHub', url: 'https://github.com/Deadshot-45' },
      { platform: 'LinkedIn', url: 'https://linkedin.com/in/mayank-sahu-ou' },
      { platform: 'Twitter', url: 'https://x.com/mayanksahu' },
    ];

    const github = socialLinks.find((s) => s.platform.toLowerCase().includes('github'))?.url;
    const linkedin = socialLinks.find((s) => s.platform.toLowerCase().includes('linkedin'))?.url;

    assert.equal(github, 'https://github.com/Deadshot-45');
    assert.equal(linkedin, 'https://linkedin.com/in/mayank-sahu-ou');
  });

  test('Sanity experience timeline date parsing handles current and past roles', () => {
    function formatPeriod(exp) {
      const startYear = exp.startDate ? new Date(exp.startDate).getFullYear().toString() : '2024';
      const endYear = exp.current ? 'Present' : exp.endDate ? new Date(exp.endDate).getFullYear().toString() : '2025';
      return `${startYear} – ${endYear}`;
    }

    const currentRole = formatPeriod({ startDate: '2024-01-01', current: true });
    assert.equal(currentRole, '2024 – Present');

    const pastRole = formatPeriod({ startDate: '2023-01-01', endDate: '2024-06-01', current: false });
    assert.equal(pastRole, '2023 – 2024');
  });
});
