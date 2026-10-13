import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const p = await req.json();

    if (!p.title_en || !p.slug) {
      return NextResponse.json({ error: 'Title and slug are required.' }, { status: 400 });
    }

    const study = await prisma.caseStudy.create({
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
        is_published: false,
      },
    });

    return NextResponse.json({ id: study.id }, { status: 201 });
  } catch (err: any) {
    if (err?.code === 'P2002') {
      return NextResponse.json({ error: 'That slug is already in use.' }, { status: 400 });
    }
    console.error('case study create failed', err);
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}
