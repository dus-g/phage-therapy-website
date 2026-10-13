import { signPayload, verifyPayload } from './crypto';

// Generous window since these are long forms — someone filling one out
// for 20+ minutes shouldn't have their captcha token expire before they submit.
const MAX_AGE_MS = 60 * 60 * 1000; // 60 minutes

export async function createCaptchaChallenge(): Promise<{ question: string; token: string }> {
  const a = 1 + Math.floor(Math.random() * 9);
  const b = 1 + Math.floor(Math.random() * 9);
  const exp = Date.now() + MAX_AGE_MS;
  const token = await signPayload({ answer: a + b, exp });
  return { question: `${a} + ${b}`, token };
}

export async function verifyCaptcha(token: unknown, answer: unknown): Promise<boolean> {
  if (typeof token !== 'string' || !token) return false;
  const data = await verifyPayload<{ answer?: unknown; exp?: unknown }>(token);
  if (!data) return false;
  if (typeof data.exp !== 'number' || Date.now() > data.exp) return false;
  if (typeof data.answer !== 'number') return false;
  const submitted = typeof answer === 'string' ? Number(answer) : answer;
  return submitted === data.answer;
}
