'use client';

import Link from 'next/link';
import { ReactNode } from 'react';
import { useL } from '@/lib/i18n';
import SiteImage from '@/components/SiteImage';

function Bullet({ children }: { children: ReactNode }) {
  return (
    <li className="flex gap-2">
      <span className="text-accent">•</span>
      <span>{children}</span>
    </li>
  );
}

function Section({ number, title_en, title_zh, children }: { number: number; title_en: string; title_zh: string; children: ReactNode }) {
  const L = useL();
  const isLast = number === 10;
  return (
    <section className={isLast ? '' : 'border-b border-line pb-10'}>
      <div className="bg-gradient-to-r from-accentDeep via-accent to-paper px-5 py-3">
        <h2 className="text-lg font-bold text-paper">
          {number}. {L(title_en, title_zh)}
        </h2>
      </div>
      <div className="mt-6 flex flex-col gap-3 text-base leading-relaxed text-ink">{children}</div>
    </section>
  );
}

export default function CommunityGuidelinesPage() {
  const L = useL();

  return (
    <div className="flex flex-1 flex-col font-serif">
      {/* Hero */}
      <div className="relative h-[360px] w-full bg-accentDeep sm:h-[480px]">
        <div className="absolute inset-0 overflow-hidden">
          <SiteImage
            folder="community"
            file="Community_Guidelines-02.jpg"
            alt=""
            label={L('Background: star trails over a lake at dusk', '背景：黄昏湖面上的星轨')}
            className="h-full w-full"
            priority
          />
        </div>
      </div>

      <div className="mx-auto w-full max-w-4xl px-6 py-16">
        <h1 className="text-3xl font-bold text-ink">{L('Community Guidelines', '社区准则')}</h1>
        <p className="mt-6 text-justify text-base leading-relaxed text-ink">
          {L(
            'Our Blog & Community is a space for honest conversation, patient experiences, and shared learning. We welcome you with an open heart — and we also take our responsibility to protect this community very seriously.',
            '我们的博客与社区是一个供大家坦诚交流、分享患者经历与共同学习的空间。我们以开放的态度欢迎您——同时也高度重视保护这一社区的责任。',
          )}
        </p>
        <p className="mt-3 text-justify text-base leading-relaxed text-ink">
          {L(
            'These guidelines exist to ensure that every person who visits, reads, or participates feels safe, respected, and informed. By using our community features, you agree to follow these rules. We reserve the right to remove any content that violates them and to suspend or permanently revoke access for anyone who repeatedly or deliberately causes harm.',
            '这些准则旨在确保每一位访问、阅读或参与的人都能感到安全、受到尊重并获得充分信息。使用我们的社区功能即表示您同意遵守以下准则。我们保留移除任何违反准则内容的权利，并可暂停或永久取消屡次或蓄意造成伤害者的访问权限。',
          )}
        </p>

        <div className="mt-14 flex flex-col gap-10">
          <Section number={1} title_en="Respect and Kindness Are Not Optional" title_zh="尊重与友善并非可选项">
            <p className="text-justify">
              {L(
                'Treat every member of this community with dignity. Disagreement and debate are welcome; personal attacks, insults, harassment, bullying, or intimidation are not.',
                '请以尊重的态度对待社区中的每一位成员。欢迎不同意见与理性讨论，但绝不允许人身攻击、侮辱、骚扰、欺凌或恐吓。',
              )}
            </p>
            <ul className="flex flex-col gap-2">
              <Bullet>{L('Do not attack someone based on their condition, background, beliefs, or identity.', '不得因病症、背景、信仰或身份攻击他人。')}</Bullet>
              <Bullet>{L('Do not post inflammatory, threatening, or hateful content of any kind.', '不得发布任何煽动性、威胁性或仇恨性内容。')}</Bullet>
              <Bullet>{L('Do not engage in trolling, flame wars, or coordinated attempts to disrupt discussions.', '不得挑衅滋事、引发骂战，或有组织地扰乱讨论。')}</Bullet>
            </ul>
            <p className="text-justify">
              {L('We have zero tolerance for abusive behaviour. If you feel targeted or unsafe, report it immediately through our ', '我们对辱骂行为零容忍。如果您感到被针对或不安全，请立即通过我们的')}
              <Link href="/contact" className="text-accent hover:underline">
                [{L('Contact', '联系我们')}]
              </Link>
              {L(' page.', '页面举报。')}
            </p>
          </Section>

          <Section number={2} title_en="Share Your Experience, Not Universal Truths" title_zh="分享您的经历，而非普遍性结论">
            <p className="text-justify">
              {L(
                'You are warmly encouraged to describe your personal journey — what you experienced, how you felt, and what changed for you. However, you must not make claims that a specific treatment will work for others.',
                '我们非常欢迎您分享自己的康复历程——您的经历、感受，以及发生的改变。但请勿声称某种治疗方式会对他人产生同样效果。',
              )}
            </p>
            <ul className="flex flex-col gap-2">
              <Bullet>
                {L('Acceptable: “After following the protocol, my lesion cleared completely. This was my experience.”', '可以这样说："按照方案治疗后，我的病灶完全消退了，这是我的亲身经历。"')}
              </Bullet>
              <Bullet>
                {L('Not acceptable: “This protocol cures HPV 100%. Everyone who does it will get the same result.”', '不可以这样说："这个方案能100%治愈HPV，所有人都会得到同样的结果。"')}
              </Bullet>
            </ul>
            <p className="text-justify">
              {L(
                'Your story is powerful because it is true for you. Let others draw their own conclusions. No individual can guarantee an outcome for someone else, and our platform does not permit posts that suggest otherwise.',
                '您的经历之所以有力量，正是因为它属于您自己。请让他人自行做出判断。任何个人都无法为他人保证结果，我们的平台也不允许发布暗示这一点的内容。',
              )}
            </p>
          </Section>

          <Section number={3} title_en="No Medical Advice — Ever" title_zh="任何情况下均不得提供医疗建议">
            <p className="text-justify">{L('This community is not a substitute for professional medical consultation. You must not:', '本社区不能替代专业医疗咨询。您不得：')}</p>
            <ul className="flex flex-col gap-2">
              <Bullet>{L('Tell another user what treatment to choose or avoid.', '告诉他人应选择或避免哪种治疗。')}</Bullet>
              <Bullet>{L('Recommend specific medications, dosages, or supplement regimens.', '推荐具体的药物、剂量或补充剂方案。')}</Bullet>
              <Bullet>{L("Diagnose a condition or interpret someone else's symptoms.", '对他人病情作出诊断或解读其症状。')}</Bullet>
              <Bullet>{L('Advise anyone to stop or change a treatment prescribed by their doctor.', '建议他人停止或更改医生开具的治疗方案。')}</Bullet>
            </ul>
            <p className="text-justify">
              {L('If you are seeking guidance, please use our ', '如需专业建议，请通过我们的')}
              <Link href="/apply-for-treatment" className="text-accent hover:underline">
                [{L('Apply for Treatment', '申请治疗')}]
              </Link>
              {L(
                ' page for a free, confidential case review with a qualified clinical consultant. The community is here for peer support, not medical direction.',
                '页面获取由专业临床顾问提供的免费、保密病例评估。本社区旨在提供同伴支持，而非医疗指导。',
              )}
            </p>
          </Section>

          <Section number={4} title_en="Keep It Relevant and Constructive" title_zh="保持相关性与建设性">
            <p className="text-justify">
              {L(
                'Stay on topic within each discussion thread. If you want to talk about a different condition or a new subject, start a new thread or use the “Suggest a New Disease” feature.',
                '请在每个讨论帖中保持主题相关。如需讨论其他病症或新话题，请另开新帖，或使用"建议新增病症"功能。',
              )}
            </p>
            <ul className="flex flex-col gap-2">
              <Bullet>{L('Do not hijack threads with unrelated content.', '不得在讨论帖中插入无关内容。')}</Bullet>
              <Bullet>{L('Do not post the same message across multiple threads.', '不得在多个帖子中重复发布相同内容。')}</Bullet>
              <Bullet>{L('Do not use the community for personal blogging or journaling unrelated to health and healing.', '不得将本社区用作与健康康复无关的个人博客或日志空间。')}</Bullet>
            </ul>
            <p className="text-justify">
              {L('We want discussions to remain useful and searchable for everyone who comes after you.', '我们希望讨论内容能持续为后来者提供有用且易于查找的信息。')}
            </p>
          </Section>

          <Section number={5} title_en="No Advertising, Solicitation, or Self-Promotion" title_zh="禁止广告、招揽或自我推广">
            <p className="text-justify">{L('Our community is not a marketplace. You may not:', '我们的社区不是商业平台。您不得：')}</p>
            <ul className="flex flex-col gap-2">
              <Bullet>{L('Promote external products, clinics, supplements, or services.', '推广外部产品、诊所、补充剂或服务。')}</Bullet>
              <Bullet>{L('Recruit participants for other studies, treatments, or commercial ventures.', '招募参与其他研究、治疗或商业项目的人员。')}</Bullet>
              <Bullet>{L('Post affiliate links, discount codes, or referral programmes.', '发布联盟链接、优惠码或推荐奖励计划。')}</Bullet>
              <Bullet>{L('Solicit donations or sell items of any kind.', '征集捐款或出售任何物品。')}</Bullet>
            </ul>
            <p className="text-justify">
              {L('If you represent a legitimate medical institution, research group, or charitable organisation and wish to explore a partnership, please use our ', '如果您代表正规医疗机构、研究团体或慈善组织，希望探讨合作，请通过我们的')}
              <Link href="/contact" className="text-accent hover:underline">
                [{L('Contact', '联系我们')}]
              </Link>
              {L(' page. Unsolicited commercial content will be removed without notice.', '页面联系我们。未经许可的商业内容将被直接移除，恕不另行通知。')}
            </p>
          </Section>

          <Section number={6} title_en="Protect Your Privacy — and Everyone Else's" title_zh="保护您自己及他人的隐私">
            <p className="text-justify">{L('What you share here is visible to the world. Be careful.', '您在此分享的内容对所有人可见，请谨慎发布。')}</p>
            <ul className="flex flex-col gap-2">
              <Bullet>
                {L(
                  'Do not post your full legal name, home address, phone number, email address, WeChat ID, or hospital record numbers.',
                  '请勿发布您的法定全名、家庭住址、电话号码、电子邮件、微信号或病历号。',
                )}
              </Bullet>
              <Bullet>
                {L(
                  "Do not post any information that could identify another person — including family members, friends, or fellow patients — without their written consent.",
                  '未经书面同意，请勿发布可识别他人身份的信息——包括家人、朋友或其他患者的信息。',
                )}
              </Bullet>
              <Bullet>{L('Use first names only, or a username. Anonymised stories are just as powerful and far safer.', '建议仅使用名字或用户名。匿名分享同样有力，也更加安全。')}</Bullet>
            </ul>
            <p className="text-justify">
              {L(
                'We cannot be responsible for information you choose to reveal about yourself. Please think carefully before you post.',
                '我们无法对您自行披露的个人信息负责，发布前请仔细考虑。',
              )}
            </p>
          </Section>

          <Section number={7} title_en="Our Right to Moderate" title_zh="我们保留审核的权利">
            <p className="text-justify">
              {L(
                'Every post, comment, and testimonial submitted to our Blog & Community is reviewed by our moderation team before publication. We do this to keep the space safe, accurate, and legally compliant.',
                '提交至我们博客与社区的所有帖子、评论及见证内容，均会在发布前经过审核团队的审查，以确保空间的安全性、准确性及合规性。',
              )}
            </p>
            <p className="text-justify">{L('By submitting content, you agree that we may:', '提交内容即表示您同意我们可以：')}</p>
            <ul className="flex flex-col gap-2">
              <Bullet>{L('Approve your content as submitted.', '按原样批准您的内容。')}</Bullet>
              <Bullet>
                {L(
                  'Edit minor portions for clarity, grammar, or to remove language that violates these guidelines (while preserving your voice and intent).',
                  '对部分内容进行小幅编辑，以提升清晰度、修正语法，或移除违反准则的措辞（同时保留您的语气与本意）。',
                )}
              </Bullet>
              <Bullet>{L('Decline to publish your content if it does not meet our standards.', '如内容不符合我们的标准，可拒绝发布。')}</Bullet>
              <Bullet>{L('Remove previously published content if it is later found to violate these guidelines or applicable laws.', '若事后发现已发布内容违反本准则或相关法律，可将其移除。')}</Bullet>
            </ul>
            <p className="text-justify">
              {L(
                'We aim to review all submissions within 48 hours. If your content is edited or declined, we will notify you with a brief explanation. You are always welcome to revise and resubmit.',
                '我们力求在48小时内完成审核。如您的内容被编辑或拒绝，我们会附上简要说明通知您。您始终可以修改后重新提交。',
              )}
            </p>
          </Section>

          <Section number={8} title_en="Consequences for Violations" title_zh="违规后果">
            <p className="text-justify">{L('We take these guidelines seriously because the safety of this community depends on them.', '我们高度重视这些准则，因为社区的安全有赖于此。')}</p>
            <ul className="flex flex-col gap-2">
              <Bullet>{L('First minor violation: We will edit or remove the content and send you a reminder of these guidelines.', '首次轻微违规：我们将编辑或移除内容，并向您发送准则提醒。')}</Bullet>
              <Bullet>{L('Repeated or serious violations: We may suspend your posting privileges temporarily or permanently.', '多次或严重违规：我们可能暂停或永久取消您的发帖权限。')}</Bullet>
              <Bullet>
                {L(
                  'Severe violations: Posts involving hate speech, threats, deliberate disinformation, or illegal content will result in immediate and permanent removal from the community, and we may report the matter to the relevant authorities if required by law.',
                  '严重违规：涉及仇恨言论、威胁、蓄意虚假信息或违法内容的帖子，将被立即永久移除，我们也可能在法律要求下将相关情况上报有关部门。',
                )}
              </Bullet>
            </ul>
            <p className="text-justify">{L('Our decisions are final and made in the best interest of the entire community.', '我们的决定为最终决定，均以整个社区的最大利益为出发点。')}</p>
          </Section>

          <Section number={9} title_en="Disclaimer" title_zh="免责声明">
            <p className="text-justify">
              {L(
                'All views expressed by community members are their own and do not represent the views, medical advice, or guarantees of Syncretic Therapeutics, its partner hospitals, or its clinical teams.',
                '社区成员发表的所有观点均代表其个人立场，并不代表融合疗法（Syncretic Therapeutics）、其合作医院或临床团队的观点、医疗建议或承诺。',
              )}
            </p>
            <p className="text-justify">
              {L(
                'We do not endorse, verify, or assume responsibility for any user-generated content except as explicitly stated in our moderation policy. We are not liable for any actions taken based on information shared in this community.',
                '除审核政策中明确说明的情形外，我们不对任何用户生成内容进行背书、核实或承担责任。对于基于本社区所分享信息而采取的任何行动，我们概不负责。',
              )}
            </p>
            <p className="text-justify">
              {L(
                'If you believe you need medical attention, please contact a qualified healthcare provider or apply for a case review through our official channels.',
                '如您认为自己需要就医，请联系专业医疗机构，或通过我们的官方渠道申请病例评估。',
              )}
            </p>
          </Section>

          <Section number={10} title_en="Contact Us About These Guidelines" title_zh="有关本准则的联系方式">
            <p className="text-justify">
              {L('If you have questions, concerns, or wish to report a violation, please reach out through our ', '如您对本准则有任何疑问、顾虑，或希望举报违规内容，请通过我们的')}
              <Link href="/contact" className="text-accent hover:underline">
                [{L('Contact', '联系我们')}]
              </Link>
              {L(' page. We read every message and take your feedback seriously.', '页面与我们联系。我们会认真阅读每一条反馈。')}
            </p>
          </Section>
        </div>

        <div className="mt-14 bg-[#E8963C] px-6 py-8 sm:px-10">
          <p className="text-xl font-bold leading-relaxed text-paper">
            {L(
              'Thank you for being part of this community and for helping us build a space where healing is discussed with honesty, humility, and care.',
              '感谢您成为本社区的一员，也感谢您帮助我们共同营造一个坦诚、谦逊、充满关怀的康复交流空间。',
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
