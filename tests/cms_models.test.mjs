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
});
