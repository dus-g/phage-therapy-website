'use client';

import { useL } from '@/lib/i18n';

export default function PrivacyPage() {
  const L = useL();

  return (
    <div className="flex flex-1 justify-center px-6 py-20">
      <div className="w-full max-w-2xl">
        <h1 className="mb-2 font-serif text-2xl text-ink">{L('Privacy Policy', '隐私政策')}</h1>
        <p className="mb-8 text-xs text-muted">
          {L('Last updated: 2026', '最近更新：2026年')}
        </p>

        <div className="flex flex-col gap-6 text-sm leading-relaxed text-ink">
          <section>
            <h2 className="mb-2 font-serif text-base text-ink">
              {L('What we collect', '我们收集的信息')}
            </h2>
            <p className="text-muted">
              {L(
                'When you complete an assessment form, we collect the information you provide, including your name, contact details, and answers to health-related questions relevant to that assessment. If you upload photos or documents, those are stored as well.',
                '当您填写评估表单时，我们会收集您提供的信息，包括姓名、联系方式，以及与该评估相关的健康问题答案。如果您上传照片或文件，这些内容也会被保存。',
              )}
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-serif text-base text-ink">
              {L('How we use it', '我们如何使用这些信息')}
            </h2>
            <p className="text-muted">
              {L(
                'Your information is used solely to review your assessment and determine eligibility for the treatment program you applied for, and to contact you about your application.',
                '您的信息仅用于审核您的评估、判断您是否符合您所申请治疗项目的资格，以及就您的申请与您联系。',
              )}
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-serif text-base text-ink">
              {L('Who can see it', '谁可以查看这些信息')}
            </h2>
            <p className="text-muted">
              {L(
                'Only authorized Huoma Biotech staff can access submitted assessments. We do not sell or share your personal information with third parties for marketing purposes.',
                '只有获得授权的焕码生物工作人员才能访问已提交的评估。我们不会出于营销目的向第三方出售或分享您的个人信息。',
              )}
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-serif text-base text-ink">
              {L('Questions', '如有疑问')}
            </h2>
            <p className="text-muted">
              {L(
                'If you have questions about your data, contact us using the details in the footer of this site.',
                '如果您对自己的数据有任何疑问，请通过本网站页脚中的联系方式与我们联系。',
              )}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
