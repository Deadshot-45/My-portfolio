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
});
