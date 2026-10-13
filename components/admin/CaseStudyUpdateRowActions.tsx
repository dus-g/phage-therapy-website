'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CaseStudyUpdateRowActions({
  caseStudyId,
  updateId,
  isPublished,
}: {
  caseStudyId: string;
  updateId: string;
  isPublished: boolean;
}) {
  const router = useRouter();
  const [published, setPublished] = useState(isPublished);
  const [busy, setBusy] = useState(false);

  async function togglePublish() {
    setBusy(true);
    try {
      const res = await fetch(
        `/api/admin/case-studies/${caseStudyId}/updates/${updateId}/publish`,
        { method: 'POST' },
      );
      if (res.ok) {
        const data = await res.json();
        setPublished(data.is_published);
        router.refresh();
      }
    } finally {
      setBusy(false);
    }
  }

  async function remove() {
    if (!confirm('Delete this update? This cannot be undone.')) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/case-studies/${caseStudyId}/updates/${updateId}`, {
        method: 'DELETE',
      });
      if (res.ok) router.refresh();
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        disabled={busy}
        onClick={togglePublish}
        className={`border px-2 py-1 text-xs transition-colors disabled:opacity-50 ${
          published
            ? 'border-green-600 text-green-700'
            : 'border-line text-muted hover:border-accent hover:text-accent'
        }`}
      >
        {published ? 'Published' : 'Draft'}
      </button>
      <button
        type="button"
        disabled={busy}
        onClick={remove}
        className="text-xs text-red-600 hover:underline disabled:opacity-50"
      >
        Delete
      </button>
    </div>
  );
}
