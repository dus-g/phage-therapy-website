'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';

export type Lang = 'en' | 'zh';

type LanguageContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
};

const LanguageContext = createContext<LanguageContextValue>({
  lang: 'en',
  setLang: () => {},
});

const STORAGE_KEY = 'huoma-lang';

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en');

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === 'en' || saved === 'zh') {
      setLangState(saved);
      return;
    }
    if (navigator.language?.toLowerCase().startsWith('zh')) {
      setLangState('zh');
    }
  }, []);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }, []);

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

/** Shorthand: pick the right string for the current language. */
export function useL() {
  const { lang } = useLanguage();
  return useCallback((en: string, zh: string) => (lang === 'zh' ? zh : en), [lang]);
}
