'use client';

import { useState } from 'react';
import Image from 'next/image';

/**
 * Renders a photo from /public/images/<folder>/<file> using next/image, so
 * it automatically gets resized copies, WebP/AVIF conversion, lazy loading,
 * and (when priority is set) top-priority loading for hero images.
 *
 * If the file hasn't been uploaded yet, falls back to a labelled placeholder
 * block instead of a broken-image icon. As soon as the real file is dropped
 * into /public/images/<folder> with the matching filename, this renders it
 * automatically — no code changes needed.
 *
 * className controls the SIZE of the image's container (e.g. "h-64 w-full",
 * "absolute inset-0 h-full w-full") exactly like before — the image itself
 * always fills that container via next/image's `fill` mode.
 */
export default function SiteImage({
  folder,
  file,
  alt,
  label,
  className = '',
  priority = false,
  objectPosition = 'center',
  sizes = '100vw',
}: {
  folder: string;
  file: string;
  alt: string;
  label: string;
  className?: string;
  /** Set true only for the single most important above-the-fold image (e.g. a hero background) so it loads first. */
  priority?: boolean;
  /** Where to anchor the crop within the container, e.g. 'top', 'center 20%', '50% 15%'. */
  objectPosition?: string;
  /**
   * Tells Next.js how wide this image actually renders at each breakpoint, so it
   * requests/generates an appropriately-sized file instead of always fetching the
   * full-viewport-width version. Only override the default for images that are NOT
   * full-bleed (e.g. a half-width photo, a small icon, a badge).
   * Example: "(min-width: 640px) 50vw, 100vw" for a photo that's half-width on desktop.
   */
  sizes?: string;
}) {
  const [failed, setFailed] = useState(false);

  const isPositioned = /\b(absolute|relative|fixed|sticky)\b/.test(className);
  const wrapperClassName = isPositioned ? className : `relative ${className}`;

  if (failed) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-accentSoft to-line text-center ${wrapperClassName}`}
      >
        <div className="flex flex-col items-center gap-2 px-4 text-muted">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="3" y="5" width="18" height="14" rx="1.5" />
            <circle cx="8.5" cy="10" r="1.5" />
            <path d="m3 16 5-5 4 4 3-3 6 6" />
          </svg>
          <span className="text-xs leading-snug">{label}</span>
        </div>
      </div>
    );
  }

  return (
    <div className={wrapperClassName}>
      <Image
        src={`/images/${folder}/${file}`}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover"
        style={{ objectPosition }}
        onError={() => setFailed(true)}
      />
    </div>
  );
}
