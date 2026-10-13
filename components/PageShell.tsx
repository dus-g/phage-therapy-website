'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import { useL } from '@/lib/i18n';

export function PageHero({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <section className="bg-accentDeep px-4 py-14 text-center text-white sm:px-6 sm:py-20">
      <h1 className="mx-auto max-w-3xl font-serif text-3xl font-bold sm:text-4xl">{title}</h1>
      {subtitle && <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/80">{subtitle}</p>}
    </section>
  );
}

export function Section({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <section className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6">
      {title && <h2 className="mb-3 text-center font-serif text-2xl font-bold text-ink">{title}</h2>}
      <div className="space-y-4 text-justify text-base leading-relaxed text-ink">{children}</div>
    </section>
  );
}

export function ApplyCta() {
  const L = useL();
  return (
    <section className="bg-accentSoft px-4 py-12 text-center sm:px-6">
      <h2 className="font-serif text-2xl font-bold text-accentDeep">
        {L('Interested in phage therapy?', '对噬菌体治疗感兴趣？')}
      </h2>
      <p className="mx-auto mt-2 max-w-xl text-sm text-muted">
        {L(
          'Submit a BacterioPhage Application and our team will review your case.',
          '提交噬菌体治疗申请表，我们的团队将评估您的情况。',
        )}
      </p>
      <Link
        href="/bacteriophage-application"
        className="mt-5 inline-block bg-accentDeep px-6 py-2.5 text-sm text-white transition-opacity hover:opacity-90"
      >
        {L('BacterioPhage Application', '噬菌体治疗申请表')}
      </Link>
    </section>
  );
}
