import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';

function sanitizeFileName(name: string): string {
  const dotIndex = name.lastIndexOf('.');
  const ext = dotIndex > -1 ? name.slice(dotIndex).toLowerCase() : '';
  const base = (dotIndex > -1 ? name.slice(0, dotIndex) : name)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);
  return `${base || 'file'}${ext}`;
}

// Images only — this goes through the serverless function body, which has a
// ~4.5MB limit on Vercel. Large video uploads still use the existing
// client-direct-to-Blob path in lib/uploadFile.ts.
const MAX_BYTES = 4 * 1024 * 1024;

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'No file provided.' }, { status: 400 });
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json({ error: 'File too large for this upload path.' }, { status: 413 });
    }

    const safeName = sanitizeFileName(file.name);
    const blob = await put(safeName, file, {
      access: 'public',
      addRandomSuffix: true,
    });

    return NextResponse.json({ url: blob.url });
  } catch (err) {
    console.error('upload-proxy failed', err);
    return NextResponse.json({ error: 'Upload failed.' }, { status: 500 });
  }
}
