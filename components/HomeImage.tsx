'use client';

import SiteImage from '@/components/SiteImage';

/** Thin wrapper around SiteImage, scoped to /public/images/home/, kept so the homepage's existing usage doesn't need to change. */
export default function HomeImage({
  file,
  alt,
  label,
  className = '',
  priority = false,
  objectPosition = 'center',
  sizes,
}: {
  file: string;
  alt: string;
  label: string;
  className?: string;
  priority?: boolean;
  objectPosition?: string;
  sizes?: string;
}) {
  return (
    <SiteImage
      folder="home"
      file={file}
      alt={alt}
      label={label}
      className={className}
      priority={priority}
      objectPosition={objectPosition}
      sizes={sizes}
    />
  );
}
