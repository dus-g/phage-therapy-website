import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import CaseStudyRowActions from '@/components/admin/CaseStudyRowActions';
import { statusLabel } from '@/lib/caseStudies';

export const dynamic = 'force-dynamic';

export default async function AdminCaseStudiesList() {
  const studies = await prisma.caseStudy.findMany({
    orderBy: { date_created: 'desc' },
    include: { _count: { select: { updates: true } } },
  });

  return (
    <div className="flex flex-1 justify-center px-6 py-14">
      <div className="w-full max-w-3xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="font-serif text-xl text-ink">Case Studies</h1>
          <div className="flex items-center gap-4">
            <Link href="/admin/dashboard" className="text-xs text-muted hover:text-ink">
              ← Dashboard
            </Link>
            <Link
              href="/admin/case-studies/new"
              className="border border-accentDeep bg-accentDeep px-3 py-1.5 text-xs text-paper hover:opacity-90"
            >
              + New Case Study
            </Link>
          </div>
        </div>

        <div className="overflow-x-auto border border-line">
          <table className="w-full text-sm">
            <thead className="bg-accentSoft text-left text-xs uppercase tracking-wide text-muted">
              <tr>
                <th className="px-3 py-2">Title</th>
                <th className="px-3 py-2">Status</th>
                <th className="px-3 py-2">Updates</th>
                <th className="px-3 py-2">Published</th>
              </tr>
            </thead>
            <tbody>
              {studies.map((s: any) => (
                <tr key={s.id} className="border-t border-line hover:bg-accentSoft/50">
                  <td className="px-3 py-2">
                    <Link href={`/admin/case-studies/${s.id}/edit`} className="text-accent hover:underline">
                      {s.title_en}
                    </Link>
                  </td>
                  <td className="px-3 py-2 text-muted">{statusLabel(s.status)}</td>
                  <td className="px-3 py-2 text-muted">
                    <Link href={`/admin/case-studies/${s.id}/updates`} className="hover:underline">
                      {s._count.updates}
                    </Link>
                  </td>
                  <td className="px-3 py-2">
                    <CaseStudyRowActions id={s.id} isPublished={s.is_published} />
                  </td>
                </tr>
              ))}
              {studies.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-3 py-6 text-center text-muted">
                    No case studies yet.
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
