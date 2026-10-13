import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    const p = await req.json();

    await prisma.caseStudy.update({
      where: { id },
      data: {
        slug: String(p.slug).slice(0, 160),
        title_en: String(p.title_en).slice(0, 160),
        title_zh: String(p.title_zh ?? '').slice(0, 160),
        condition_en: String(p.condition_en ?? '').slice(0, 160),
        condition_zh: String(p.condition_zh ?? '').slice(0, 160),
        summary_en: String(p.summary_en ?? '').slice(0, 512),
        summary_zh: String(p.summary_zh ?? '').slice(0, 512),
        cover_image_url: String(p.cover_image_url ?? '').slice(0, 256),
        status: Number(p.status) || 0,
        started_at: p.started_at ? new Date(p.started_at) : null,
        is_published: Boolean(p.is_published),
      },
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    if (err?.code === 'P2002') {
      return NextResponse.json({ error: 'That slug is already in use.' }, { status: 400 });
    }
    console.error('case study update failed', err);
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    await prisma.caseStudy.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    if (err?.code === 'P2025') {
      return NextResponse.json({ ok: true });
    }
    console.error('case study delete failed', err);
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}
