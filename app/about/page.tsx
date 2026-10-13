'use client';

import { useL } from '@/lib/i18n';
import { ApplyCta, PageHero, Section } from '@/components/PageShell';

export default function AboutPage() {
  const L = useL();
  return (
    <>
      <PageHero title={L('About Us', '关于我们')} subtitle="Huoma Biomedical (Shanghai) Co., Ltd." />
      <Section title={L('Who We Are', '我们是谁')}>
        <p>
          {L(
            'We are a biomedical team focused on making bacteriophage (phage) therapy accessible to patients with difficult bacterial infections.',
            '我们是一支专注于让难治性细菌感染患者获得噬菌体治疗的生物医学团队。',
          )}
        </p>
        <p className="text-sm text-muted">{L('More information is coming soon.', '更多内容即将上线。')}</p>
      </Section>
      <Section title={L('Our Mission', '我们的使命')}>
        <p>
          {L(
            'To connect patients, clinicians and phage specialists so that effective, personalised treatment options can be explored when antibiotics are no longer enough.',
            '连接患者、临床医生与噬菌体专家，在抗生素不再有效时探索个性化的有效治疗方案。',
          )}
        </p>
      </Section>
      <ApplyCta />
    </>
  );
}
