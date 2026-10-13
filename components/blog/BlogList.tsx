'use client';

import Link from 'next/link';
import { useL } from '@/lib/i18n';

type Post = {
  id: string;
  slug: string;
  title_en: string;
  title_zh: string;
  excerpt_en: string;
  excerpt_zh: string;
  cover_image_url: string;
  published_at: Date | null;
};

export default function BlogList({ posts, basePath = '/blog' }: { posts: Post[]; basePath?: string }) {
  const L = useL();

  if (posts.length === 0) {
    return (
      <p className="text-center text-sm text-muted">
        {L('No posts yet — check back soon.', '暂无文章，敬请期待。')}
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
      {posts.map((post) => (
        <Link
          key={post.id}
          href={`${basePath}/${post.slug}`}
          className="group flex flex-col overflow-hidden border border-line bg-card transition-colors hover:border-accent"
        >
          {post.cover_image_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={post.cover_image_url}
              alt={L(post.title_en, post.title_zh)}
              className="h-40 w-full object-cover"
            />
          ) : (
            <div className="flex h-40 w-full items-center justify-center bg-accentSoft text-3xl">📝</div>
          )}
          <div className="flex flex-1 flex-col gap-2 p-4">
            <span className="text-xs text-muted">
              {post.published_at
                ? new Date(post.published_at).toLocaleDateString()
                : ''}
            </span>
            <h2 className="font-serif text-lg text-ink group-hover:text-accent">
              {L(post.title_en, post.title_zh)}
            </h2>
            <p className="line-clamp-3 text-sm text-muted">
              {L(post.excerpt_en, post.excerpt_zh)}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
