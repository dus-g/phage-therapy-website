import { notFound } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import CaseStudyUpdateRowActions from '@/components/admin/CaseStudyUpdateRowActions';

export const dynamic = 'force-dynamic';

export default async function CaseStudyUpdatesList({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const study = await prisma.caseStudy.findUnique({
    where: { id },
    include: { updates: { orderBy: { update_date: 'desc' } } },
  });
  if (!study) notFound();

  return (
    <div className="flex flex-1 justify-center px-6 py-14">
      <div className="w-full max-w-3xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="font-serif text-xl text-ink">{study.title_en}</h1>
            <p className="text-xs text-muted">Progress updates</p>
          </div>
          <div className="flex items-center gap-4">
            <Link href={`/admin/case-studies/${id}/updates/new`} className="border border-accentDeep bg-accentDeep px-3 py-1.5 text-xs text-paper hover:opacity-90">
              + New Update
            </Link>
            <Link href={`/admin/case-studies/${id}/edit`} className="text-xs text-muted hover:text-ink">
              ← Back
            </Link>
          </div>
        </div>

        <div className="overflow-x-auto border border-line">
          <table className="w-full text-sm">
            <thead className="bg-accentSoft text-left text-xs uppercase tracking-wide text-muted">
              <tr>
                <th className="px-3 py-2">Date</th>
                <th className="px-3 py-2">Title</th>
                <th className="px-3 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {study.updates.map((u: any) => (
                <tr key={u.id} className="border-t border-line hover:bg-accentSoft/50">
                  <td className="px-3 py-2 text-muted">{u.update_date.toLocaleDateString()}</td>
                  <td className="px-3 py-2">
                    <Link href={`/admin/case-studies/${id}/updates/${u.id}/edit`} className="text-accent hover:underline">
                      {u.title_en}
                    </Link>
                  </td>
                  <td className="px-3 py-2">
                    <CaseStudyUpdateRowActions caseStudyId={id} updateId={u.id} isPublished={u.is_published} />
                  </td>
                </tr>
              ))}
              {study.updates.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-3 py-6 text-center text-muted">
                    No updates yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
