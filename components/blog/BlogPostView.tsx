'use client';

import Link from 'next/link';
import { useL } from '@/lib/i18n';

type Media = {
  id: string;
  media_type: number; // 0=image, 1=video
  file_url: string;
  caption: string;
};

export default function BlogPostView({
  title_en,
  title_zh,
  html_en,
  html_zh,
  published_at,
  cover_image_url,
  media,
  backHref = '/blog',
  backLabelEn = 'Back to blog',
  backLabelZh = '返回博客',
}: {
  title_en: string;
  title_zh: string;
  html_en: string;
  html_zh: string;
  published_at: Date | null;
  cover_image_url: string;
  media: Media[];
  backHref?: string;
  backLabelEn?: string;
  backLabelZh?: string;
}) {
  const L = useL();

  return (
    <div className="flex flex-1 justify-center px-6 py-14">
      <article className="w-full max-w-2xl">
        <Link href={backHref} className="mb-6 inline-block text-xs text-muted hover:text-ink">
          ← {L(backLabelEn, backLabelZh)}
        </Link>

        <h1 className="font-serif text-2xl text-ink">{L(title_en, title_zh)}</h1>
        {published_at && (
          <p className="mt-1 text-xs text-muted">
            {new Date(published_at).toLocaleDateString()}
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

        <div
          className="prose prose-sm mt-8 max-w-none text-ink prose-headings:font-serif prose-a:text-accent"
          dangerouslySetInnerHTML={{ __html: L(html_en, html_zh) }}
        />

        {media.length > 0 && (
          <div className="mt-10 border-t border-line pt-8">
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-accent">
              {L('Gallery', '图库')}
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {media.map((m) => (
                <div key={m.id} className="border border-line">
                  {m.media_type === 1 ? (
                    <video src={m.file_url} controls className="h-32 w-full object-cover" />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={m.file_url} alt={m.caption} className="h-32 w-full object-cover" />
                  )}
                  {m.caption && (
                    <p className="px-2 py-1 text-center text-xs text-muted">{m.caption}</p>
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
