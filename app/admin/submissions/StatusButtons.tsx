'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const STATUSES = [
  { value: 0, label: 'New' },
  { value: 1, label: 'Reviewed' },
  { value: 2, label: 'Approved' },
  { value: 3, label: 'Rejected' },
];

export default function StatusButtons({
  endpoint,
  current,
}: {
  endpoint: string;
  current: number;
}) {
  const router = useRouter();
  const [status, setStatus] = useState(current);
  const [saving, setSaving] = useState(false);

  async function update(value: number) {
    if (value === status) return;
    setSaving(true);
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: value }),
      });
      if (res.ok) {
        setStatus(value);
        router.refresh();
      }
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
      {STATUSES.map((s) => (
        <button
          key={s.value}
          type="button"
          disabled={saving}
          onClick={() => update(s.value)}
          className={`border px-3 py-1.5 text-xs transition-colors disabled:opacity-50 ${
            status === s.value
              ? 'border-accentDeep bg-accentDeep text-paper'
              : 'border-line text-muted hover:border-accent hover:text-accent'
          }`}
        >
          {s.label}
        </button>
      ))}
    </div>
  );
}
