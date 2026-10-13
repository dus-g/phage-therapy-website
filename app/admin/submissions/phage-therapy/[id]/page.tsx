import { notFound } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import StatusButtons from '../../StatusButtons';

export const dynamic = 'force-dynamic';

const GROUPS: { title: string; fields: { key: string; label: string; wide?: boolean }[] }[] = [
  {
    title: 'Patient Information',
    fields: [
      { key: 'patient_name', label: "Patient's Name" },
      { key: 'date_of_birth', label: 'Date of Birth' },
      { key: 'gender', label: 'Gender' },
    ],
  },
  {
    title: 'Chief Complaint',
    fields: [{ key: 'contact_reason', label: 'Primary reason for contacting the Center', wide: true }],
  },
  {
    title: 'Medical History',
    fields: [
      { key: 'chronic_conditions', label: 'Chronic medical conditions', wide: true },
      { key: 'prior_surgeries', label: 'Previous surgeries or hospitalizations', wide: true },
    ],
  },
  {
    title: 'Symptoms',
    fields: [{ key: 'current_symptoms', label: 'Current symptoms or complaints', wide: true }],
  },
  {
    title: 'Analysis and Diagnosis',
    fields: [
      { key: 'diagnostic_tests_done', label: 'Laboratory tests or diagnostic procedures performed', wide: true },
      { key: 'latest_test_date', label: 'Date of most recent diagnostic tests' },
      { key: 'provisional_diagnosis', label: 'Specific or provisional diagnosis', wide: true },
    ],
  },
  {
    title: 'Analysis Results',
    fields: [
      { key: 'lab_results', label: 'Lab test / imaging / culture results', wide: true },
      { key: 'bacterial_findings', label: 'Bacterial findings', wide: true },
    ],
  },
  {
    title: 'Medications',
    fields: [
      { key: 'current_medications', label: 'Current medications (dosage & frequency)', wide: true },
      { key: 'prior_antibiotics', label: 'Previously used antibiotics', wide: true },
    ],
  },
];

export default async function PhageTherapySurveyDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const survey = await prisma.phageTherapySurvey.findUnique({ where: { id }, include: { files: true } });
  if (!survey) notFound();

  const data = survey as unknown as Record<string, string>;

  return (
    <div className="flex flex-1 justify-center px-6 py-14">
      <div className="w-full max-w-2xl">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h1 className="font-serif text-xl text-ink">{survey.patient_name || '(no name)'}</h1>
            <p className="text-xs text-muted">Submitted {survey.date_created.toLocaleString()}</p>
          </div>
          <Link href="/admin/submissions/phage-therapy" className="text-xs text-muted hover:text-ink">
            ← Back
          </Link>
        </div>

        <StatusButtons endpoint={`/api/admin/phage-therapy/${survey.id}/status`} current={survey.status} />

        <div className="mt-8 flex flex-col gap-8">
          {GROUPS.map((group) => (
            <div key={group.title} className="border-t border-line pt-6 first:border-t-0 first:pt-0">
              <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-accent">{group.title}</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {group.fields.map((f) => (
                  <div key={f.key} className={f.wide ? 'sm:col-span-2' : undefined}>
                    <div className="field-label">{f.label}</div>
                    <div className="mt-0.5 whitespace-pre-wrap text-sm text-ink">{data[f.key] || '—'}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {survey.files.length > 0 && (
          <div className="mt-8 border-t border-line pt-6">
            <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-accent">Uploaded Files</h2>
            <ul className="flex flex-col gap-2">
              {survey.files.map((f) => (
                <li key={f.id}>
                  <a href={f.file_url} target="_blank" rel="noopener noreferrer" className="text-sm text-accent hover:underline">
                    {f.file_name || f.file_url}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
