import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { renderMarkdown } from '@/lib/blog';
import CaseStudyView from '@/components/case-studies/CaseStudyView';

export const dynamic = 'force-dynamic';

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const study = await prisma.caseStudy.findUnique({
    where: { slug },
    include: {
      updates: {
        where: { is_published: true },
        orderBy: { update_date: 'asc' },
        include: { media: { orderBy: { sort_order: 'asc' } } },
      },
    },
  });

  if (!study || !study.is_published) notFound();

  return (
    <CaseStudyView
      title_en={study.title_en}
      title_zh={study.title_zh}
      condition_en={study.condition_en}
      condition_zh={study.condition_zh}
      summary_en={study.summary_en}
      summary_zh={study.summary_zh}
      cover_image_url={study.cover_image_url}
      status={study.status}
      started_at={study.started_at}
      updates={study.updates.map((u: any) => ({
        id: u.id,
        title_en: u.title_en,
        title_zh: u.title_zh,
        html_en: renderMarkdown(u.content_en),
        html_zh: renderMarkdown(u.content_zh),
        update_date: u.update_date,
        media: u.media,
      }))}
    />
  );
}
