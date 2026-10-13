'use client';

import { useLanguage } from '@/lib/i18n';

export default function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="flex items-center border border-white/20 text-xs" role="group" aria-label="Language / 语言">
      <button
        type="button"
        onClick={() => setLang('en')}
        aria-pressed={lang === 'en'}
        className={`px-2.5 py-1 transition-colors ${
          lang === 'en' ? 'bg-paper text-[#010024]' : 'text-current opacity-60 hover:opacity-100'
        }`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLang('zh')}
        aria-pressed={lang === 'zh'}
        className={`px-2.5 py-1 transition-colors ${
          lang === 'zh' ? 'bg-paper text-[#010024]' : 'text-current opacity-60 hover:opacity-100'
        }`}
      >
        中文
      </button>
    </div>
  );
}
