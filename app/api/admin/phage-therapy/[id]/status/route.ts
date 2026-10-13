import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const p = await req.json();
    const status = Number(p.status);
    if (![0, 1, 2, 3].includes(status)) {
      return NextResponse.json({ error: 'Invalid status.' }, { status: 400 });
    }

    await prisma.phageTherapySurvey.update({ where: { id }, data: { status } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('phage therapy survey status update failed', err);
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}
