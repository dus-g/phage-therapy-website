'use client';

import Link from 'next/link';
import { useLanguage } from '@/lib/i18n';
import { statusLabel } from '@/lib/caseStudies';

type CaseStudySummary = {
  id: string;
  slug: string;
  title_en: string;
  title_zh: string;
  condition_en: string;
  condition_zh: string;
  summary_en: string;
  summary_zh: string;
  cover_image_url: string;
  status: number;
};

export default function CaseStudyList({ studies }: { studies: CaseStudySummary[] }) {
  const { lang } = useLanguage();
  const L = (en: string, zh: string) => (lang === 'zh' ? zh : en);

  if (studies.length === 0) {
    return (
      <p className="text-center text-sm text-muted">
        {L('No case studies published yet — check back soon.', '暂无已发布的案例研究，敬请期待。')}
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      {studies.map((s) => (
        <Link
          key={s.id}
          href={`/case-studies/${s.slug}`}
          className="group flex flex-col overflow-hidden border border-line bg-card transition-colors hover:border-accent"
        >
          {s.cover_image_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={s.cover_image_url}
              alt={L(s.title_en, s.title_zh)}
              className="h-40 w-full object-cover"
            />
          ) : (
            <div className="flex h-40 w-full items-center justify-center bg-accentSoft text-3xl">📊</div>
          )}
          <div className="flex flex-1 flex-col gap-2 p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-accent">{L(s.condition_en, s.condition_zh)}</span>
              <span className="border border-line px-2 py-0.5 text-xs text-muted">
                {statusLabel(s.status, lang)}
              </span>
            </div>
            <h2 className="font-serif text-lg text-ink group-hover:text-accent">
              {L(s.title_en, s.title_zh)}
            </h2>
            <p className="line-clamp-3 text-sm text-muted">{L(s.summary_en, s.summary_zh)}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
