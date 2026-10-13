import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    const p = await req.json();
    const existing = await prisma.blogPost.findUnique({
      where: { id },
      select: { is_published: true, published_at: true },
    });
    if (!existing) return NextResponse.json({ error: 'Not found.' }, { status: 404 });

    const media = Array.isArray(p.media) ? p.media : [];
    const nowPublishing = Boolean(p.is_published) && !existing.is_published;

    await prisma.$transaction([
      prisma.blogMedia.deleteMany({ where: { post_id: id } }),
      prisma.blogPost.update({
        where: { id },
        data: {
          slug: String(p.slug).slice(0, 160),
          title_en: String(p.title_en).slice(0, 160),
          title_zh: String(p.title_zh ?? '').slice(0, 160),
          excerpt_en: String(p.excerpt_en ?? '').slice(0, 256),
          excerpt_zh: String(p.excerpt_zh ?? '').slice(0, 256),
          content_en: String(p.content_en ?? ''),
          content_zh: String(p.content_zh ?? ''),
          cover_image_url: String(p.cover_image_url ?? '').slice(0, 256),
          is_published: Boolean(p.is_published),
          published_at: nowPublishing ? new Date() : existing.published_at,
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
  } catch (err: any) {
    if (err?.code === 'P2002') {
      return NextResponse.json({ error: 'That slug is already in use.' }, { status: 400 });
    }
    console.error('blog update failed', err);
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    await prisma.blogPost.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    if (err?.code === 'P2025') {
      return NextResponse.json({ ok: true }); // already gone — treat as success
    }
    console.error('blog delete failed', err);
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}
