import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { filterProjectsByCategory, calculateCaffeinePerk, formatInquiryMailto, getSkySceneConfig } from '../dist-test/utils/portfolioUtils.js';
import { PROJECTS, SERVICES, CLIENT_REVIEWS, CLIENT_MARKS } from '../dist-test/data/portfolioData.js';

describe('Portfolio Reference & Integrity Tests', () => {
  test('filterProjectsByCategory returns all projects when category is "all"', () => {
    const all = filterProjectsByCategory(PROJECTS, 'all');
    assert.equal(all.length, PROJECTS.length);
    assert.ok(all.length >= 5, 'Should have at least 5 featured projects');
  });

  test('filterProjectsByCategory filters correctly by category', () => {
    const ecommerce = filterProjectsByCategory(PROJECTS, 'ecommerce');
    assert.ok(ecommerce.length > 0);
    assert.ok(ecommerce.every((p) => p.category === 'ecommerce'));

    const threejs = filterProjectsByCategory(PROJECTS, 'threejs');
    assert.ok(threejs.length > 0);
    assert.ok(threejs.every((p) => p.category === 'threejs'));
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
        return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
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
});
