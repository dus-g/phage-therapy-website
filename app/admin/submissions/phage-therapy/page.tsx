import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import StatusBadge from '../StatusBadge';

export const dynamic = 'force-dynamic';

export default async function PhageTherapySurveyList({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;

  const where: any = {};
  if (q) {
    where.OR = [
      { patient_name: { contains: q, mode: 'insensitive' as const } },
      { contact_reason: { contains: q, mode: 'insensitive' as const } },
    ];
  }

  const rows = await prisma.phageTherapySurvey.findMany({
    where,
    orderBy: { date_created: 'desc' },
    take: 200,
    select: {
      id: true, patient_name: true, date_of_birth: true, gender: true,
      date_created: true, status: true,
    },
  });

  return (
    <div className="flex flex-1 justify-center px-6 py-14">
      <div className="w-full max-w-4xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="font-serif text-xl text-ink">BacterioPhage Application Form - Submissions</h1>
          <Link href="/admin/dashboard" className="text-xs text-muted hover:text-ink">
            ← Dashboard
          </Link>
        </div>

        <form className="mb-6 flex flex-col gap-2 sm:flex-row">
          <input
            type="text"
            name="q"
            defaultValue={q ?? ''}
            placeholder="Search by patient name or complaint…"
            className="field-input flex-1"
          />
          <button
            type="submit"
            className="border border-line px-4 py-2 text-sm text-ink transition-colors hover:border-accent hover:text-accent"
          >
            Filter
          </button>
        </form>

        <div className="overflow-x-auto border border-line">
          <table className="w-full text-sm">
            <thead className="bg-accentSoft text-left text-xs uppercase tracking-wide text-muted">
              <tr>
                <th className="px-3 py-2">Patient</th>
                <th className="px-3 py-2">DOB</th>
                <th className="px-3 py-2">Gender</th>
                <th className="px-3 py-2">Submitted</th>
                <th className="px-3 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-t border-line hover:bg-accentSoft/50">
                  <td className="px-3 py-2">
                    <Link href={`/admin/submissions/phage-therapy/${r.id}`} className="text-accent hover:underline">
                      {r.patient_name || '(no name)'}
                    </Link>
                  </td>
                  <td className="px-3 py-2 text-muted">{r.date_of_birth || '—'}</td>
                  <td className="px-3 py-2 text-muted">{r.gender || '—'}</td>
                  <td className="px-3 py-2 text-muted">{r.date_created.toLocaleDateString()}</td>
                  <td className="px-3 py-2">
                    <StatusBadge status={r.status} />
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-3 py-6 text-center text-muted">
                    No submissions found.
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
