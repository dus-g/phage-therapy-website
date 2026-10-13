import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string; updateId: string }> },
) {
  const { updateId } = await params;

  try {
    const p = await req.json();
    const media = Array.isArray(p.media) ? p.media : [];

    await prisma.$transaction([
      prisma.caseStudyMedia.deleteMany({ where: { update_id: updateId } }),
      prisma.caseStudyUpdate.update({
        where: { id: updateId },
        data: {
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
      }),
    ]);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('case study update save failed', err);
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string; updateId: string }> },
) {
  const { updateId } = await params;
  try {
    await prisma.caseStudyUpdate.delete({ where: { id: updateId } });
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    if (err?.code === 'P2025') {
      return NextResponse.json({ ok: true });
    }
    console.error('case study update delete failed', err);
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}
