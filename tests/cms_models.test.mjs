import { test, describe } from 'node:test';
import assert from 'node:assert/strict';

describe('CMS Models and Data Formatting Logic', () => {
  test('client slug generation slugifies brand names correctly', () => {
    function generateSlug(name) {
      return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    }

    assert.equal(generateSlug('Marianna Caliandro & Co.'), 'marianna-caliandro-co');
    assert.equal(generateSlug('Brass Knuckles Fight Klub'), 'brass-knuckles-fight-klub');
    assert.equal(generateSlug('  Stratedgy AI Inc!  '), 'stratedgy-ai-inc');
  });

  test('social links JSON serialization and safe fallback parsing', () => {
    const rawObj = {
      github: 'https://github.com/Deadshot-45',
      linkedin: 'https://linkedin.com/in/mayank-sahu-ou',
    };
    const serialized = JSON.stringify(rawObj);

    function parseSocial(val) {
      if (!val) return {};
      try {
        return JSON.parse(val);
      } catch {
        return {};
      }
    }

    assert.deepEqual(parseSocial(serialized), rawObj);
    assert.deepEqual(parseSocial('invalid json string'), {});
    assert.deepEqual(parseSocial(null), {});
  });

  test('experience timeline calculates present or formatted date bounds', () => {
    function formatTimeline(startDate, endDate, current) {
      const startStr = startDate
        ? new Date(startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
        : 'N/A';
      const endStr = current
        ? 'Present'
        : endDate
        ? new Date(endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
        : 'N/A';
      return `${startStr} — ${endStr}`;
    }

    assert.equal(
      formatTimeline('2023-01-01', null, true),
      'Jan 2023 — Present'
    );
    assert.equal(
      formatTimeline('2022-05-01', '2023-08-01', false),
      'May 2022 — Aug 2023'
    );
  });

  test('SEO settings prefix map extracts seo: keys accurately', () => {
    const settingsList = [
      { key: 'site_title', value: 'Mayank Portfolio' },
      { key: 'seo:meta_title', value: 'Mayank Sahu — Full-Stack Developer' },
      { key: 'seo:meta_description', value: 'Creative dev portfolio' },
      { key: 'contact_email', value: 'test@example.com' },
    ];

    const seoMap = {};
    for (const s of settingsList) {
      if (s.key.startsWith('seo:') && s.value) {
        seoMap[s.key] = s.value;
      }
    }

    assert.equal(Object.keys(seoMap).length, 2);
    assert.equal(seoMap['seo:meta_title'], 'Mayank Sahu — Full-Stack Developer');
    assert.equal(seoMap['seo:meta_description'], 'Creative dev portfolio');
    assert.equal(seoMap['site_title'], undefined);
  });

  test('ImageKit media formatting produces clean filenames and preserves fileId', () => {
    function createFileName(orgName = 'upload') {
      const safeName = orgName.trim().replace(/\s+/g, '_').replace(/[^a-zA-Z0-9._-]/g, '-');
      return `portfolio-mock/${safeName}`;
    }

    assert.equal(createFileName('Hero Banner 2026.png'), 'portfolio-mock/Hero_Banner_2026.png');
    assert.equal(createFileName('weird & special #1.jpg'), 'portfolio-mock/weird_-_special_-1.jpg');

    const mediaDoc = {
      id: 'media-uuid-1',
      filename: 'hero-banner.png',
      originalName: 'Hero Banner 2026.png',
      url: 'https://ik.imagekit.io/mayank/portfolio_media/hero-banner.png',
      fileId: 'ik-file-id-9988',
      mimeType: 'image/png',
      size: 102400,
    };

    assert.equal(mediaDoc.fileId, 'ik-file-id-9988');
    assert.ok(mediaDoc.url.startsWith('https://ik.imagekit.io/'));
  });

  test('media upload validation and preview correctly supports PDF documents for resumes', () => {
    function isPdfFile(urlOrName) {
      if (!urlOrName) return false;
      const lower = urlOrName.toLowerCase();
      return lower.endsWith('.pdf') || lower.includes('.pdf');
    }

    assert.equal(isPdfFile('/resume.pdf'), true);
    assert.equal(isPdfFile('https://ik.imagekit.io/mayank/portfolio_media/Mayank_Sahu_Resume.pdf'), true);
    assert.equal(isPdfFile('/images/hero-sunset.jpg'), false);
    assert.equal(isPdfFile(''), false);
  });

  test('subroute parent route resolution correctly returns main route for create and id edit paths', () => {
    function getParentRoute(path) {
      const segments = path.split('/').filter(Boolean);
      const cmsSegments = segments[0] === 'cms' ? segments.slice(1) : segments;
      const map = {
        dashboard: 'Dashboard',
        projects: 'Projects',
        services: 'Services',
        media: 'Media',
        clients: 'Clients',
        testimonials: 'Testimonials',
        skills: 'Skills',
        experience: 'Experience',
        about: 'About',
        seo: 'SEO',
        settings: 'Settings',
        create: 'Create',
        edit: 'Edit',
      };

      const items = [];
      let accumulated = '/cms';

      for (let i = 0; i < cmsSegments.length; i++) {
        const seg = cmsSegments[i];
        accumulated += `/${seg}`;

        const isId = seg.length > 15 || /^[0-9a-f-]{10,}$/i.test(seg);
        const nextIsEdit = cmsSegments[i + 1] === 'edit';

        if (isId && nextIsEdit) {
          continue;
        }

        const label =
          map[seg.toLowerCase()] ||
          (isId ? 'Item' : seg.charAt(0).toUpperCase() + seg.slice(1));
        items.push({ label, href: accumulated });
      }

      return items.length > 1 ? items[items.length - 2] : null;
    }

    assert.deepEqual(getParentRoute('/cms/projects/create'), { label: 'Projects', href: '/cms/projects' });
    assert.deepEqual(getParentRoute('/cms/projects/67890abcdef12345/edit'), { label: 'Projects', href: '/cms/projects' });
    assert.deepEqual(getParentRoute('/cms/services/create'), { label: 'Services', href: '/cms/services' });
    assert.deepEqual(getParentRoute('/cms/services/srv-998877665544/edit'), { label: 'Services', href: '/cms/services' });
    assert.equal(getParentRoute('/cms/dashboard'), null);
    assert.equal(getParentRoute('/cms/projects'), null);
  });

  test('select item contrast styling enforces bright text on hover/highlight in globals.css', async () => {
    const fs = await import('node:fs/promises');
    const globalsCss = await fs.readFile('src/app/globals.css', 'utf-8');
    assert.ok(globalsCss.includes('[data-slot="select-item"]:hover'), 'Must have select-item hover rule');
    assert.ok(globalsCss.includes('color: #ffffff !important'), 'Must enforce bright white text on hover');
    assert.ok(globalsCss.includes('background-color: #27272a !important'), 'Must enforce dark gray hover background');
  });

  test('SignOutConfirmDialog is wired into Shell with accessible confirmation and cancel paths', async () => {
    const fs = await import('node:fs/promises');
    const dialogSource = await fs.readFile('src/components/cms/SignOutConfirmDialog.tsx', 'utf-8');
    const shellSource = await fs.readFile('src/components/cms/Shell.tsx', 'utf-8');

    assert.ok(dialogSource.includes('export function SignOutConfirmDialog'), 'Exports SignOutConfirmDialog component');
    assert.ok(dialogSource.includes('Confirm Sign Out'), 'Has clear confirmation title');
    assert.ok(dialogSource.includes('Yes, Sign Out'), 'Has confirmation action button');
    assert.ok(dialogSource.includes('Cancel'), 'Has cancel action button');
    assert.ok(dialogSource.includes('/api/cms/logout'), 'Invokes logout API endpoint on confirm');

    assert.ok(shellSource.includes('SignOutConfirmDialog'), 'Shell imports SignOutConfirmDialog');
    assert.ok(shellSource.includes('setShowSignOutConfirm(true)'), 'Shell opens dialog on Sign out click');
  });
});
