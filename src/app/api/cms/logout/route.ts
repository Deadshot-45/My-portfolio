import { NextResponse } from 'next/server';
import { destroySession } from '@/lib/auth';

/**
 * POST /api/cms/logout
 * Revokes the current session and clears the HTTP-only cookie.
 */
export async function POST() {
  await destroySession();
  return NextResponse.json({ ok: true });
}
