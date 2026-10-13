const COLORS: Record<number, string> = {
  0: 'bg-amber-100 text-amber-800',
  1: 'bg-blue-100 text-blue-800',
  2: 'bg-green-100 text-green-800',
  3: 'bg-red-100 text-red-800',
};

const LABELS = ['New', 'Reviewed', 'Approved', 'Rejected'];

export default function StatusBadge({ status }: { status: number }) {
  return (
    <span className={`rounded px-2 py-0.5 text-xs font-medium ${COLORS[status] ?? COLORS[0]}`}>
      {LABELS[status] ?? 'Unknown'}
    </span>
  );
}
