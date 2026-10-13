'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useL } from '@/lib/i18n';
import LanguageToggle from '@/components/LanguageToggle';
import NavMenu from '@/components/NavMenu';


export default function Header() {
  const L = useL();
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const [navTop, setNavTop] = useState(80);

  // Measure the header's real rendered height so the drawer always starts
  // exactly where the header ends, regardless of breakpoint.
  useEffect(() => {
    function measure() {
      if (headerRef.current) setNavTop(headerRef.current.getBoundingClientRect().height);
    }
    measure();
    window.addEventListener('resize', measure);
    const ro = new ResizeObserver(measure);
    if (headerRef.current) ro.observe(headerRef.current);
    return () => {
      window.removeEventListener('resize', measure);
      ro.disconnect();
    };
  }, []);

  return (
    <header ref={headerRef} className="sticky top-0 z-40 border-b border-white/10 shadow-sm" style={{ backgroundColor: 'var(--hf-color, #000060)', color: 'var(--hf-text, #ffffff)' }}>
      <div className="flex w-full items-center justify-between gap-2 px-4 py-1.5 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-2">
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={L('Toggle menu', '切换菜单')}
            className="flex-shrink-0 text-current transition-colors hover:text-accentSoft"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
              <path d="M3 5.5h14M3 10h14M3 14.5h14" />
            </svg>
          </button>
          <Link href="/" className="flex min-w-0 items-center gap-1">
            <img src="/logo.png" alt="Huoma Biotech" className="h-20 w-20 flex-shrink-0 object-contain" />
            <span className="flex min-w-0 flex-col justify-center leading-tight">
              <span className="truncate font-serif text-base text-current sm:text-lg">Huoma Biomedical</span>
              <span className="hidden truncate text-xs text-current opacity-70 sm:block">
                {L(
                  "Bacteriophage therapy for antibiotic-resistant infections.",
                  '针对耐药细菌感染的噬菌体治疗。',
                )}
              </span>
            </span>
          </Link>
        </div>

        <div className="flex flex-shrink-0 items-center gap-3 sm:gap-4">
          <nav className="hidden items-center gap-4 text-xs text-current opacity-90 md:flex">
            <Link href="/contact" className="transition-opacity hover:opacity-70">{L('Contact', '联系我们')}</Link>
            <Link href="/eptc" className="transition-opacity hover:opacity-70">EPTC</Link>
            <Link href="/bacteriophage-application" className="transition-opacity hover:opacity-70">{L('Apply', '申请')}</Link>
          </nav>
          <LanguageToggle />
        </div>
      </div>

      <NavMenu open={menuOpen} onClose={() => setMenuOpen(false)} topOffset={navTop} />
    </header>
  );
}
