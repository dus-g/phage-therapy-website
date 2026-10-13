import { upload } from '@vercel/blob/client';

/**
 * Vercel Blob's client-upload token is bound to the exact pathname used —
 * if a filename with spaces or other special characters gets encoded even
 * slightly differently between the token-generation step and the actual
 * upload, the token no longer matches and the upload fails with a 400
 * (which the browser then confusingly reports as a CORS error). Stripping
 * to a safe, plain filename avoids this entirely.
 */
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

// Vercel's built-in client-direct Blob upload has a known, currently-active
// platform-side bug (reported widely as of 2026) where fresh uploads can
// hang indefinitely or get silently rejected by CORS on blob.vercel-storage.com,
// with no error surfaced. For anything small enough to fit through a
// serverless function body (~4.5MB), route through our own server instead —
// server-to-Blob calls aren't subject to browser CORS at all, so this bug
// class can't happen there. Only large files (video) still use the
// client-direct path, since it supports up to 200MB vs. the proxy's 4MB cap.
const PROXY_MAX_BYTES = 4 * 1024 * 1024;

export async function uploadFile(file: File) {
  if (file.size <= PROXY_MAX_BYTES) {
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch('/api/upload-proxy', { method: 'POST', body: formData });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(data.error || 'Upload failed.');
    }
    return { url: data.url as string, name: file.name };
  }

  const safeName = sanitizeFileName(file.name);
  const blob = await upload(safeName, file, {
    access: 'public',
    handleUploadUrl: '/api/upload',
  });
  // Keep the original filename for display/captions — only the storage
  // pathname itself needs to be sanitized.
  return { url: blob.url, name: file.name };
}
