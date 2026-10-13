import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const existing = await prisma.blogPost.findUnique({
    where: { id },
    select: { is_published: true, published_at: true },
  });
  if (!existing) return NextResponse.json({ error: 'Not found.' }, { status: 404 });

  const nextPublished = !existing.is_published;

  await prisma.blogPost.update({
    where: { id },
    data: {
      is_published: nextPublished,
      published_at: nextPublished ? (existing.published_at ?? new Date()) : existing.published_at,
    },
  });

  return NextResponse.json({ ok: true, is_published: nextPublished });
}
