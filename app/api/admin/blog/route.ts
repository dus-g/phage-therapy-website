import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const p = await req.json();

    if (!p.title_en || !p.slug) {
      return NextResponse.json({ error: 'Title and slug are required.' }, { status: 400 });
    }

    const media = Array.isArray(p.media) ? p.media : [];

    const post = await prisma.blogPost.create({
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
        published_at: p.is_published ? new Date() : null,
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

    return NextResponse.json({ id: post.id }, { status: 201 });
  } catch (err: any) {
    if (err?.code === 'P2002') {
      return NextResponse.json({ error: 'That slug is already in use.' }, { status: 400 });
    }
    console.error('blog create failed', err);
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}
