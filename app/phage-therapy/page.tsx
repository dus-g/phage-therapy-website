'use client';

import { useL } from '@/lib/i18n';
import { ApplyCta, PageHero, Section } from '@/components/PageShell';

export default function PhageTherapyPage() {
  const L = useL();
  return (
    <>
      <PageHero
        title={L('What is Phage Therapy?', '什么是噬菌体治疗？')}
        subtitle={L('The basics, in plain language.', '通俗易懂的基础知识。')}
      />
      <Section title={L('Bacteriophages', '噬菌体')}>
        <p>
          {L(
            'Bacteriophages are viruses that only infect bacteria. Each phage targets particular bacterial strains, attaches to them, multiplies inside and breaks the bacterial cell open. They do not infect human cells.',
            '噬菌体是仅感染细菌的病毒。每种噬菌体针对特定菌株，附着于细菌、在其内部复制并使细菌裂解，而不会感染人体细胞。',
          )}
        </p>
      </Section>
      <Section title={L('Antibiotic Resistance', '抗生素耐药')}>
        <p>
          {L(
            'Overuse of antibiotics has produced bacteria that no longer respond to standard drugs. Phages work differently from antibiotics, so they can still act against many resistant bacteria.',
            '抗生素的过度使用催生了对常规药物不再敏感的细菌。噬菌体的作用方式不同于抗生素，因此对许多耐药菌仍可能有效。',
          )}
        </p>
      </Section>
      <Section title={L('How It Works for a Patient', '患者流程')}>
        <p>
          {L(
            'The infecting bacteria are identified, matched with suitable phages, and the phage preparation is given under medical supervision. Each case is reviewed individually.',
            '先鉴定感染细菌，匹配合适的噬菌体，并在医疗监督下给予噬菌体制剂。每个病例都会被单独评估。',
          )}
        </p>
        <p className="text-sm text-muted">{L('Detailed content is coming soon.', '详细内容即将上线。')}</p>
      </Section>
      <ApplyCta />
    </>
  );
}
