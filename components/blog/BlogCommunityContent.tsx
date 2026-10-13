'use client';

import Link from 'next/link';
import { ReactNode } from 'react';
import { useL } from '@/lib/i18n';
import SiteImage from '@/components/SiteImage';
import BlogList from '@/components/blog/BlogList';

type Post = {
  id: string;
  slug: string;
  title_en: string;
  title_zh: string;
  excerpt_en: string;
  excerpt_zh: string;
  cover_image_url: string;
  published_at: Date | null;
};

const CATEGORIES = [
  {
    file: 'Blog_Community-03.png',
    title_en: 'Patient Stories',
    title_zh: '患者故事',
    desc_en: 'anonymized accounts written by those who have completed treatment.',
    desc_zh: '由已完成治疗的患者撰写的匿名分享。',
  },
  {
    file: 'Blog_Community-05.png',
    title_en: 'Announcements',
    title_zh: '公告',
    desc_en: 'new hospital partners, newly added conditions, and subsidized treatment slot openings.',
    desc_zh: '新的合作医院、新增病症，以及补贴治疗名额的开放信息。',
  },
  {
    file: 'Blog_Community-06.png',
    title_en: 'Behind the Science',
    title_zh: '科学背后',
    desc_en: 'occasional notes from our team on the syncretic approach.',
    desc_zh: '我们团队不定期分享关于融合疗法的思考。',
  },
  {
    file: 'Blog_Community-07.png',
    title_en: 'Community',
    title_zh: '社区',
    desc_en: "discussion threads where you can connect with others, ask questions, and even suggest diseases we don't yet treat.",
    desc_zh: '讨论区——您可以在这里与他人交流、提出问题，甚至建议我们尚未开展治疗的病症。',
  },
];

const DISCUSSION_LINKS = [
  { en: 'HPV & Cervical Dysplasia', zh: 'HPV 与宫颈发育不良', href: '/blog?disease=hpv-cervical-dysplasia' },
  { en: 'Type 2 Diabetes', zh: '2 型糖尿病', href: '/blog?disease=type-2-diabetes' },
  { en: 'BPH – Enlarged Prostate', zh: '良性前列腺增生（BPH）', href: '/blog?disease=bph' },
  { en: 'Psoriasis Vulgaris', zh: '寻常型银屑病', href: '/blog?disease=psoriasis-vulgaris' },
  { en: 'Eye Diseases', zh: '眼科疾病', href: '/blog?disease=eye-diseases' },
];

const CATEGORY_OPTIONS = [
  { value: '', en: 'All Posts', zh: '全部文章' },
  { value: 'patient-stories', en: 'Patient Stories', zh: '患者故事' },
  { value: 'announcements', en: 'Announcements', zh: '公告' },
  { value: 'behind-the-science', en: 'Behind the Science', zh: '科学背后' },
  { value: 'community', en: 'Community', zh: '社区' },
];

const DISEASE_OPTIONS = [
  { value: '', en: 'All Diseases', zh: '全部病症' },
  { value: 'hpv-cervical-dysplasia', en: 'HPV & Cervical Dysplasia (CIN 1–3)', zh: 'HPV 与宫颈发育不良（CIN 1–3）' },
  { value: 'type-2-diabetes', en: 'Type 2 Diabetes', zh: '2 型糖尿病' },
  { value: 'bph', en: 'BPH – Enlarged Prostate', zh: '良性前列腺增生（BPH）' },
  { value: 'psoriasis-vulgaris', en: 'Psoriasis Vulgaris', zh: '寻常型银屑病' },
  { value: 'eye-diseases', en: 'Eye Diseases', zh: '眼科疾病' },
  { value: 'other', en: 'Other / Not Yet Listed', zh: '其他 / 尚未列出' },
];

function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <div className="mb-3">
      <h3 className="text-xl font-bold text-ink">{children}</h3>
      <div className="mt-2 w-16 border-b border-line" />
    </div>
  );
}

