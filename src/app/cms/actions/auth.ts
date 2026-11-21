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

function extractField(formData: FormData, name: string): string {
  const direct = formData.get(name);
  if (typeof direct === 'string' && direct) return direct;
  // React 19 positional form action payload encoding (e.g. _1_email, _0_email)
  let found = '';
  formData.forEach((value, key) => {
    if (!found && (key === name || key.endsWith(`_${name}`)) && typeof value === 'string' && value) {
      found = value;
    }
  });
  return found;
}


export async function login(formData: FormData) {
  const email = extractField(formData, "email").trim().toLowerCase();
  const password = extractField(formData, "password");

  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  const { allowed } = loginRateLimit(email);

  if (!allowed) {
    return {
      error: "Too many failed attempts. Please try again later.",
    };
  }

  try {
    const admin = await findAdminByEmail(email);

    if (!admin || !admin.isActive) {
      recordLoginFailure(email);
      return { error: "Invalid email or password." };
    }

    const valid = await verifyPassword(password, admin.passwordHash);

    if (!valid) {
      recordLoginFailure(email);
      return { error: "Invalid email or password." };
    }

    await createSession(admin.id);
    clearLoginAttempts(email);
  } catch (error) {
    console.error("[CMS Login] Authentication failed:", error);

    return {
      error: "Unable to sign in right now. Please try again.",
    };
  }

  redirect("/cms/dashboard");
}


export async function logout(): Promise<never> {
  await destroySession();
  redirect('/cms/login');
}
