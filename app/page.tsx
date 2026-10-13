'use client';

import Link from 'next/link';
import { useL } from '@/lib/i18n';
import { ApplyCta, PageHero, Section } from '@/components/PageShell';

export default function HomePage() {
  const L = useL();
  const cards = [
    {
      href: '/phage-therapy',
      t: L('What is Phage Therapy?', '什么是噬菌体治疗？'),
      d: L('Using viruses that infect bacteria to treat bacterial infections.', '利用感染细菌的病毒治疗细菌感染。'),
    },
    {
      href: '/eptc',
      t: L('EPTC — Our Partner', 'EPTC 合作伙伴'),
      d: L('Learn about our partner in phage therapy.', '了解我们在噬菌体治疗方面的合作伙伴。'),
    },
    {
      href: '/blog',
      t: L('Blog', '博客'),
      d: L('News, updates and articles.', '新闻、动态与文章。'),
    },
  ];
  return (
    <>
      <PageHero
        title={L('Phage Therapy', '噬菌体治疗')}
        subtitle={L(
          'A promising approach against antibiotic-resistant bacterial infections.',
          '应对抗生素耐药细菌感染的有前景的方法。',
        )}
      />
      <Section>
        <p>
          {L(
            'Bacteriophages ("phages") are viruses that infect and kill specific bacteria. As antibiotics lose their effect against resistant bacteria, phage therapy is being revisited around the world as a targeted option for hard-to-treat infections.',
            '噬菌体是能够感染并杀死特定细菌的病毒。随着抗生素对耐药菌逐渐失效，噬菌体治疗作为针对难治性感染的靶向方案，正在全球范围内被重新重视。',
          )}
        </p>
        <p className="text-sm text-muted">
          {L('More information is coming soon.', '更多内容即将上线。')}
        </p>
      </Section>
      <section className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-4 px-4 pb-10 sm:grid-cols-3 sm:px-6">
        {cards.map((c) => (
          <Link key={c.href} href={c.href} className="border border-line bg-card p-5 text-center transition-colors hover:border-accent hover:bg-accentSoft">
            <h3 className="font-serif text-lg font-bold text-ink">{c.t}</h3>
            <p className="mt-2 text-sm text-muted">{c.d}</p>
          </Link>
        ))}
      </section>
      <ApplyCta />
    </>
  );
}