export default function BlogCommunityContent({ posts }: { posts: Post[] }) {
  const L = useL();

  return (
    <div className="flex flex-1 flex-col font-serif">
      {/* Hero */}
      <div className="relative h-[420px] w-full bg-accentDeep sm:h-[540px]">
        <div className="absolute inset-0 overflow-hidden">
          <SiteImage
            folder="blog"
            file="Blog_Community-02.png"
            alt=""
            label={L('Background: floating digital displays', '背景：漂浮的数字屏幕')}
            className="h-full w-full"
            priority
          />
        </div>
        <div className="absolute inset-x-0 bottom-0 px-6">
          <div className="mx-auto w-full max-w-6xl">
            <div className="w-full max-w-xl translate-y-6 bg-accent px-8 py-6 shadow-lg sm:translate-y-10">
              <p className="text-lg font-bold leading-snug text-paper sm:text-xl">
                {L('Real stories, real discussions, real results.', '真实的故事，真实的讨论，真实的结果。')}
              </p>
              <p className="mt-2 text-lg font-bold leading-snug text-paper sm:text-xl">
                {L(
                  'This is where our patients speak, our team listens, and the truth about what we do is written every day — by the people who live it.',
                  '这里是患者发声、我们团队倾听的地方——关于我们所做之事的真相，每天都由亲身经历的人书写。',
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-graySoft">
        <div className="mx-auto w-full max-w-6xl px-6 pb-16 pt-16 sm:pt-20">
          <h1 className="text-2xl font-bold text-ink">{L('Instructions', '使用说明')}</h1>
          <p className="mt-4 text-justify text-base leading-relaxed text-ink">
            {L(
              'Welcome to our Blog & Community. Use the filters below to explore patient experiences, treatment updates, scientific insights, and community discussions.',
              '欢迎来到我们的博客与社区。使用下方的筛选功能，探索患者经历、治疗动态、科学见解及社区讨论。',
            )}
          </p>
          <p className="mt-2 text-justify text-base leading-relaxed text-ink">
            {L('Select a category, a disease (or both), then click Go. Results will appear below.', '选择一个分类、一个病症（或两者都选），然后点击"前往"。结果将显示在下方。')}
          </p>

          {/* Category cards */}
          <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
            {CATEGORIES.map((cat) => (
              <div key={cat.file} className="flex flex-col items-center text-center">
                <div className="relative h-32 w-32 overflow-hidden rounded-full sm:h-40 sm:w-40">
                  <SiteImage
                    folder="blog"
                    file={cat.file}
                    alt=""
                    label={L(cat.title_en, cat.title_zh)}
                    className="h-full w-full"
                    sizes="160px"
                  />
                </div>
                <h3 className="mt-4 text-lg font-bold text-ink">{L(cat.title_en, cat.title_zh)}</h3>
                <div className="mt-2 w-12 border-b border-line" />
                <p className="mt-3 text-sm leading-relaxed text-ink">{L(cat.desc_en, cat.desc_zh)}</p>
              </div>
            ))}
          </div>

          {/* Moderation notice */}
          <div className="mt-12 bg-accent px-6 py-6 sm:px-10 sm:py-8">
            <p className="text-center text-base leading-relaxed text-paper">
              {L('All community posts are moderated before publication. For personal medical guidance, please use our ', '所有社区帖子在发布前均经过审核。如需个人医疗指导，请使用我们的')}
              <Link href="/apply-for-treatment" className="font-bold text-accentSoft hover:underline">
                {L('Apply for Treatment', '申请治疗')}
              </Link>
              {L(' page — the community is not a substitute for a professional case review.', '页面——社区讨论不能替代专业的病例评估。')}
            </p>
          </div>
        </div>
      </div>

      {/* Community Discussions */}
      <div className="mx-auto w-full max-w-6xl px-6 py-16">
        <h2 className="text-2xl font-bold text-ink">{L('Community Discussions', '社区讨论')}</h2>
        <p className="mt-4 text-justify text-base leading-relaxed text-ink">
          {L(
            'The Community is a space for honest conversation. Patients share their experiences. They support each other. They ask questions. And sometimes, they talk about diseases we don\u2019t yet treat.',
            '社区是一个坦诚交流的空间。患者在这里分享经历、互相支持、提出问题。有时，他们也会谈到我们尚未开展治疗的病症。',
          )}
        </p>
        <p className="mt-3 text-justify text-base leading-relaxed text-ink">
          {L(
            'We encourage that. If your condition is not on our list, start a discussion. Others may join. Our team will listen quietly, collect input, and — when the time is right — begin exploring new protocols behind the scenes.',
            '我们鼓励这样做。如果您的病症不在我们的列表中，欢迎发起讨论。也许会有其他人加入。我们的团队会默默倾听、收集意见，并在时机成熟时，在幕后开始探索新的治疗方案。',
          )}
        </p>

        <div className="mt-12 flex flex-col gap-8 sm:flex-row sm:items-start">
          <div className="relative h-96 w-full overflow-hidden sm:h-[480px] sm:w-1/2">
            <SiteImage
              folder="blog"
              file="Blog_Community-04.png"
              alt=""
              label={L('Illustration: a figure surrounded by floating screens', '插图：被漂浮屏幕环绕的人物')}
              className="h-full w-full"
              sizes="(min-width: 640px) 50vw, 100vw"
            />
          </div>
          <div className="sm:w-1/2">
            <SectionTitle>{L('Disease-Specific Discussions', '疾病专属讨论')}</SectionTitle>
            <ul className="flex flex-col gap-2">
              {DISCUSSION_LINKS.map((d) => (
                <li key={d.en} className="flex gap-2 text-base text-ink">
                  <span className="text-accent">•</span>
                  <Link href={d.href} className="hover:text-accent hover:underline">
                    {L(d.en, d.zh)} — {L('Join the conversation →', '加入讨论 →')}
                  </Link>
                </li>
              ))}
              <li className="flex gap-2 text-base text-muted">
                <span className="text-accent">•</span>
                <span>{L('(Full list mirrors the Apply for Treatment page)', '（完整列表与申请治疗页面一致）')}</span>
              </li>
            </ul>

            <div className="mt-8">
              <SectionTitle>{L('Not Yet Listed', '尚未列出')}</SectionTitle>
              <ul className="flex flex-col gap-2">
                <li className="flex gap-2 text-base text-ink">
                  <span className="text-accent">•</span>
                  <span>{L("Start a new discussion for a condition we don't currently treat.", '为我们目前尚未开展治疗的病症发起新讨论。')}</span>
                </li>
                <li className="flex gap-2 text-base text-ink">
                  <span className="text-accent">•</span>
                  <Link href="/contact" className="font-medium text-accent hover:underline">
                    {L('[ Suggest a New Disease → ]', '[ 建议新增病症 → ]')}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <SectionTitle>{L('Important Note', '重要提示')}</SectionTitle>
          <p className="text-justify text-base leading-relaxed text-ink">
            {L(
              'All community posts are moderated for safety and accuracy. Personal medical advice cannot be given in this space. If you are seeking treatment, please submit an application through our Apply for Treatment page — it is free, confidential, and without obligation.',
              '所有社区帖子均经过审核，以确保安全与准确。此空间无法提供个人医疗建议。如果您正在寻求治疗，请通过我们的申请治疗页面提交申请——完全免费、保密，且不构成任何义务。',
            )}
          </p>
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/community-guidelines"
            className="inline-block rounded-full bg-accent px-8 py-4 text-base font-bold text-paper transition-opacity hover:opacity-90"
          >
            {L('Click on this link to read the Community Guidelines.', '点击此链接阅读社区准则。')}
          </Link>
        </div>
      </div>

      {/* Subscribe */}
      <div className="mx-auto w-full max-w-2xl px-6 pb-16 text-center">
        <h2 className="text-2xl font-bold text-ink">{L('Subscribe', '订阅')}</h2>
        <p className="mt-2 text-base text-ink">
          {L('Be notified when new stories, results, or community discussions are posted.', '当有新故事、新结果或新社区讨论发布时，第一时间通知您。')}
        </p>
        <Link
          href="/contact"
          className="mt-6 inline-block rounded-full bg-accent px-8 py-4 text-base font-bold text-paper transition-opacity hover:opacity-90"
        >
          {L('Subscribe →', '订阅 →')}
        </Link>
      </div>

      {/* Filters & Results */}
      <div className="bg-graySoft">
        <div className="mx-auto w-full max-w-2xl px-6 py-16 text-center">
          <h2 className="text-2xl font-bold text-ink">{L('Filters & Results', '筛选与结果')}</h2>
          <p className="mt-2 text-base text-ink">
            {L('Use the filters below to narrow down the content. Choose a category, a disease (or both), then click Refresh.', '使用下方筛选功能缩小内容范围。选择一个分类、一个病症（或两者都选），然后点击"刷新"。')}
          </p>
          <p className="mt-1 text-base text-ink">{L('The results will appear directly below.', '结果将直接显示在下方。')}</p>

          <form action="/blog" method="get" className="mt-10 flex flex-col gap-8 text-left">
            <div>
              <h3 className="text-center text-lg font-bold text-ink">{L('Category', '分类')}</h3>
              <select
                name="category"
                className="mt-3 w-full border border-line bg-paper px-4 py-3 text-base text-ink"
                defaultValue=""
              >
                {CATEGORY_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {L(opt.en, opt.zh)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <h3 className="text-center text-lg font-bold text-ink">{L('Disease', '病症')}</h3>
              <select
                name="disease"
                className="mt-3 w-full border border-line bg-paper px-4 py-3 text-base text-ink"
                defaultValue=""
              >
                {DISEASE_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {L(opt.en, opt.zh)}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="mx-auto rounded-full bg-accent px-10 py-3 text-base font-bold text-paper transition-opacity hover:opacity-90"
            >
              {L('Refresh', '刷新')}
            </button>
          </form>
        </div>
      </div>

      {/* Real results */}
      <div className="mx-auto w-full max-w-5xl px-6 py-16">
        <BlogList posts={posts} />
      </div>
    </div>
  );
}
