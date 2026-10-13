'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { uploadFile } from '@/lib/uploadFile';

type MediaItem = {
  key: string;
  media_type: 0 | 1;
  caption: string;
  file: File | null;
  existingUrl?: string;
};

type InitialUpdate = {
  id: string;
  title_en: string;
  title_zh: string;
  content_en: string;
  content_zh: string;
  update_date: Date;
  is_published: boolean;
  media: { id: string; media_type: number; file_url: string; caption: string }[];
};

export default function CaseStudyUpdateForm({
  caseStudyId,
  initialUpdate,
}: {
  caseStudyId: string;
  initialUpdate?: InitialUpdate;
}) {
  const router = useRouter();
  const isEdit = Boolean(initialUpdate);

  const [titleEn, setTitleEn] = useState(initialUpdate?.title_en ?? '');
  const [titleZh, setTitleZh] = useState(initialUpdate?.title_zh ?? '');
  const [contentEn, setContentEn] = useState(initialUpdate?.content_en ?? '');
  const [contentZh, setContentZh] = useState(initialUpdate?.content_zh ?? '');
  const [updateDate, setUpdateDate] = useState(
    initialUpdate?.update_date
      ? new Date(initialUpdate.update_date).toISOString().slice(0, 10)
      : new Date().toISOString().slice(0, 10),
  );
  const [isPublished, setIsPublished] = useState(initialUpdate?.is_published ?? false);
  const [media, setMedia] = useState<MediaItem[]>(
    (initialUpdate?.media ?? []).map((m) => ({
      key: m.id,
      media_type: m.media_type === 1 ? 1 : 0,
      caption: m.caption,
      file: null,
      existingUrl: m.file_url,
    })),
  );
  const [status, setStatus] = useState<'idle' | 'saving' | 'error'>('idle');
  const [error, setError] = useState('');

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
        title_en: titleEn,
        title_zh: titleZh,
        content_en: contentEn,
        content_zh: contentZh,
        update_date: updateDate,
        is_published: isPublished,
        media: uploadedMedia.filter((m) => m.file_url),
      };

      const res = await fetch(
        isEdit
          ? `/api/admin/case-studies/${caseStudyId}/updates/${initialUpdate!.id}`
          : `/api/admin/case-studies/${caseStudyId}/updates`,
        {
          method: isEdit ? 'PATCH' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        },
      );
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || 'Something went wrong.');
        setStatus('error');
        return;
      }

      router.push(`/admin/case-studies/${caseStudyId}/updates`);
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
          onChange={(e) => setTitleEn(e.target.value)}
          required
          placeholder="e.g. Month 3 Progress Report"
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
        <label className="field-label" htmlFor="update_date">Date</label>
        <input
          id="update_date"
          type="date"
          value={updateDate}
          onChange={(e) => setUpdateDate(e.target.value)}
          required
          className="field-input mt-1.5"
        />
      </div>

      <div>
        <label className="field-label" htmlFor="content_en">Content (English) — Markdown</label>
        <textarea
          id="content_en"
          value={contentEn}
          onChange={(e) => setContentEn(e.target.value)}
          rows={8}
          placeholder="Diagnostic results, progress metrics, clinical observations..."
          className="field-input mt-1.5 font-mono text-xs"
        />
      </div>
      <div>
        <label className="field-label" htmlFor="content_zh">Content (Chinese) — Markdown</label>
        <textarea
          id="content_zh"
          value={contentZh}
          onChange={(e) => setContentZh(e.target.value)}
          rows={8}
          className="field-input mt-1.5 font-mono text-xs"
        />
      </div>

      <div>
        <span className="field-label">Diagnostic photos / charts / video</span>
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
                placeholder="Caption (e.g. Glucose chart, Week 12 scan)"
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
        Published (visible in the case study's public timeline)
      </label>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={status === 'saving'}
        className="w-full border border-accentDeep bg-accentDeep py-3 text-sm text-paper transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {status === 'saving' ? 'Saving…' : isEdit ? 'Save Changes' : 'Add Update'}
      </button>
    </form>
  );
}
