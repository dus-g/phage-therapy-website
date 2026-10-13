import Link from 'next/link';
import BlogForm from '@/components/admin/BlogForm';

export default function NewBlogPost() {
  return (
    <div className="flex flex-1 justify-center px-6 py-14">
      <div className="w-full max-w-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="font-serif text-xl text-ink">New Post</h1>
          <Link href="/admin/blog" className="text-xs text-muted hover:text-ink">
            ← Back
          </Link>
        </div>
        <BlogForm />
      </div>
    </div>
  );
}
