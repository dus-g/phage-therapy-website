import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  try {
    const p = await req.json();

    if (!p.title_en || !p.update_date) {
      return NextResponse.json({ error: 'Title and date are required.' }, { status: 400 });
    }

    const media = Array.isArray(p.media) ? p.media : [];

    const update = await prisma.caseStudyUpdate.create({
      data: {
        case_study_id: id,
        title_en: String(p.title_en).slice(0, 160),
        title_zh: String(p.title_zh ?? '').slice(0, 160),
        content_en: String(p.content_en ?? ''),
        content_zh: String(p.content_zh ?? ''),
        update_date: new Date(p.update_date),
        is_published: Boolean(p.is_published),
        media: {
          create: media
            .filter((m: any) => m?.file_url)
            .map((m: any, i: number) => ({
              media_type: Number(m.media_type) || 0,
              file_url: String(m.file_url).slice(0, 256),
              caption: String(m.caption ?? '').slice(0, 96),
              sort_order: i,
            })),
        },
      },
    });

    return NextResponse.json({ id: update.id }, { status: 201 });
  } catch (err) {
    console.error('case study update create failed', err);
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}
