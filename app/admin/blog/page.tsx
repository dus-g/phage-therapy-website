import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import BlogRowActions from '@/components/admin/BlogRowActions';

export const dynamic = 'force-dynamic';

export default async function AdminBlogList() {
  const posts = await prisma.blogPost.findMany({
    orderBy: { date_created: 'desc' },
    select: { id: true, title_en: true, is_published: true, date_created: true },
  });

  return (
    <div className="flex flex-1 justify-center px-6 py-14">
      <div className="w-full max-w-3xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="font-serif text-xl text-ink">Blog Posts</h1>
          <div className="flex items-center gap-4">
            <Link href="/admin/dashboard" className="text-xs text-muted hover:text-ink">
              ← Dashboard
            </Link>
            <Link
              href="/admin/blog/new"
              className="border border-accentDeep bg-accentDeep px-3 py-1.5 text-xs text-paper hover:opacity-90"
            >
              + New Post
            </Link>
          </div>
        </div>

        <div className="overflow-x-auto border border-line">
          <table className="w-full text-sm">
            <thead className="bg-accentSoft text-left text-xs uppercase tracking-wide text-muted">
              <tr>
                <th className="px-3 py-2">Title</th>
                <th className="px-3 py-2">Created</th>
                <th className="px-3 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((p: any) => (
                <tr key={p.id} className="border-t border-line hover:bg-accentSoft/50">
                  <td className="px-3 py-2">
                    <Link href={`/admin/blog/${p.id}/edit`} className="text-accent hover:underline">
                      {p.title_en}
                    </Link>
                  </td>
                  <td className="px-3 py-2 text-muted">{p.date_created.toLocaleDateString()}</td>
                  <td className="px-3 py-2">
                    <BlogRowActions id={p.id} isPublished={p.is_published} />
                  </td>
                </tr>
              ))}
              {posts.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-3 py-6 text-center text-muted">
                    No posts yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
