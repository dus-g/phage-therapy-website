'use client';

import Link from 'next/link';
import { useL } from '@/lib/i18n';
import SiteImage from '@/components/SiteImage';

export default function ContactPage() {
  const L = useL();

  return (
    <div className="flex flex-1 flex-col font-serif">
      {/* Hero */}
      <div className="relative h-[360px] w-full bg-accentDeep sm:h-[480px]">
        <div className="absolute inset-0 overflow-hidden">
          <SiteImage
            folder="contact"
            file="Contact_Us-02.jpg"
            alt=""
            label={L('Background: floating digital displays', '背景：漂浮的数字屏幕')}
            className="h-full w-full"
            priority
          />
        </div>
      </div>

      <div className="mx-auto w-full max-w-4xl px-6 py-16">
        <h1 className="text-3xl font-bold text-ink">{L('Contact Us', '联系我们')}</h1>

        <p className="mt-6 text-justify text-base leading-relaxed text-ink">
          {L('We are here to answer your questions, not to pressure you into a decision.', '我们在这里是为了解答您的疑问，而不是给您施加压力。')}
        </p>
        <p className="mt-2 text-justify text-base leading-relaxed text-ink">
          {L('If you are looking to apply for treatment, please use our ', '如果您希望申请治疗，请使用我们的')}
          <Link href="/apply-for-treatment" className="text-accent hover:underline">
            {L('Apply for Treatment', '申请治疗')}
          </Link>
          {L(' page — that is the fastest way to have your case reviewed.', '页面——这是让您的病例得到评估的最快方式。')}
        </p>
        <p className="mt-4 text-justify text-base leading-relaxed text-ink">
          {L(
            'For all other inquiries — partnerships, media, general questions, or technical issues with the website — you can reach us using the methods below.',
            '如有其他咨询——合作、媒体、一般问题，或网站技术问题——您可以通过以下方式联系我们。',
          )}
        </p>

        <div className="mt-10 border-t border-line pt-10">
          <div className="flex flex-col gap-6 text-base text-ink">
            <div>
              <span className="font-bold">{L('Email: ', '电子邮件：')}</span>
              <a href="mailto:info@huomabio.com" className="text-accent hover:underline">
                info@huomabio.com
              </a>
            </div>
            <div>
              <span className="font-bold">{L('Phone: ', '电话：')}</span>
              <a href="tel:+8618670370019" className="text-accent hover:underline">
                +86 186 7037 0019
              </a>
              {', '}
              <a href="tel:+8613162944133" className="text-accent hover:underline">
                +86 131 6294 4133
              </a>
            </div>
            <div>
              <span className="font-bold">{L('WeChat', '微信')}</span>
              <p className="mt-1 text-muted">{L('[WeChat ID or QR code placeholder]', '[微信号或二维码占位]')}</p>
            </div>
            <div>
              <span className="font-bold">{L('Office Address', '办公地址')}</span>
              <p className="mt-1 text-muted">{L('[physical address, optional]', '[实际地址，可选]')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Closing photo band */}
      <div className="relative h-56 w-full overflow-hidden sm:h-72">
        <SiteImage
          folder="contact"
          file="Contact_Us-03.jpg"
          alt=""
          label={L('Background: city skyline at dusk', '背景：黄昏城市天际线')}
          className="h-full w-full"
        />
      </div>
    </div>
  );
}
