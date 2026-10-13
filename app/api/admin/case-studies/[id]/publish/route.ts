import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const existing = await prisma.caseStudy.findUnique({
    where: { id },
    select: { is_published: true },
  });
  if (!existing) return NextResponse.json({ error: 'Not found.' }, { status: 404 });

  const next = !existing.is_published;
  await prisma.caseStudy.update({ where: { id }, data: { is_published: next } });

  return NextResponse.json({ ok: true, is_published: next });
}
