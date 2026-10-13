'use client';

import { useLanguage } from '@/lib/i18n';

function pick(lang: 'en' | 'zh', en: string, zh?: string) {
  return lang === 'zh' && zh ? zh : en;
}

export function Section({
  title,
  zh,
  children,
}: {
  title: string;
  zh?: string;
  children: React.ReactNode;
}) {
  const { lang } = useLanguage();
  return (
    <section className="border-t border-line pt-8 first:border-t-0 first:pt-0">
      <h2 className="mb-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent">
        <span className="cross-mark" aria-hidden="true" />
        {pick(lang, title, zh)}
      </h2>
      <div className="flex flex-col gap-5">{children}</div>
    </section>
  );
}

export function Row({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">{children}</div>;
}

export function Field({
  label,
  zh,
  htmlFor,
  required,
  hint,
  hintZh,
  children,
}: {
  label: string;
  zh?: string;
  htmlFor: string;
  required?: boolean;
  hint?: string;
  hintZh?: string;
  children: React.ReactNode;
}) {
  const { lang } = useLanguage();
  return (
    <div>
      <label className="field-label" htmlFor={htmlFor}>
        {pick(lang, label, zh)}
        {required && <span className="text-accent"> *</span>}
      </label>
      <div className="mt-1.5">{children}</div>
      {hint && <p className="mt-1 text-xs text-muted">{pick(lang, hint, hintZh)}</p>}
    </div>
  );
}

export function CheckboxField({
  id,
  label,
  zh,
  checked,
  onChange,
}: {
  id: string;
  label: string;
  zh?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  const { lang } = useLanguage();
  return (
    <label htmlFor={id} className="flex items-start gap-2 text-sm text-ink">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 h-4 w-4 flex-shrink-0 rounded-sm border-line accent-accent"
      />
      <span>{pick(lang, label, zh)}</span>
    </label>
  );
}
