'use client';

import { FormEvent, useState } from 'react';

export default function AdminLoginPage() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'error'>('idle');
  const [error, setError] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    setError('');

    const form = new FormData(e.currentTarget);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: form.get('email'),
          password: form.get('password'),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Invalid email or password.');
        setStatus('error');
        return;
      }
      window.location.href = '/admin/dashboard';
    } catch {
      setError('Something went wrong. Please try again.');
      setStatus('error');
    }
  }

  return (
    <div className="flex flex-1 items-center justify-center px-6 py-20">
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center gap-2 text-center">
          <img src="/logo.png" alt="Huoma Biotech" className="h-12 w-12" />
          <h1 className="font-serif text-xl text-ink">Admin Sign In</h1>
          <p className="text-xs text-muted">Huoma Biotech internal use only</p>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <label className="field-label" htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="username"
              className="field-input mt-1.5"
            />
          </div>
          <div>
            <label className="field-label" htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="field-input mt-1.5"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="mt-2 w-full border border-accentDeep bg-accentDeep py-2.5 text-sm text-paper transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {status === 'submitting' ? 'Signing in…' : 'Sign In'}
          </button>
        </div>
      </form>
    </div>
  );
}
