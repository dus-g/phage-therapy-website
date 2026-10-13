'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useL } from '@/lib/i18n';

// Flat structure matching the standardized main menu: Home / About Us /
// Our Treatments / Our Hospitals / Subsidized Treatments / Apply for
// Treatment / Blogs / Contact Us. (Custom form builder and Case Studies
// stay live and linkable, just not in the primary nav for now.)
const LINKS = [
  { href: '/', en: 'Home', zh: '首页' },
  { href: '/about', en: 'About Us', zh: '关于我们' },
  { href: '/phage-therapy', en: 'Phage Therapy', zh: '噬菌体治疗' },
  { href: '/bacteriophage-application', en: 'BacterioPhage Application', zh: '噬菌体治疗申请表' },
  { href: '/eptc', en: 'EPTC — Our Partner', zh: 'EPTC 合作伙伴' },
  { href: '/case-studies', en: 'Case Studies', zh: '案例研究' },
  { href: '/blog', en: 'Blogs', zh: '博客' },
  { href: '/community-guidelines', en: 'Community Guidelines', zh: '社区准则' },
  { href: '/contact', en: 'Contact Us', zh: '联系我们' },
];

export default function NavMenu({
  open,
  onClose,
  topOffset = 80,
}: {
  open: boolean;
  onClose: () => void;
  /** Pixels from the top of the viewport where the header actually ends. */
  topOffset?: number;
}) {
  const L = useL();

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) return null;

  return (
    // Explicit inline styles (not just Tailwind classes) for the top offset
    // and height, driven by the header's actual measured height, so this
    // never renders as a tiny sliver or overlaps the header on breakpoints
    // where the header is taller (e.g. desktop's contact strip row).
    <div className="fixed z-30" style={{ top: `${topOffset}px`, left: 0, right: 0, bottom: 0 }}>
      <button
        aria-label={L('Close menu', '关闭菜单')}
        onClick={onClose}
        className="bg-ink/40"
        style={{ position: 'absolute', inset: 0 }}
      />
      <nav
        className="flex flex-col overflow-y-auto bg-white p-6 shadow-xl"
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          width: 'min(220px, 90vw)',
        }}
      >
        <div className="flex flex-col gap-1">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="border-b border-line py-3 text-sm text-ink transition-colors hover:text-accent"
            >
              {L(link.en, link.zh)}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
