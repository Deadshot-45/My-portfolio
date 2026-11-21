import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { randomBytes, createHash } from "node:crypto";
import { getCollection, generateId, serializeDoc } from "@/lib/mongodb";

const SESSION_COOKIE = "portfolio_cms_session";
const SESSION_DURATION_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

export interface AdminUserDoc {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
  role: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface SessionDoc {
  id: string;
  tokenHash: string;
  adminUserId: string;
  expiresAt: Date;
  ipAddress?: string;
  userAgent?: string;
  createdAt: Date;
}

// In-memory login rate limiter (email -> { count, resetAt }).
// Suitable for single-instance deploys; use Redis for multi-node production.
const loginAttempts = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes

export function loginRateLimit(email: string): {
  allowed: boolean;
  remaining: number;
} {
  const now = Date.now();
  const record = loginAttempts.get(email);
  if (!record || now > record.resetAt) {
    loginAttempts.set(email, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true, remaining: RATE_LIMIT_MAX - 1 };
  }
  if (record.count >= RATE_LIMIT_MAX) {
    return { allowed: false, remaining: 0 };
  }
  record.count += 1;
  return { allowed: true, remaining: RATE_LIMIT_MAX - record.count };
}

export function recordLoginFailure(email: string): void {
  const now = Date.now();
  const record = loginAttempts.get(email) || {
    count: 0,
    resetAt: now + RATE_LIMIT_WINDOW_MS,
  };
  record.count += 1;
  loginAttempts.set(email, record);
}

export function clearLoginAttempts(email: string): void {
  loginAttempts.delete(email);
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(
  password: string,
  hash: string,
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

function generateToken(): string {
  return randomBytes(32).toString("base64url");
}

function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

function cookieOptions(): {
  httpOnly: boolean;
  secure: boolean;
  sameSite: "lax" | "strict" | "none";
  path: string;
} {
  const isProduction = process.env.NODE_ENV === "production";
  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax" as const,
    path: "/",
  };
}

export async function findAdminByEmail(
  email: string,
): Promise<AdminUserDoc | null> {
  try {
    const adminCol = await getCollection<AdminUserDoc>("admin_users");
    const admin = await adminCol.findOne({ email: email.toLowerCase() });
    console.log("[Auth] Admin lookup:", admin ? admin.email : "null");
    return admin ? serializeDoc<AdminUserDoc>(admin) : null;
  } catch (err) {
    console.error(
      "[Auth Error] Failed to find admin by email:",
      err instanceof Error ? err.message : err,
    );
    return null;
  }
}

/**
 * Create a session for the admin user and set the HTTP-only session cookie.
 * Call this from a Server Action after validating credentials.
 */

export async function createSession(adminUserId: string): Promise<string> {
  const token = generateToken();
  const tokenHash = hashToken(token);
  const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);

  const sessionCol = await getCollection<SessionDoc>("sessions");

  await sessionCol.insertOne({
    id: generateId(),
    tokenHash,
    adminUserId,
    expiresAt,
    createdAt: new Date(),
  });

  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE, token, {
    ...cookieOptions(),
    expires: expiresAt,
  });

  return token;
}


/** Clear the session cookie and revoke the current session. */
export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  cookieStore.delete(SESSION_COOKIE);
  if (token) {
    try {
      const sessionCol = await getCollection<SessionDoc>("sessions");
      await sessionCol.deleteMany({ tokenHash: hashToken(token) });
    } catch {
      // ignore
    }
  }
}

/**
 * Validate the current session and return the authenticated admin user.
 * Returns null when there is no valid session (no cookie, expired, or revoked).
 */

export async function getSession(): Promise<{
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  } | null;
}> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE)?.value;

    if (!token) {
      return { user: null };
    }

    const tokenHash = hashToken(token);
    const sessionCol = await getCollection<SessionDoc>("sessions");

    const session = await sessionCol.findOne({
      tokenHash,
      expiresAt: { $gt: new Date() },
    });

    if (!session) {
      return { user: null };
    }

    const adminCol = await getCollection<AdminUserDoc>("admin_users");

    let admin = await adminCol.findOne({
      id: session.adminUserId,
      isActive: true,
    });

    if (!admin && session.adminUserId) {
      // Support MongoDB documents where identifier is stored in default _id ObjectId
      const { ObjectId } = await import("mongodb");
      if (ObjectId.isValid(session.adminUserId)) {
        admin = await adminCol.findOne({
          _id: new ObjectId(session.adminUserId) as any,
          isActive: true,
        });
      }
    }

    if (!admin) {
      try {
        cookieStore.delete(SESSION_COOKIE);
      } catch {
        // Safe: Server Components cannot mutate cookies
      }
      return { user: null };
    }

    const serialized = serializeDoc<AdminUserDoc>(admin);

    return {
      user: {
        id: serialized.id,
        email: serialized.email,
        name: serialized.name,
        role: serialized.role,
      },
    };
  } catch (error) {
    console.error("[Auth] getSession failed:", error);
    return { user: null };
  }
}

/**
 * Require a valid session. Redirects to the login page when unauthenticated.
 * Intended for Server Components / Server Actions protecting CMS routes.
 */
export async function requireSession(): Promise<{
  user: { id: string; email: string; name: string; role: string };
}> {
  const { user } = await getSession();
  if (!user) {
    redirect("/cms/login");
  }
  return { user };
}

/** Server-side assertion that the caller is an authenticated admin. */
export async function requireAdmin(): Promise<{
  user: { id: string; email: string; name: string; role: string };
}> {
  return requireSession();
}
