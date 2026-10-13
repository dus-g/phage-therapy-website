#!/usr/bin/env node
/**
 * Usage: npm run hash:password -- "your-new-password"
 * Prints a base64-encoded bcrypt hash to paste into ADMIN_PASSWORD_HASH.
 *
 * Base64 encoding is used (rather than the raw "$2a$10$..." hash) because
 * a literal `$` in a .env file gets misinterpreted as a variable reference
 * by both Docker Compose and Next.js's own .env loader — base64 has no `$`
 * in it, so it works unmodified everywhere: npm run dev, Docker Compose,
 * and Vercel's environment variable UI.
 */
const bcrypt = require('bcryptjs');

const password = process.argv[2];

if (!password) {
  console.error('Usage: npm run hash:password -- "your-password"');
  process.exit(1);
}

const hash = bcrypt.hashSync(password, 10);
const encoded = Buffer.from(hash, 'utf8').toString('base64');

console.log('\nAdd this to your .env file — works everywhere, no escaping needed:\n');
console.log(`ADMIN_PASSWORD_HASH="${encoded}"\n`);
