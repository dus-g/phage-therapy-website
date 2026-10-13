'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { uploadFile } from '@/lib/uploadFile';
import { slugify } from '@/lib/blog';

type MediaItem = {
  key: string;
  media_type: 0 | 1;
  caption: string;
  file: File | null;
  existingUrl?: string;
};

type InitialPost = {
  id: string;
  slug: string;
  title_en: string;
  title_zh: string;
  excerpt_en: string;
  excerpt_zh: string;
  content_en: string;
  content_zh: string;
  cover_image_url: string;
  is_published: boolean;
  media: { id: string; media_type: number; file_url: string; caption: string }[];
};

export default function BlogForm({ initialPost }: { initialPost?: InitialPost }) {
  const router = useRouter();
  const isEdit = Boolean(initialPost);

  const [slug, setSlug] = useState(initialPost?.slug ?? '');
  const [slugTouched, setSlugTouched] = useState(isEdit);
  const [titleEn, setTitleEn] = useState(initialPost?.title_en ?? '');
  const [titleZh, setTitleZh] = useState(initialPost?.title_zh ?? '');
  const [excerptEn, setExcerptEn] = useState(initialPost?.excerpt_en ?? '');
  const [excerptZh, setExcerptZh] = useState(initialPost?.excerpt_zh ?? '');
  const [contentEn, setContentEn] = useState(initialPost?.content_en ?? '');
  const [contentZh, setContentZh] = useState(initialPost?.content_zh ?? '');
  const [isPublished, setIsPublished] = useState(initialPost?.is_published ?? false);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverExistingUrl] = useState(initialPost?.cover_image_url ?? '');
  const [media, setMedia] = useState<MediaItem[]>(
    (initialPost?.media ?? []).map((m) => ({
      key: m.id,
      media_type: m.media_type === 1 ? 1 : 0,
      caption: m.caption,
      file: null,
      existingUrl: m.file_url,
    })),
  );
  const [status, setStatus] = useState<'idle' | 'saving' | 'error'>('idle');
  const [error, setError] = useState('');

  function handleTitleChange(value: string) {
    setTitleEn(value);
    if (!slugTouched) setSlug(slugify(value));
  }

  function addMediaItem() {
    setMedia((prev) => [...prev, { key: crypto.randomUUID(), media_type: 0, caption: '', file: null }]);
  }
  function updateMediaItem(key: string, patch: Partial<MediaItem>) {
    setMedia((prev) => prev.map((m) => (m.key === key ? { ...m, ...patch } : m)));
  }
  function removeMediaItem(key: string) {
    setMedia((prev) => prev.filter((m) => m.key !== key));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('saving');
    setError('');

    try {
      let coverUrl = coverExistingUrl;
      if (coverFile) {
        const { url } = await uploadFile(coverFile);
        coverUrl = url;
      }

      const uploadedMedia = await Promise.all(
        media.map(async (m) => {
          if (m.file) {
            const { url } = await uploadFile(m.file);
            return { media_type: m.media_type, file_url: url, caption: m.caption };
          }
          return { media_type: m.media_type, file_url: m.existingUrl ?? '', caption: m.caption };
        }),
      );

      const payload = {
        slug,
        title_en: titleEn,
        title_zh: titleZh,
        excerpt_en: excerptEn,
        excerpt_zh: excerptZh,
        content_en: contentEn,
        content_zh: contentZh,
        cover_image_url: coverUrl,
        is_published: isPublished,
        media: uploadedMedia.filter((m) => m.file_url),
      };

      const res = await fetch(isEdit ? `/api/admin/blog/${initialPost!.id}` : '/api/admin/blog', {
        method: isEdit ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || 'Something went wrong.');
        setStatus('error');
        return;
      }

      router.push('/admin/blog');
      router.refresh();
    } catch {
      setError('Something went wrong.');
      setStatus('error');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div>
        <label className="field-label" htmlFor="title_en">Title (English)</label>
        <input
          id="title_en"
          value={titleEn}
          onChange={(e) => handleTitleChange(e.target.value)}
          required
          className="field-input mt-1.5"
        />
      </div>
      <div>
        <label className="field-label" htmlFor="title_zh">Title (Chinese)</label>
        <input
          id="title_zh"
          value={titleZh}
          onChange={(e) => setTitleZh(e.target.value)}
          className="field-input mt-1.5"
        />
      </div>
      <div>
        <label className="field-label" htmlFor="slug">Slug (URL)</label>
        <input
          id="slug"
          value={slug}
          onChange={(e) => {
            setSlug(slugify(e.target.value));
            setSlugTouched(true);
          }}
          required
          className="field-input mt-1.5"
        />
        <p className="mt-1 text-xs text-muted">/blog/{slug || '...'}</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="field-label" htmlFor="excerpt_en">Excerpt (English)</label>
          <textarea
            id="excerpt_en"
            value={excerptEn}
            onChange={(e) => setExcerptEn(e.target.value)}
            rows={2}
            className="field-input mt-1.5 resize-none"
          />
        </div>
        <div>
          <label className="field-label" htmlFor="excerpt_zh">Excerpt (Chinese)</label>
          <textarea
            id="excerpt_zh"
            value={excerptZh}
            onChange={(e) => setExcerptZh(e.target.value)}
            rows={2}
            className="field-input mt-1.5 resize-none"
          />
        </div>
      </div>

      <div>
        <label className="field-label" htmlFor="content_en">Content (English) — Markdown</label>
        <textarea
          id="content_en"
          value={contentEn}
          onChange={(e) => setContentEn(e.target.value)}
          rows={10}
          className="field-input mt-1.5 font-mono text-xs"
        />
      </div>
      <div>
        <label className="field-label" htmlFor="content_zh">Content (Chinese) — Markdown</label>
        <textarea
          id="content_zh"
          value={contentZh}
          onChange={(e) => setContentZh(e.target.value)}
          rows={10}
          className="field-input mt-1.5 font-mono text-xs"
        />
      </div>

      <div>
        <span className="field-label">Cover image</span>
        <div className="mt-1.5 flex items-center gap-3">
          {coverExistingUrl && !coverFile && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={coverExistingUrl} alt="" className="h-16 w-16 border border-line object-cover" />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setCoverFile(e.target.files?.[0] ?? null)}
            className="text-sm"
          />
        </div>
      </div>

      <div>
        <span className="field-label">Gallery (images or before/after videos)</span>
        <div className="mt-2 flex flex-col gap-3">
          {media.map((m) => (
            <div
              key={m.key}
              className="flex flex-col gap-2 border border-line bg-card p-3 sm:flex-row sm:items-center"
            >
              <select
                value={m.media_type}
                onChange={(e) =>
                  updateMediaItem(m.key, { media_type: Number(e.target.value) as 0 | 1 })
                }
                className="field-input sm:w-32"
              >
                <option value={0}>Image</option>
                <option value={1}>Video</option>
              </select>
              {m.existingUrl && !m.file && (
                <span className="max-w-[140px] truncate text-xs text-muted">{m.existingUrl}</span>
              )}
              <input
                type="file"
                accept={m.media_type === 1 ? 'video/*' : 'image/*'}
                onChange={(e) => updateMediaItem(m.key, { file: e.target.files?.[0] ?? null })}
                className="text-sm sm:flex-1"
              />
              <input
                type="text"
                placeholder="Caption (e.g. Before, After, Week 4)"
                value={m.caption}
                onChange={(e) => updateMediaItem(m.key, { caption: e.target.value })}
                className="field-input sm:flex-1"
              />
              <button
                type="button"
                onClick={() => removeMediaItem(m.key)}
                className="text-xs text-muted hover:text-ink"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={addMediaItem}
          className="mt-2 w-fit border border-dashed border-line px-4 py-2 text-xs text-muted transition-colors hover:border-accent hover:text-accent"
        >
          + Add media
        </button>
      </div>

      <label className="flex items-center gap-2 text-sm text-ink">
        <input
          type="checkbox"
          checked={isPublished}
          onChange={(e) => setIsPublished(e.target.checked)}
          className="h-4 w-4 border-line accent-accent"
        />
        Published (visible on the public blog)
      </label>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={status === 'saving'}
        className="w-full border border-accentDeep bg-accentDeep py-3 text-sm text-paper transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {status === 'saving' ? 'Saving…' : isEdit ? 'Save Changes' : 'Create Post'}
      </button>
    </form>
  );
}
