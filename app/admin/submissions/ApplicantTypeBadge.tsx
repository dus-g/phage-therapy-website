const COLORS: Record<number, string> = {
  0: 'bg-teal-100 text-teal-800',
  1: 'bg-purple-100 text-purple-800',
};

const LABELS = ['New Applicant', 'Existing Client'];

export default function ApplicantTypeBadge({ applicantType }: { applicantType: number }) {
  return (
    <span className={`rounded px-2 py-0.5 text-xs font-medium ${COLORS[applicantType] ?? COLORS[0]}`}>
      {LABELS[applicantType] ?? 'Unknown'}
    </span>
  );
}
