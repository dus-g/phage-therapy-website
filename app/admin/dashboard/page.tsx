import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import LogoutButton from './LogoutButton';

function NavIcon({ path }: { path: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d={path} />
    </svg>
  );
}

const ICONS = {
  caseStudies: 'M9 3v18M4 7h16M4 12h16M4 17h16',
  blog: 'M4 19.5V6a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v13.5M4 19.5A1.5 1.5 0 0 0 5.5 21h11a1.5 1.5 0 0 0 1.5-1.5M4 19.5A1.5 1.5 0 0 1 5.5 18H17M9 8h5m-5 4h5',
};

function ManageTile({ href, label, icon }: { href: string; label: string; icon: string }) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-3 border border-line bg-card px-4 py-3.5 transition-colors hover:border-accent hover:bg-accentSoft"
    >
      <span className="text-muted transition-colors group-hover:text-accentDeep">
        <NavIcon path={icon} />
      </span>
      <span className="text-sm font-medium text-ink transition-colors group-hover:text-accentDeep">{label}</span>
    </Link>
  );
}

export const dynamic = 'force-dynamic';

function ExportCard({
  title,
  count,
  fileCount,
  singleHref,
  batchHref,
  filesHref,
  submissionsHref,
}: {
  title: string;
  count: number;
  fileCount: number;
  singleHref: string;
  batchHref: string;
  filesHref: string;
  submissionsHref: string;
}) {
  return (
    <div className="border border-line bg-card p-5">
      <div className="mb-3 flex items-baseline justify-between">
        <h2 className="font-serif text-base text-ink">{title}</h2>
        <span className="font-mono text-xs text-muted">
          {count.toLocaleString()} rows · {fileCount.toLocaleString()} files
        </span>
      </div>

      <a
        href={submissionsHref}
        className="mb-2 block w-full border border-accent bg-accentSoft px-3 py-2 text-center text-sm text-accentDeep transition-colors hover:bg-accent hover:text-paper"
      >
        View submissions
      </a>

      <div className="flex flex-col gap-2 sm:flex-row">
        <a
          href={singleHref}
          className="flex-1 border border-accentDeep bg-accentDeep px-3 py-2 text-center text-sm text-paper transition-opacity hover:opacity-90"
        >
          .xlsx
        </a>
        <a
          href={batchHref}
          className="flex-1 border border-line px-3 py-2 text-center text-sm text-ink transition-colors hover:border-accent hover:text-accent"
        >
          .zip batches
        </a>
        <a
          href={filesHref}
          className="flex-1 border border-line px-3 py-2 text-center text-sm text-ink transition-colors hover:border-accent hover:text-accent"
        >
          All files (.zip)
        </a>
      </div>

      <details className="mt-2 text-xs text-muted">
        <summary className="cursor-pointer select-none hover:text-ink">What's the difference?</summary>
        <p className="mt-2 leading-relaxed">
          <strong>.xlsx</strong> streams every row into one file (a Data sheet plus a Files sheet
          with a clickable link to each upload) — works at any size, but very large datasets open
          slowly in Excel. <strong>.zip batches</strong> splits it into multiple 50,000-row files
          instead, which opens much faster past a few hundred thousand rows. <strong>All files</strong>{' '}
          downloads the actual uploaded images/PDFs themselves (the Excel only links to where
          they're stored), organized one folder per patient.
        </p>
      </details>
    </div>
  );
}

export default async function AdminDashboard() {
  const [phageCount, phageFileCount, blogCount, caseCount] = await Promise.all([
    prisma.phageTherapySurvey.count(),
    prisma.phageTherapySurveyFile.count(),
    prisma.blogPost.count(),
    prisma.caseStudy.count(),
  ]);

  return (
    <div className="flex flex-1 justify-center px-6 py-10">
      <div className="w-full max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Huoma Biotech" className="h-8 w-8" />
            <h1 className="font-serif text-xl text-ink">Admin Dashboard</h1>
          </div>
          <LogoutButton />
        </div>

        <section className="mb-10">
          <h2 className="mb-3 text-xs font-medium uppercase tracking-wide text-muted">Site Content</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <ManageTile href="/admin/blog" label={`Blog (${blogCount})`} icon={ICONS.blog} />
            <ManageTile href="/admin/case-studies" label={`Case Studies (${caseCount})`} icon={ICONS.caseStudies} />
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-xs font-medium uppercase tracking-wide text-muted">Submissions</h2>
          <div className="flex flex-col gap-4">
            <ExportCard
              title="BacterioPhage Application Form"
              count={phageCount}
              fileCount={phageFileCount}
              singleHref="/api/admin/export/phage-therapy"
              batchHref="/api/admin/export/phage-therapy?mode=batches&size=50000"
              filesHref="/api/admin/export/phage-therapy-files"
              submissionsHref="/admin/submissions/phage-therapy"
            />
          </div>
        </section>
      </div>
    </div>
  );
}
