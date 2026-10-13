'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { uploadFile } from '@/lib/uploadFile';
import { slugify } from '@/lib/blog';
import { CASE_STUDY_STATUSES } from '@/lib/caseStudies';

type InitialStudy = {
  id: string;
  slug: string;
  title_en: string;
  title_zh: string;
  condition_en: string;
  condition_zh: string;
  summary_en: string;
  summary_zh: string;
  cover_image_url: string;
  status: number;
  started_at: Date | null;
  is_published: boolean;
};

export default function CaseStudyForm({ initialStudy }: { initialStudy?: InitialStudy }) {
  const router = useRouter();
  const isEdit = Boolean(initialStudy);

  const [titleEn, setTitleEn] = useState(initialStudy?.title_en ?? '');
  const [titleZh, setTitleZh] = useState(initialStudy?.title_zh ?? '');
  const [slug, setSlug] = useState(initialStudy?.slug ?? '');
  const [slugTouched, setSlugTouched] = useState(isEdit);
  const [conditionEn, setConditionEn] = useState(initialStudy?.condition_en ?? '');
  const [conditionZh, setConditionZh] = useState(initialStudy?.condition_zh ?? '');
  const [summaryEn, setSummaryEn] = useState(initialStudy?.summary_en ?? '');
  const [summaryZh, setSummaryZh] = useState(initialStudy?.summary_zh ?? '');
  const [status, setStatus_] = useState(initialStudy?.status ?? 0);
  const [startedAt, setStartedAt] = useState(
    initialStudy?.started_at ? new Date(initialStudy.started_at).toISOString().slice(0, 10) : '',
  );
  const [isPublished, setIsPublished] = useState(initialStudy?.is_published ?? false);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverExistingUrl] = useState(initialStudy?.cover_image_url ?? '');

  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'error'>('idle');
  const [error, setError] = useState('');

  function handleTitleChange(value: string) {
    setTitleEn(value);
    if (!slugTouched) setSlug(slugify(value));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaveStatus('saving');
    setError('');

    try {
      let coverUrl = coverExistingUrl;
      if (coverFile) {
        const { url } = await uploadFile(coverFile);
        coverUrl = url;
      }

      const payload = {
        title_en: titleEn,
        title_zh: titleZh,
        slug,
        condition_en: conditionEn,
        condition_zh: conditionZh,
        summary_en: summaryEn,
        summary_zh: summaryZh,
        cover_image_url: coverUrl,
        status,
        started_at: startedAt || null,
        is_published: isPublished,
      };

      const res = await fetch(
        isEdit ? `/api/admin/case-studies/${initialStudy!.id}` : '/api/admin/case-studies',
        {
          method: isEdit ? 'PATCH' : 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        },
      );
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || 'Something went wrong.');
        setSaveStatus('error');
        return;
      }

      if (isEdit) {
        router.push('/admin/case-studies');
      } else {
        // Jump straight into adding the first progress update.
        router.push(`/admin/case-studies/${data.id}/updates`);
      }
      router.refresh();
    } catch {
      setError('Something went wrong.');
      setSaveStatus('error');
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
        <p className="mt-1 text-xs text-muted">/case-studies/{slug || '...'}</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="field-label" htmlFor="condition_en">Condition (English)</label>
          <input
            id="condition_en"
            value={conditionEn}
            onChange={(e) => setConditionEn(e.target.value)}
            placeholder="e.g. Type 2 Diabetes"
            className="field-input mt-1.5"
          />
        </div>
        <div>
          <label className="field-label" htmlFor="condition_zh">Condition (Chinese)</label>
          <input
            id="condition_zh"
            value={conditionZh}
            onChange={(e) => setConditionZh(e.target.value)}
            className="field-input mt-1.5"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="field-label" htmlFor="status">Status</label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus_(Number(e.target.value))}
            className="field-input mt-1.5"
          >
            {CASE_STUDY_STATUSES.map((s) => (
              <option key={s.value} value={s.value}>{s.en}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="field-label" htmlFor="started_at">Start Date</label>
          <input
            id="started_at"
            type="date"
            value={startedAt}
            onChange={(e) => setStartedAt(e.target.value)}
            className="field-input mt-1.5"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="field-label" htmlFor="summary_en">Summary (English)</label>
          <textarea
            id="summary_en"
            value={summaryEn}
            onChange={(e) => setSummaryEn(e.target.value)}
            rows={3}
            className="field-input mt-1.5 resize-none"
          />
        </div>
        <div>
          <label className="field-label" htmlFor="summary_zh">Summary (Chinese)</label>
          <textarea
            id="summary_zh"
            value={summaryZh}
            onChange={(e) => setSummaryZh(e.target.value)}
            rows={3}
            className="field-input mt-1.5 resize-none"
          />
        </div>
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

      <label className="flex items-center gap-2 text-sm text-ink">
        <input
          type="checkbox"
          checked={isPublished}
          onChange={(e) => setIsPublished(e.target.checked)}
          className="h-4 w-4 border-line accent-accent"
        />
        Published (visible on the public site)
      </label>
      <p className="-mt-4 text-xs text-muted">
        Individual progress updates also have their own publish toggle — this only controls
        whether the case study itself (and any of its published updates) is visible at all.
      </p>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={saveStatus === 'saving'}
        className="w-full border border-accentDeep bg-accentDeep py-3 text-sm text-paper transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {saveStatus === 'saving' ? 'Saving…' : isEdit ? 'Save Changes' : 'Create & Add First Update →'}
      </button>
    </form>
  );
}
