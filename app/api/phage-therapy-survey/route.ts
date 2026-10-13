import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const p = await req.json();

    if (!p.patient_name || !p.date_of_birth || !p.gender || !p.contact_reason || !p.current_symptoms) {
      return NextResponse.json({ error: 'Please fill in all required fields.' }, { status: 400 });
    }

    const files: { url?: string; name?: string }[] = Array.isArray(p.files) ? p.files : [];

    const survey = await prisma.phageTherapySurvey.create({
      data: {
        patient_name: String(p.patient_name).slice(0, 160),
        date_of_birth: String(p.date_of_birth).slice(0, 32),
        gender: String(p.gender).slice(0, 32),
        contact_reason: String(p.contact_reason),
        chronic_conditions: String(p.chronic_conditions ?? ''),
        prior_surgeries: String(p.prior_surgeries ?? ''),
        current_symptoms: String(p.current_symptoms),
        diagnostic_tests_done: String(p.diagnostic_tests_done ?? ''),
        latest_test_date: String(p.latest_test_date ?? '').slice(0, 32),
        provisional_diagnosis: String(p.provisional_diagnosis ?? ''),
        lab_results: String(p.lab_results ?? ''),
        bacterial_findings: String(p.bacterial_findings ?? ''),
        current_medications: String(p.current_medications ?? ''),
        prior_antibiotics: String(p.prior_antibiotics ?? ''),
        files: {
          create: files
            .filter((f) => f.url)
            .map((f) => ({
              file_url: String(f.url).slice(0, 256),
              file_name: String(f.name ?? '').slice(0, 128),
            })),
        },
      },
    });

    return NextResponse.json({ id: survey.id }, { status: 201 });
  } catch (err) {
    console.error('bacteriophage application submission failed', err);
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}
