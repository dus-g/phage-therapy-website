import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { renderMarkdown } from '@/lib/blog';
import BlogPostView from '@/components/blog/BlogPostView';

export const dynamic = 'force-dynamic';

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = await prisma.blogPost.findUnique({
    where: { slug },
    include: { media: { orderBy: { sort_order: 'asc' } } },
  });

  if (!post || !post.is_published) notFound();

  return (
    <BlogPostView
      title_en={post.title_en}
      title_zh={post.title_zh}
      html_en={renderMarkdown(post.content_en)}
      html_zh={renderMarkdown(post.content_zh)}
      published_at={post.published_at}
      cover_image_url={post.cover_image_url}
      media={post.media}
    />
  );
}
