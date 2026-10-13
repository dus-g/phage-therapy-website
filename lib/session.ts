import { signPayload, verifyPayload } from './crypto';

export const COOKIE = 'huoma_admin_session';
export const MAX_AGE_SECONDS = 60 * 60 * 12; // 12 hours

export async function createSessionToken(email: string): Promise<string> {
  const exp = Date.now() + MAX_AGE_SECONDS * 1000;
  return signPayload({ email, exp });
}

export async function verifySessionToken(
  token?: string | null,
): Promise<{ email: string } | null> {
  if (!token) return null;
  const data = await verifyPayload<{ email?: unknown; exp?: unknown }>(token);
  if (!data) return null;
  if (typeof data.exp !== 'number' || Date.now() > data.exp) return null;
  if (typeof data.email !== 'string') return null;
  return { email: data.email };
}
