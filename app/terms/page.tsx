'use client';

import { useL } from '@/lib/i18n';

export default function TermsPage() {
  const L = useL();

  return (
    <div className="flex flex-1 justify-center px-6 py-20">
      <div className="w-full max-w-2xl">
        <h1 className="mb-2 font-serif text-2xl text-ink">{L('Terms of Service', '服务条款')}</h1>
        <p className="mb-8 text-xs text-muted">
          {L('Last updated: 2026', '最近更新：2026年')}
        </p>

        <div className="flex flex-col gap-6 text-sm leading-relaxed text-ink">
          <section>
            <h2 className="mb-2 font-serif text-base text-ink">
              {L('Not a medical diagnosis', '非医学诊断')}
            </h2>
            <p className="text-muted">
              {L(
                'The assessment forms on this site are a screening step, not a medical diagnosis. Completing a form does not guarantee acceptance into any treatment program.',
                '本网站的评估表单是初步筛查步骤，并非医学诊断。填写表单并不保证您能被纳入任何治疗项目。',
              )}
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-serif text-base text-ink">
              {L('Accurate information', '信息准确性')}
            </h2>
            <p className="text-muted">
              {L(
                'You agree to provide accurate and truthful information when completing any form on this site. Providing false information may affect your eligibility.',
                '您同意在填写本网站任何表单时提供准确、真实的信息。提供虚假信息可能会影响您的申请资格。',
              )}
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-serif text-base text-ink">
              {L('Contacting you', '与您联系')}
            </h2>
            <p className="text-muted">
              {L(
                'By submitting a form, you agree that we may contact you using the details you provided, regarding your assessment.',
                '提交表单即表示您同意我们可以使用您提供的联系方式，就您的评估情况与您联系。',
              )}
            </p>
          </section>

          <section>
            <h2 className="mb-2 font-serif text-base text-ink">
              {L('Changes', '条款变更')}
            </h2>
            <p className="text-muted">
              {L(
                'These terms may be updated from time to time. Continued use of this site after changes means you accept the updated terms.',
                '本条款可能会不时更新。变更后继续使用本网站即表示您接受更新后的条款。',
              )}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
