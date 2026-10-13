import archiver from 'archiver';
import { PassThrough, Readable } from 'stream';

export type FileRef = { url: string; name: string; folder: string };

/**
 * Fetches every file referenced by `fetchPage` and streams them into a single
 * .zip, organized into one folder per record (e.g. per patient). Files are
 * fetched and appended one at a time — never held all in memory together —
 * so this scales the same way whether there are 10 files or 10,000.
 */
export function createFilesZipStream(
  fetchPage: (skip: number, take: number) => Promise<FileRef[]>,
): PassThrough {
  const pass = new PassThrough();
  const archive = archiver('zip', { zlib: { level: 6 } });
  archive.on('error', (err) => pass.destroy(err));
  archive.pipe(pass);

  const PAGE_SIZE = 25;

  (async () => {
    const usedNames = new Set<string>();
    let skip = 0;

    while (true) {
      const files = await fetchPage(skip, PAGE_SIZE);
      if (files.length === 0) break;

      for (const file of files) {
        try {
          const res = await fetch(file.url);
          if (!res.ok || !res.body) continue;

          let entryName = `${file.folder}/${file.name}`;
          let i = 2;
          while (usedNames.has(entryName)) {
            entryName = `${file.folder}/${i}_${file.name}`;
            i += 1;
          }
          usedNames.add(entryName);

          const nodeStream = Readable.fromWeb(res.body as any);
          await new Promise<void>((resolve, reject) => {
            archive.append(nodeStream, { name: entryName });
            nodeStream.on('end', resolve);
            nodeStream.on('error', reject);
          });
        } catch {
          // Skip any single file that fails to fetch — don't fail the whole zip.
        }
      }

      skip += files.length;
    }

    await archive.finalize();
  })().catch((err) => {
    pass.destroy(err instanceof Error ? err : new Error(String(err)));
  });

  return pass;
}
