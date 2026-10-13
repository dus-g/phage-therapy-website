import bcrypt from 'bcryptjs';

/**
 * ADMIN_PASSWORD_HASH is stored base64-encoded so it never contains a literal
 * `$` character — both Docker Compose's .env parser and Next.js's own
 * dotenv-expand-based .env loader treat `$` as the start of a variable
 * reference, which silently mangles a raw bcrypt hash (which is full of
 * `$` delimiters) depending on which tool last touched the file. Base64
 * sidesteps the whole problem: works unmodified in npm/Next dev, Docker
 * Compose, and Vercel's environment variable UI.
 */
function decodeHash(stored: string): string {
  if (stored.startsWith('$2')) return stored; // raw hash, used as-is
  try {
    const decoded = Buffer.from(stored, 'base64').toString('utf8');
    return decoded.startsWith('$2') ? decoded : stored;
  } catch {
    return stored;
  }
}

export async function verifyCredentials(email: string, password: string): Promise<boolean> {
  const adminEmail = process.env.ADMIN_EMAIL;
  const storedHash = process.env.ADMIN_PASSWORD_HASH;

  if (!adminEmail || !storedHash) {
    console.error('ADMIN_EMAIL / ADMIN_PASSWORD_HASH are not set in the environment.');
    return false;
  }

  if (email.trim().toLowerCase() !== adminEmail.trim().toLowerCase()) {
    return false;
  }

  return bcrypt.compare(password, decodeHash(storedHash));
}
