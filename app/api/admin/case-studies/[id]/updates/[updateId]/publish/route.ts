import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string; updateId: string }> },
) {
  const { updateId } = await params;

  const existing = await prisma.caseStudyUpdate.findUnique({
    where: { id: updateId },
    select: { is_published: true },
  });
  if (!existing) return NextResponse.json({ error: 'Not found.' }, { status: 404 });

  const next = !existing.is_published;
  await prisma.caseStudyUpdate.update({ where: { id: updateId }, data: { is_published: next } });

  return NextResponse.json({ ok: true, is_published: next });
}
