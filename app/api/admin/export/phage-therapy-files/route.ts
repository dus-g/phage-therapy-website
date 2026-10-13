import { prisma } from '@/lib/prisma';
import { createFilesZipStream } from '@/lib/filesZip';
import { nodeStreamToWeb } from '@/lib/xlsxExport';

async function fetchPage(skip: number, take: number) {
  const files = await prisma.phageTherapySurveyFile.findMany({
    skip,
    take,
    orderBy: { date_created: 'asc' },
    include: { survey: { select: { patient_name: true, id: true } } },
  });

  return files.map((f: any) => ({
    url: f.file_url,
    name: f.file_name || `${f.id}.bin`,
    folder: `${(f.survey.patient_name || 'patient').replace(/\s+/g, '_')}_${f.survey.id.slice(-6)}`,
  }));
}

export async function GET() {
  const stream = createFilesZipStream(fetchPage);
  const timestamp = new Date().toISOString().slice(0, 10);
  return new Response(nodeStreamToWeb(stream), {
    headers: {
      'Content-Type': 'application/zip',
      'Content-Disposition': `attachment; filename="bacteriophage-application-files-${timestamp}.zip"`,
    },
  });
}
