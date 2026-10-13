'use client';

import Link from 'next/link';
import { useL } from '@/lib/i18n';
import SiteImage from '@/components/SiteImage';

export default function EPTCPage() {
  const L = useL();

  return (
    <div className="flex flex-1 flex-col font-serif">
      {/* Hero */}
      <div className="relative h-[360px] w-full bg-accentDeep sm:h-[480px]">
        <div className="absolute inset-0 overflow-hidden">
          <SiteImage
            folder="eptc"
            file="EPTC-02.jpg"
            alt=""
            label={L('Background: Eliava Phage Therapy Center', '背景：Eliava 噬菌体治疗中心')}
            className="h-full w-full"
            priority
          />
        </div>
      </div>

      <div className="mx-auto w-full max-w-4xl px-6 py-16">
        <h1 className="text-3xl font-bold text-ink">
          {L('Our Partner: The Eliava Phage Therapy Center (EPTC)', '我们的合作伙伴：Eliava 噬菌体治疗中心（EPTC）')}
        </h1>

        <p className="mt-6 text-justify text-base leading-relaxed text-ink">
          {L(
            'The Eliava Phage Therapy Center (EPTC) is based in Tbilisi, Georgia, and grew out of the Eliava Institute — one of the world\u2019s oldest and most established centers for bacteriophage research, with a history in this field stretching back nearly a century. EPTC treats bacterial infections using bacteriophages: viruses that occur naturally, each one adapted to target and destroy specific strains of bacteria.',
            'Eliava 噬菌体治疗中心（EPTC）位于格鲁吉亚第比利斯，脱胎于 Eliava 研究所——世界上历史最悠久、最具权威性的噬菌体研究中心之一，在该领域的研究历史已近百年。EPTC 使用噬菌体治疗细菌感染：这是一种天然存在的病毒，每一种都专门针对并消灭特定的细菌菌株。',
          )}
        </p>

        <p className="mt-4 text-justify text-base leading-relaxed text-ink">
          {L(
            'Bacteriophage therapy is especially valuable for infections that conventional antibiotics can no longer treat — either because no suitable antibiotic exists for that particular bacteria, or because the bacteria has developed antibiotic resistance and the drugs that once worked no longer do. Where antibiotics fail, a bacteriophage can often still succeed, precisely because it targets the bacteria itself rather than relying on a chemical the bacteria may have already adapted to resist.',
            '噬菌体疗法对于传统抗生素已无法治疗的感染尤为重要——无论是因为没有针对该特定细菌的合适抗生素，还是因为细菌已产生耐药性，使原本有效的药物失效。在抗生素失效之处，噬菌体往往仍能发挥作用，因为它直接针对细菌本身，而非依赖细菌可能已经适应并产生耐药性的化学药物。',
          )}
        </p>

        <p className="mt-4 text-justify text-base leading-relaxed text-ink">
          {L(
            'We work with EPTC as a partner center for patients whose infections may benefit from bacteriophage-based treatment. If you believe this may apply to your case, our BacterioPhage Application Form is the first step — it gives our team the background needed to review your case before any contact is made with EPTC directly.',
            '对于可能受益于噬菌体治疗的感染患者，我们与 EPTC 建立了合作关系。如果您认为这可能适用于您的情况，请首先填写我们的噬菌体治疗申请表——这能让我们的团队在与 EPTC 直接联系之前，充分了解您的病情背景。',
          )}
        </p>

        <div className="mt-10 text-center">
          <Link
            href="/bacteriophage-application"
            className="inline-block rounded-full bg-accent px-10 py-4 text-lg font-bold text-paper transition-opacity hover:opacity-90"
          >
            {L('BacterioPhage Application Form', '噬菌体治疗申请表')}
          </Link>
        </div>
      </div>
    </div>
  );
}
