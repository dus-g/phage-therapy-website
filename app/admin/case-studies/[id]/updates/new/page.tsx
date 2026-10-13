import Link from 'next/link';
import CaseStudyUpdateForm from '@/components/admin/CaseStudyUpdateForm';

export default async function NewCaseStudyUpdate({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="flex flex-1 justify-center px-6 py-14">
      <div className="w-full max-w-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="font-serif text-xl text-ink">New Update</h1>
          <Link href={`/admin/case-studies/${id}/updates`} className="text-xs text-muted hover:text-ink">
            ← Back
          </Link>
        </div>
        <CaseStudyUpdateForm caseStudyId={id} />
      </div>
    </div>
  );
}
