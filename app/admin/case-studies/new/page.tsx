import Link from 'next/link';
import CaseStudyForm from '@/components/admin/CaseStudyForm';

export default function NewCaseStudy() {
  return (
    <div className="flex flex-1 justify-center px-6 py-14">
      <div className="w-full max-w-2xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="font-serif text-xl text-ink">New Case Study</h1>
          <Link href="/admin/case-studies" className="text-xs text-muted hover:text-ink">
            ← Back
          </Link>
        </div>
        <CaseStudyForm />
      </div>
    </div>
  );
}
