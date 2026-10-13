'use client';

import Link from 'next/link';
import { useLanguage } from '@/lib/i18n';
import { statusLabel } from '@/lib/caseStudies';

type Media = {
  id: string;
  media_type: number;
  file_url: string;
  caption: string;
};

type UpdateItem = {
  id: string;
  title_en: string;
  title_zh: string;
  html_en: string;
  html_zh: string;
  update_date: Date;
  media: Media[];
};

export default function CaseStudyView({
  title_en,
  title_zh,
  condition_en,
  condition_zh,
  summary_en,
  summary_zh,
  cover_image_url,
  status,
  started_at,
  updates,
}: {
  title_en: string;
  title_zh: string;
  condition_en: string;
  condition_zh: string;
  summary_en: string;
  summary_zh: string;
  cover_image_url: string;
  status: number;
  started_at: Date | null;
  updates: UpdateItem[];
}) {
  const { lang } = useLanguage();
  const L = (en: string, zh: string) => (lang === 'zh' ? zh : en);

  return (
    <div className="flex flex-1 justify-center px-6 py-14">
      <article className="w-full max-w-2xl">
        <Link href="/case-studies" className="mb-6 inline-block text-xs text-muted hover:text-ink">
          ← {L('Back to case studies', '返回案例研究')}
        </Link>

        <div className="flex items-center justify-between">
          <span className="text-xs uppercase tracking-wide text-accent">{L(condition_en, condition_zh)}</span>
          <span className="border border-line px-2 py-0.5 text-xs text-muted">
            {statusLabel(status, lang)}
          </span>
        </div>

        <h1 className="mt-2 font-serif text-2xl text-ink">{L(title_en, title_zh)}</h1>
        {started_at && (
          <p className="mt-1 text-xs text-muted">
            {L('Started', '开始日期')} {new Date(started_at).toLocaleDateString()}
          </p>
        )}

        {cover_image_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={cover_image_url}
            alt={L(title_en, title_zh)}
            className="mt-6 w-full border border-line object-cover"
          />
        )}

        {(summary_en || summary_zh) && (
          <p className="mt-6 text-sm leading-relaxed text-muted">{L(summary_en, summary_zh)}</p>
        )}

        {updates.length > 0 && (
          <div className="mt-10 border-t border-line pt-8">
            <h2 className="mb-6 text-xs font-semibold uppercase tracking-widest text-accent">
              {L('Progress Timeline', '进展时间线')}
            </h2>
            <div className="flex flex-col gap-10">
              {updates.map((u) => (
                <div key={u.id} className="border-l-2 border-accentSoft pl-5">
                  <p className="text-xs text-muted">
                    {new Date(u.update_date).toLocaleDateString(undefined, {
                      year: 'numeric', month: 'long', day: 'numeric',
                    })}
                  </p>
                  <h3 className="mt-1 font-serif text-lg text-ink">{L(u.title_en, u.title_zh)}</h3>
                  <div
                    className="prose prose-sm mt-3 max-w-none text-ink prose-headings:font-serif prose-a:text-accent"
                    dangerouslySetInnerHTML={{ __html: L(u.html_en, u.html_zh) }}
                  />
                  {u.media.length > 0 && (
                    <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                      {u.media.map((m) => (
                        <div key={m.id} className="border border-line">
                          {m.media_type === 1 ? (
                            <video src={m.file_url} controls className="h-28 w-full object-cover" />
                          ) : (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={m.file_url} alt={m.caption} className="h-28 w-full object-cover" />
                          )}
                          {m.caption && (
                            <p className="px-2 py-1 text-center text-xs text-muted">{m.caption}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
