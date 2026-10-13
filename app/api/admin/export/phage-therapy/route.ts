import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import {
  col,
  flattenRow,
  createXlsxWithFilesStream,
  createBatchedZipStream,
  nodeStreamToWeb,
} from '@/lib/xlsxExport';
import { STATUS_LABELS } from '@/lib/fieldGroups';

const SCALAR_KEYS = [
  'id', 'patient_name', 'date_of_birth', 'gender',
  'contact_reason',
  'chronic_conditions', 'prior_surgeries',
  'current_symptoms',
  'diagnostic_tests_done', 'latest_test_date', 'provisional_diagnosis',
  'lab_results', 'bacterial_findings',
  'current_medications', 'prior_antibiotics',
  'status', 'date_created', 'date_updated',
];

const DATA_COLUMNS = [...SCALAR_KEYS.map((k) => col(k)), col('file_count', 12)];

const FILES_COLUMNS = [
  col('survey_id', 26),
  col('patient_name', 28),
  col('file_name', 32),
  col('file_url', 60),
  col('date_uploaded', 20),
];

async function fetchPage(skip: number, take: number) {
  const rows = await prisma.phageTherapySurvey.findMany({
    skip,
    take,
    orderBy: { date_created: 'asc' },
    include: { files: true },
  });

  return rows.map((row: any) => {
    const { files, ...rest } = row;
    const dataRow = flattenRow(rest);
    dataRow.status = STATUS_LABELS[row.status] ?? row.status;
    dataRow.file_count = files.length;

    const fileRows = files.map((f: any) => ({
      survey_id: row.id,
      patient_name: row.patient_name,
      file_name: f.file_name,
      file_url: f.file_url,
      date_uploaded: f.date_created,
    }));

    return { dataRow, fileRows };
  });
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const mode = url.searchParams.get('mode');
  const timestamp = new Date().toISOString().slice(0, 10);

  if (mode === 'batches') {
    const chunkSize = Number(url.searchParams.get('size')) || 50000;
    const stream = createBatchedZipStream(
      'bacteriophage-application',
      DATA_COLUMNS,
      () => prisma.phageTherapySurvey.count(),
      async (skip, take) => (await fetchPage(skip, take)).map((r: any) => r.dataRow),
      chunkSize,
    );
    return new Response(nodeStreamToWeb(stream), {
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="bacteriophage-applications-${timestamp}.zip"`,
      },
    });
  }

  const stream = createXlsxWithFilesStream(DATA_COLUMNS, FILES_COLUMNS, fetchPage);
  return new Response(nodeStreamToWeb(stream), {
    headers: {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': `attachment; filename="bacteriophage-applications-${timestamp}.xlsx"`,
    },
  });
}
