import { notFound } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import CaseStudyUpdateForm from '@/components/admin/CaseStudyUpdateForm';

export const dynamic = 'force-dynamic';

export default async function EditCaseStudyUpdate({
  params,
}: {
  params: Promise<{ id: string; updateId: string }>;
}) {
  const { id, updateId } = await params;
  const update = await prisma.caseStudyUpdate.findUnique({
    where: { id: updateId },
    include: { media: { orderBy: { sort_order: 'asc' } } },
  });
  if (!update) notFound();

  return (
    <div className="flex flex-1 justify-center px-6 py-14">
      <div className="w-full max-w-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="font-serif text-xl text-ink">Edit Update</h1>
          <Link href={`/admin/case-studies/${id}/updates`} className="text-xs text-muted hover:text-ink">
            ← Back
          </Link>
        </div>
        <CaseStudyUpdateForm caseStudyId={id} initialUpdate={update} />
      </div>
    </div>
  );
}
