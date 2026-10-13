'use client';

import Link from 'next/link';
import { useL } from '@/lib/i18n';

export default function Footer() {
  const L = useL();
  const year = new Date().getFullYear();

  return (
    <footer style={{ backgroundColor: 'var(--hf-color, #000060)', color: 'var(--hf-text, #ffffff)' }}>
      <div className="py-10">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 sm:px-6 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
          <div>
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="Huoma Biotech" className="h-20 w-20 flex-shrink-0 object-contain" />
              <Link href="/" className="font-serif text-xl leading-snug text-current opacity-100 transition-opacity hover:opacity-80">
                Huoma Biomedical (Shanghai) Co., Ltd.
              </Link>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-current">{L('Apply', '申请')}</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/bacteriophage-application" className="text-sm text-current opacity-80 transition-opacity hover:opacity-100">
                  {L('BacterioPhage Application', '噬菌体治疗申请表')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-current">{L('Company', '公司')}</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-current opacity-80 transition-opacity hover:opacity-100">
                  {L('About Us', '关于我们')}
                </Link>
              </li>
              <li>
                <Link href="/phage-therapy" className="text-sm text-current opacity-80 transition-opacity hover:opacity-100">
                  {L('Phage Therapy', '噬菌体治疗')}
                </Link>
              </li>
              <li>
                <Link href="/eptc" className="text-sm text-current opacity-80 transition-opacity hover:opacity-100">
                  {L('EPTC — Our Partner', 'EPTC 合作伙伴')}
                </Link>
              </li>
              <li>
                <Link href="/case-studies" className="text-sm text-current opacity-80 transition-opacity hover:opacity-100">
                  {L('Case Studies', '案例研究')}
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm text-current opacity-80 transition-opacity hover:opacity-100">
                  {L('Blogs', '博客')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-current">{L('Contact', '联系方式')}</h4>
            <ul className="space-y-2 text-sm text-current opacity-80">
              <li>+86 000 0000 0000</li>
              <li>info@huomabiotech.com</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-paper/15">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-4 text-xs text-current opacity-70 sm:flex-row sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4 sm:justify-start">
            <Link href="/contact" className="transition-colors hover:opacity-100">
              {L('Contact', '联系我们')}
            </Link>
            <Link href="/privacy" className="transition-colors hover:opacity-100">
              {L('Privacy Policy', '隐私政策')}
            </Link>
            <Link href="/terms" className="transition-colors hover:opacity-100">
              {L('Terms of Service', '服务条款')}
            </Link>
            <Link href="/community-guidelines" className="transition-colors hover:opacity-100">
              {L('Community Guidelines', '社区准则')}
            </Link>
          </div>
          <div className="text-center sm:text-right">
            Huoma Biotech &copy; {year} - {L('All Rights Reserved', '版权所有')}
          </div>
        </div>
      </div>
    </footer>
  );
}
