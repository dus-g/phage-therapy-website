import ExcelJS from 'exceljs';
import archiver from 'archiver';
import { PassThrough, Readable } from 'stream';

export type Column = { header: string; key: string; width?: number };

/** Turn a snake_case field name into a readable column header. */
export function col(key: string, width = 18): Column {
  const header = key
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
  return { header, key, width };
}

/** Convert Prisma Decimal (and similar) fields into plain numbers for Excel. */
export function flattenRow(row: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(row)) {
    if (v && typeof v === 'object' && typeof (v as any).toNumber === 'function') {
      out[k] = (v as any).toNumber();
    } else {
      out[k] = v;
    }
  }
  return out;
}

export function nodeStreamToWeb(nodeStream: NodeJS.ReadableStream): ReadableStream {
  return Readable.toWeb(nodeStream as Readable) as unknown as ReadableStream;
}

const DB_PAGE_SIZE = 1000;

/**
 * Streams a single .xlsx file built from `fetchPage(skip, take)`, paging through
 * the database so memory use stays flat no matter how many total rows there are.
 * `limit` caps the total rows written (used for chunked/batched exports).
 */
export function createXlsxStream(
  columns: Column[],
  fetchPage: (skip: number, take: number) => Promise<Record<string, unknown>[]>,
  opts: { skipStart?: number; limit?: number } = {},
): PassThrough {
  const pass = new PassThrough();
  const workbook = new ExcelJS.stream.xlsx.WorkbookWriter({ stream: pass, useStyles: false });
  const sheet = workbook.addWorksheet('Data');
  sheet.columns = columns;

  const skipStart = opts.skipStart ?? 0;
  const limit = opts.limit ?? Infinity;

  (async () => {
    let skip = skipStart;
    let written = 0;
    while (written < limit) {
      const take = Math.min(DB_PAGE_SIZE, limit - written);
      const rows = await fetchPage(skip, take);
      if (rows.length === 0) break;
      for (const row of rows) {
        sheet.addRow(row).commit();
      }
      written += rows.length;
      skip += rows.length;
      if (rows.length < take) break;
    }
    sheet.commit();
    await workbook.commit();
  })().catch((err) => {
    pass.destroy(err instanceof Error ? err : new Error(String(err)));
  });

  return pass;
}

/**
 * Streams a .xlsx with two sheets: "Data" (one row per record) and "Files"
 * (one row per uploaded file, with a real clickable hyperlink) — built from
 * the same paginated fetch so it stays memory-flat for any dataset size.
 */
export function createXlsxWithFilesStream(
  dataColumns: Column[],
  filesColumns: Column[],
  fetchPage: (
    skip: number,
    take: number,
  ) => Promise<{ dataRow: Record<string, unknown>; fileRows: Record<string, unknown>[] }[]>,
): PassThrough {
  const pass = new PassThrough();
  const workbook = new ExcelJS.stream.xlsx.WorkbookWriter({ stream: pass, useStyles: false });
  const dataSheet = workbook.addWorksheet('Data');
  dataSheet.columns = dataColumns;
  const filesSheet = workbook.addWorksheet('Files');
  filesSheet.columns = filesColumns;

  (async () => {
    let skip = 0;
    while (true) {
      const rows = await fetchPage(skip, DB_PAGE_SIZE);
      if (rows.length === 0) break;
      for (const { dataRow, fileRows } of rows) {
        dataSheet.addRow(dataRow).commit();
        for (const fr of fileRows) {
          const row = filesSheet.addRow(fr);
          if (typeof fr.file_url === 'string') {
            const cell = row.getCell('file_url');
            cell.value = { text: fr.file_url as string, hyperlink: fr.file_url as string };
          }
          row.commit();
        }
      }
      skip += rows.length;
      if (rows.length < DB_PAGE_SIZE) break;
    }
    dataSheet.commit();
    filesSheet.commit();
    await workbook.commit();
  })().catch((err) => {
    pass.destroy(err instanceof Error ? err : new Error(String(err)));
  });

  return pass;
}

/**
 * Streams a .zip of multiple .xlsx files, each capped at `chunkSize` rows —
 * the practical way to hand back a dataset of hundreds of thousands (or
 * millions) of rows without generating one unwieldy spreadsheet.
 * Chunks are generated and appended one at a time (not in parallel) to keep
 * database load and memory bounded.
 */
export function createBatchedZipStream(
  prefix: string,
  columns: Column[],
  countTotal: () => Promise<number>,
  fetchPage: (skip: number, take: number) => Promise<Record<string, unknown>[]>,
  chunkSize: number,
): PassThrough {
  const pass = new PassThrough();
  const archive = archiver('zip', { zlib: { level: 6 } });
  archive.on('error', (err) => pass.destroy(err));
  archive.pipe(pass);

  (async () => {
    const total = await countTotal();
    const numChunks = Math.max(1, Math.ceil(total / chunkSize));

    for (let i = 0; i < numChunks; i++) {
      const skipStart = i * chunkSize;
      const take = Math.min(chunkSize, total - skipStart);
      if (take <= 0) break;

      const chunkStream = createXlsxStream(columns, fetchPage, { skipStart, limit: take });
      const name = `${prefix}-part-${String(i + 1).padStart(3, '0')}-of-${String(numChunks).padStart(3, '0')}.xlsx`;

      await new Promise<void>((resolve, reject) => {
        archive.append(chunkStream, { name });
        chunkStream.on('end', resolve);
        chunkStream.on('error', reject);
      });
    }

    await archive.finalize();
  })().catch((err) => {
    pass.destroy(err instanceof Error ? err : new Error(String(err)));
  });

  return pass;
}
