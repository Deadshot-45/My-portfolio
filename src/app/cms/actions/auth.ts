'use server';

import { redirect } from 'next/navigation';

import {
  createSession,
  destroySession,
  loginRateLimit,
  recordLoginFailure,
  clearLoginAttempts,
  verifyPassword,
  findAdminByEmail,
} from '@/lib/auth';

export async function login(formData: FormData) {
  'use server';
  const email = String(formData.get('email') || '').trim().toLowerCase();
  const password = String(formData.get('password') || '');

  if (!email || !password) {
    return { error: 'Email and password are required.' };
  }

  const { allowed } = loginRateLimit(email);
  if (!allowed) {
    return { error: 'Too many failed attempts. Please try again later.' };
  }

  // Look up the admin by email. A missing/inactive admin and a wrong password
  // produce the same generic message to avoid email enumeration.
  const admin = await findAdminByEmail(email);

  if (!admin || !admin.isActive) {
    recordLoginFailure(email);
    return { error: 'Invalid email or password.' };
  }

  const valid = await verifyPassword(password, admin.passwordHash);

  if (!valid) {
    recordLoginFailure(email);
    return { error: 'Invalid email or password.' };
  }

  clearLoginAttempts(email);
  await createSession(admin.id);
  redirect('/cms/dashboard');
}

export async function logout(): Promise<never> {
  await destroySession();
  redirect('/cms/login');
}
