import { prisma } from '@/lib/prisma';
import CaseStudyList from '@/components/case-studies/CaseStudyList';

export const dynamic = 'force-dynamic';

export default async function CaseStudiesPage() {
  const studies = await prisma.caseStudy.findMany({
    where: { is_published: true },
    orderBy: { date_created: 'desc' },
    select: {
      id: true, slug: true, title_en: true, title_zh: true,
      condition_en: true, condition_zh: true, summary_en: true, summary_zh: true,
      cover_image_url: true, status: true,
    },
  });

  return (
    <div className="flex flex-1 justify-center px-6 py-14">
      <div className="w-full max-w-3xl">
        <div className="mb-10 text-center">
          <h1 className="font-serif text-2xl text-ink">Case Studies</h1>
          <p className="mt-1 text-sm text-muted">Documented patient progress, month by month</p>
        </div>
        <CaseStudyList studies={studies} />
      </div>
    </div>
  );
}
