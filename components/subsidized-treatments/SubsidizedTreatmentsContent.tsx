'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ReactNode } from 'react';
import { useL } from '@/lib/i18n';
import SiteImage from '@/components/SiteImage';

type Announcement = {
  id: string;
  condition_en: string;
  condition_zh: string;
  slots: number;
  status_en: string;
  status_zh: string;
  results_url: string;
};


/** Blue title + thin divider, used for every content block on this page. */
function SectionBlock({
  title_en,
  title_zh,
  children,
  className = '',
}: {
  title_en: string;
  title_zh: string;
  children: ReactNode;
  className?: string;
}) {
  const L = useL();
  return (
    <section className={className}>
      <h2 className="text-xl font-bold text-accent sm:text-2xl">{L(title_en, title_zh)}</h2>
      <div className="mt-2 border-b border-line" />
      <div className="mt-4 flex flex-col gap-3 text-base leading-relaxed text-ink">{children}</div>
    </section>
  );
}

export default function SubsidizedTreatmentsContent({ announcements }: { announcements: Announcement[] }) {
  const L = useL();

  return (
    <div className="flex flex-1 flex-col font-serif">
      {/* Hero */}
      <div className="relative h-[360px] w-full bg-accentSoft sm:h-[480px]">
        <div className="absolute inset-0 overflow-hidden">
          <SiteImage
            folder="subsidized-treatments"
            file="Subsidized_Treatments-02.jpg"
            alt=""
            label={L('Background: doctor with medical technology', '背景：医生与医疗科技')}
            className="h-full w-full"
            priority
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative overflow-hidden">
        {/* Decorative diagonal graphics, right edge — one near the top, one lower down so the diagonal continues */}
        <div className="pointer-events-none absolute right-0 top-0 hidden w-[560px] select-none opacity-90 md:block lg:w-[720px]">
          <Image
            src="/images/subsidized-treatments/Subsidized_Treatments-03.png"
            alt=""
            width={1400}
            height={1724}
            className="h-auto w-full object-contain object-top"
            sizes="(min-width: 1024px) 720px, 560px"
          />
        </div>
        <div className="pointer-events-none absolute bottom-0 right-0 hidden w-[560px] select-none opacity-90 md:block lg:w-[720px]">
          <Image
            src="/images/subsidized-treatments/Subsidized_Treatments-03.png"
            alt=""
            width={1400}
            height={1724}
            className="h-auto w-full object-contain object-bottom"
            sizes="(min-width: 1024px) 720px, 560px"
          />
        </div>

        <div className="relative mx-auto w-full max-w-4xl px-6 py-16">
          <SectionBlock title_en="Subsidized Treatments" title_zh="补贴治疗项目">
            <p className="text-justify">{L('Healing should not depend on your bank account.', '康复不应取决于您的经济能力。')}</p>
            <p className="text-justify">
              {L(
                'Our Subsidized Treatments Program exists to prove what our protocols can do — openly, publicly — and to ensure that the most vulnerable are never turned away because they cannot pay.',
                '我们的补贴治疗项目旨在公开、透明地证明我们方案的实际效果——并确保最脆弱的患者不会因为无力承担费用而被拒之门外。',
              )}
            </p>
            <p className="text-justify">
              {L(
                'This is not a clinical trial. It is not charity. It is a commitment to honesty and human dignity.',
                '这不是临床试验，也不是慈善救助，而是我们对诚信与人格尊严的承诺。',
              )}
            </p>
          </SectionBlock>

          <SectionBlock title_en="Safety: No Experiments, No Risk" title_zh="安全性：无实验、无风险" className="mt-16">
            <p className="text-justify">
              {L(
                'Conventional clinical trials recruit volunteers to test unapproved drugs. Those trials carry real danger — participants can suffer severe harm, and in early phases, death is a known risk.',
                '传统临床试验招募志愿者测试未经批准的药物，存在真实的风险——参与者可能遭受严重伤害，在早期阶段，死亡也是已知的风险之一。',
              )}
            </p>
            <p className="text-justify">{L('We do not do this.', '我们不会这样做。')}</p>
            <p className="text-justify">
              {L(
                'Every component in our protocols is already approved for human use: registered medications, general food products, food supplements, topical health products, and general-purpose wellness devices. There is no safety risk because there is nothing unproven to test.',
                '我们方案中的每一项组成部分均已获准用于人体：注册药品、普通食品、食品补充剂、外用保健产品以及通用型保健设备。由于没有任何未经验证的内容，因此不存在安全风险。',
              )}
            </p>
            <p className="text-justify">
              {L(
                'When you receive a subsidized treatment slot, you are receiving the same protocol that paying patients receive — with the non-medical component covered by us.',
                '当您获得补贴治疗名额时，您所接受的是与付费患者完全相同的治疗方案——非医疗部分的费用由我们承担。',
              )}
            </p>
          </SectionBlock>

          <SectionBlock title_en="How Subsidized Treatments Work" title_zh="补贴治疗的运作方式" className="mt-16">
            <p className="text-justify">
              {L(
                'From time to time, we announce a small number of subsidized treatment slots for a specific condition. These slots are exclusive — typically 3 to 5 openings — and are offered through a simple selection process.',
                '我们会不定期针对特定病症公布少量补贴治疗名额。这些名额十分有限——通常为 3 至 5 个——并通过简单的甄选流程发放。',
              )}
            </p>
            <p>{L('For each subsidized slot:', '每个补贴名额包括：')}</p>
            <ul className="flex flex-col gap-2">
              <li className="flex gap-2">
                <span className="text-accent">•</span>
                <span>{L('The non-medical component of the protocol is fully covered.', '治疗方案中的非医疗部分完全由我们承担费用。')}</span>
              </li>
              <li className="flex gap-2">
                <span className="text-accent">•</span>
                <span>
                  {L(
                    'The hospital-based medical component continues to be covered by your insurance, as with any treatment.',
                    '医院提供的医疗部分仍按常规由您的保险承担，与其他治疗一致。',
                  )}
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-accent">•</span>
                <span>
                  {L(
                    'Your anonymised results become part of our public record of real-world efficacy — so others can see what is possible before making their own decision.',
                    '您的匿名治疗结果将成为我们真实疗效公开记录的一部分——让他人在做出决定前能够看到真实的可能性。',
                  )}
                </span>
              </li>
            </ul>
            <p className="text-justify">
              {L(
                'When you apply, you know exactly what the objective is: complete remission of your condition. You know the past results. You know the duration. Nothing is hidden.',
                '申请时，您将清楚了解治疗目标：病症的完全缓解。您将了解过往的结果，了解所需的疗程时长。一切公开透明，毫无隐瞒。',
              )}
            </p>
          </SectionBlock>

          <SectionBlock title_en="Social Responsibility Slots" title_zh="社会责任名额" className="mt-16">
            <p className="text-justify">
              {L(
                'Beyond our periodic announcements, we reserve a limited number of slots for those who genuinely cannot afford care — sick children, the elderly, and people without financial means.',
                '除定期公布的名额外，我们还为确实无力承担治疗费用的人群——患病儿童、老年人及经济困难者——预留一定数量的名额。',
              )}
            </p>
            <p className="text-justify">
              {L(
                'These slots are funded by the revenue from our paid treatments. They start humbly and grow as our community grows. Our goal is that no one is ever refused healing because of money.',
                '这些名额由付费治疗的收入提供支持，规模会随着我们社区的发展而逐步扩大。我们的目标是：任何人都不应因经济原因而被拒绝治疗。',
              )}
            </p>
          </SectionBlock>

          <SectionBlock title_en="Our Public Ledger" title_zh="我们的公开账本" className="mt-16">
            <p className="text-justify">
              {L(
                'We track every treatment we carry and publish real statistics for each condition: total patients treated, complete remissions, partial improvements, and cases where the damage was too advanced. This is not marketing. It is accountability. You can see the numbers before you ever fill out a form.',
                '我们记录所承接的每一例治疗，并公开每种病症的真实数据：总治疗人数、完全缓解人数、部分改善人数，以及损伤过重而未能改善的病例。这不是市场宣传，而是问责——您可以在填写申请表之前，就先看到真实的数据。',
              )}
            </p>
          </SectionBlock>

          <SectionBlock title_en="How to Apply" title_zh="如何申请" className="mt-16">
            <p>{L('All applications — paid or subsidized — go through the same page:', '所有申请——无论付费还是补贴——都通过同一页面提交：')}</p>
            <p>
              <Link href="/apply-for-treatment" className="font-medium text-accent hover:underline">
                {L('[ Apply for Treatment → ]', '[ 申请治疗 → ]')}
              </Link>
            </p>
            <p>{L('On the disease-specific Application Form, simply select the appropriate option:', '在特定病症的申请表中，只需选择相应的选项：')}</p>
            <ul className="flex flex-col gap-2">
              <li className="flex gap-2">
                <span className="text-accent">•</span>
                <span>{L('Paid Treatment', '付费治疗')}</span>
              </li>
              <li className="flex gap-2">
                <span className="text-accent">•</span>
                <span>{L('Subsidized Treatment Slot (when available)', '补贴治疗名额（如有开放）')}</span>
              </li>
              <li className="flex gap-2">
                <span className="text-accent">•</span>
                <span>{L('Social Responsibility Subsidized Treatment (for eligible vulnerable patients)', '社会责任补贴治疗（适用于符合条件的弱势患者）')}</span>
              </li>
            </ul>
            <p className="text-justify">
              {L(
                'If subsidized slots are currently open for a condition, that condition will be clearly marked on the Apply for Treatment page with a badge like [Subsidized Slots Available].',
                '如果某病症当前有开放的补贴名额，该病症会在申请治疗页面上以「补贴名额开放中」的标识清楚标注。',
              )}
            </p>
            <p className="text-justify">
              {L(
                'If no subsidized slot is open for your condition right now, you can still submit a general application and indicate your interest. We will notify you when a slot becomes available. There is no obligation to proceed.',
                '如果您的病症目前没有开放的补贴名额，您仍然可以提交一般申请并表明意向。一旦有名额开放，我们会通知您。这不构成任何进一步的义务。',
              )}
            </p>
          </SectionBlock>

          <SectionBlock title_en="Past Subsidized Treatment Announcements" title_zh="往期补贴治疗公告" className="mt-16">
            <p className="text-justify">
              {L(
                'Below is a record of our previous subsidized treatment offerings. Each announcement lists the condition, the number of slots, and a link to the published results. This is part of our commitment to full transparency — you can see exactly what was offered and what was achieved.',
                '以下是我们以往补贴治疗名额的记录。每条公告均列出病症、名额数量以及已发布结果的链接。这是我们全面透明承诺的一部分——您可以清楚地看到我们提供了什么、又取得了怎样的成果。',
              )}
            </p>
            <div className="mt-2 overflow-x-auto border border-line">
              <table className="w-full text-sm">
                <thead className="bg-graySoft text-left font-bold text-ink">
                  <tr>
                    <th className="px-4 py-3">{L('Condition', '病症')}</th>
                    <th className="px-4 py-3 text-center">{L('Slots', '名额')}</th>
                    <th className="px-4 py-3 text-center">{L('Status', '状态')}</th>
                    <th className="px-4 py-3 text-center">{L('Results', '结果')}</th>
                  </tr>
                </thead>
                <tbody>
                  {announcements.map((a, i) => (
                    <tr key={a.id} className={i % 2 === 1 ? 'bg-graySoft/60' : undefined}>
                      <td className="px-4 py-3 text-ink">{L(a.condition_en, a.condition_zh)}</td>
                      <td className="px-4 py-3 text-center text-muted">{a.slots}</td>
                      <td className="px-4 py-3 text-center text-muted">{L(a.status_en, a.status_zh)}</td>
                      <td className="px-4 py-3 text-center">
                        <Link href={a.results_url || '/case-studies'} className="text-accent hover:underline">
                          {L('View Results →', '查看结果 →')}
                        </Link>
                      </td>
                    </tr>
                  ))}
                  {announcements.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-4 py-6 text-center text-muted">
                        {L('No announcements yet — check back soon.', '暂无公告，敬请期待。')}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </SectionBlock>

          <div className="mt-16 border-t border-line pt-8 text-center text-base text-ink">
            {L('For any questions about our Subsidized Treatment Program, please visit our ', '如有任何关于补贴治疗项目的问题，请访问我们的')}
            <Link href="/contact" className="text-accent hover:underline">
              {L('[Contact]', '[联系我们]')}
            </Link>
            {L(' page.', '页面。')}
          </div>
        </div>
      </div>

      {/* Closing band */}
      <div className="h-16 bg-[#97A9CD]" aria-hidden="true" />
    </div>
  );
}
