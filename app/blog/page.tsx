import { prisma } from '@/lib/prisma';
import BlogCommunityContent from '@/components/blog/BlogCommunityContent';

export const dynamic = 'force-dynamic';

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    where: { is_published: true },
    orderBy: { published_at: 'desc' },
    select: {
      id: true, slug: true, title_en: true, title_zh: true,
      excerpt_en: true, excerpt_zh: true, cover_image_url: true, published_at: true,
    },
  });

  return <BlogCommunityContent posts={posts} />;
}
