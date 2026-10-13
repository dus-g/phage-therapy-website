import { NextRequest, NextResponse } from 'next/server';
import { verifyCredentials } from '@/lib/auth';
import { createSessionToken, COOKIE, MAX_AGE_SECONDS } from '@/lib/session';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 });
    }

    const ok = await verifyCredentials(String(email), String(password));
    if (!ok) {
      return NextResponse.json({ error: 'Invalid email or password.' }, { status: 401 });
    }

    const token = await createSessionToken(String(email).trim().toLowerCase());
    const res = NextResponse.json({ ok: true });
    res.cookies.set(COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: MAX_AGE_SECONDS,
    });
    return res;
  } catch (err) {
    console.error('admin login failed', err);
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}
