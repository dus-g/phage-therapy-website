import { notFound } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import CaseStudyForm from '@/components/admin/CaseStudyForm';

export const dynamic = 'force-dynamic';

export default async function EditCaseStudy({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const study = await prisma.caseStudy.findUnique({ where: { id } });
  if (!study) notFound();

  return (
    <div className="flex flex-1 justify-center px-6 py-14">
      <div className="w-full max-w-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="font-serif text-xl text-ink">Edit Case Study</h1>
          <div className="flex items-center gap-4">
            <Link href={`/admin/case-studies/${study.id}/updates`} className="text-xs text-muted hover:text-ink">
              Manage Updates →
            </Link>
            <Link href="/admin/case-studies" className="text-xs text-muted hover:text-ink">
              ← Back
            </Link>
          </div>
        </div>
        <CaseStudyForm initialStudy={study} />
      </div>
    </div>
  );
}
