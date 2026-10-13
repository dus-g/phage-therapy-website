import { notFound } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import BlogForm from '@/components/admin/BlogForm';

export const dynamic = 'force-dynamic';

export default async function EditBlogPost({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await prisma.blogPost.findUnique({
    where: { id },
    include: { media: { orderBy: { sort_order: 'asc' } } },
  });
  if (!post) notFound();

  return (
    <div className="flex flex-1 justify-center px-6 py-14">
      <div className="w-full max-w-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="font-serif text-xl text-ink">Edit Post</h1>
          <Link href="/admin/blog" className="text-xs text-muted hover:text-ink">
            ← Back
          </Link>
        </div>
        <BlogForm initialPost={post} />
      </div>
    </div>
  );
}
