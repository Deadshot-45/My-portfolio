import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { filterProjectsByCategory, formatInquiryMailto } from '../dist-test/utils/portfolioUtils.js';
import { PROJECTS, SERVICES, WORK_EXPERIENCE, USER_PROFILE, KEY_METRICS } from '../dist-test/data/portfolioData.js';

describe('Mayank Sahu Portfolio Data & Logic Tests', () => {
  test('filterProjectsByCategory returns all projects when category is "all"', () => {
    const all = filterProjectsByCategory(PROJECTS, 'all');
    assert.equal(all.length, PROJECTS.length);
    assert.ok(all.length >= 4, 'Should contain at least 4 real projects');
  });

  test('filterProjectsByCategory filters correctly by category', () => {
    const realtime = filterProjectsByCategory(PROJECTS, 'realtime');
    assert.ok(realtime.length > 0);
    assert.ok(realtime.every((p) => p.category === 'realtime'));

    const crm = filterProjectsByCategory(PROJECTS, 'crm');
    assert.ok(crm.length > 0);
    assert.ok(crm.every((p) => p.category === 'crm'));

    const ecommerce = filterProjectsByCategory(PROJECTS, 'ecommerce');
    assert.ok(ecommerce.length > 0);
    assert.ok(ecommerce.every((p) => p.category === 'ecommerce'));
  });

  test('formatInquiryMailto encodes user details with correct recipient', () => {
    const link = formatInquiryMailto({
      name: 'Hiring Manager',
      email: 'team@techcompany.com',
      projectType: 'Full-Stack Developer Role',
      timeline: 'Immediate',
      message: 'Discussing our senior MERN/Next.js opening.',
    });

    assert.ok(link.startsWith('mailto:mayanksahu8179@gmail.com?subject='));
    assert.ok(link.includes('Hiring%20Manager'));
    assert.ok(link.includes('Full-Stack%20Developer%20Role'));
  });

  test('real engineering projects are present with valid links', () => {
    const titles = PROJECTS.map((p) => p.title);
    assert.ok(titles.includes('iMessage Web'), 'iMessage Web must exist');
    assert.ok(titles.includes('CRM Management Platform'), 'CRM Management Platform must exist');
    assert.ok(titles.includes('Vault-Vogue'), 'Vault-Vogue must exist');
    assert.ok(titles.includes('Psych-Up Healthcare Platform'), 'Psych-Up must exist');

    const imessage = PROJECTS.find((p) => p.title === 'iMessage Web');
    assert.equal(imessage?.liveUrl, 'https://imessage-hydf.onrender.com');

    const crm = PROJECTS.find((p) => p.title === 'CRM Management Platform');
    assert.equal(crm?.liveUrl, 'https://crm-management-zrog.vercel.app/');

    const vault = PROJECTS.find((p) => p.title === 'Vault-Vogue');
    assert.equal(vault?.liveUrl, 'https://vault-vogue-lite.vercel.app/');
  });

  test('work experience includes LincPay and TCI Express', () => {
    const companies = WORK_EXPERIENCE.map((w) => w.company);
    assert.ok(companies.some((c) => c.includes('LincPay')), 'LincPay experience must exist');
    assert.ok(companies.some((c) => c.includes('TCI Express')), 'TCI Express experience must exist');
  });

  test('user profile matches resume contact information', () => {
    assert.equal(USER_PROFILE.name, 'Mayank Sahu');
    assert.equal(USER_PROFILE.email, 'mayanksahu8179@gmail.com');
    assert.equal(USER_PROFILE.phone, '+91 93019 09040');
    assert.equal(USER_PROFILE.github, 'https://github.com/Deadshot-45');
    assert.equal(USER_PROFILE.linkedin, 'https://linkedin.com/in/mayank-sahu-ou');
  });
});
