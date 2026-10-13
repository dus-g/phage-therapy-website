'use client';

import { FormEvent, useState } from 'react';
import { useL } from '@/lib/i18n';
import SiteImage from '@/components/SiteImage';
import { uploadFile } from '@/lib/uploadFile';

type SectionField = {
  key: string;
  label_en: string;
  label_zh: string;
  type: 'text' | 'date' | 'select' | 'textarea';
  required?: boolean;
  options?: { value: string; en: string; zh: string }[];
};

type Section = {
  title_en: string;
  title_zh: string;
  fields: SectionField[];
};

const SECTIONS: Section[] = [
  {
    title_en: 'Patient Information',
    title_zh: '患者信息',
    fields: [
      { key: 'patient_name', label_en: "Patient's Name", label_zh: '患者姓名', type: 'text', required: true },
      { key: 'date_of_birth', label_en: 'Date of Birth', label_zh: '出生日期', type: 'date', required: true },
      {
        key: 'gender',
        label_en: 'Gender',
        label_zh: '性别',
        type: 'select',
        required: true,
        options: [
          { value: 'female', en: 'Female', zh: '女' },
          { value: 'male', en: 'Male', zh: '男' },
          { value: 'other', en: 'Other', zh: '其他' },
        ],
      },
    ],
  },
  {
    title_en: 'Chief Complaint',
    title_zh: '主诉',
    fields: [
      {
        key: 'contact_reason',
        label_en: 'What is the primary reason for the patient contacting the Eliava Phage Therapy Center?',
        label_zh: '患者联系 Eliava 噬菌体治疗中心的主要原因是什么？',
        type: 'textarea',
        required: true,
      },
    ],
  },
  {
    title_en: 'Medical History',
    title_zh: '病史',
    fields: [
      {
        key: 'chronic_conditions',
        label_en: 'List any chronic medical conditions the patient has (e.g., diabetes, hypertension).',
        label_zh: '列出患者的任何慢性病（例如糖尿病、高血压）。',
        type: 'textarea',
      },
      {
        key: 'prior_surgeries',
        label_en: 'Any previous surgeries or hospitalizations? Please provide dates and details.',
        label_zh: '是否有既往手术或住院史？请提供日期与详情。',
        type: 'textarea',
      },
    ],
  },
  {
    title_en: 'Symptoms',
    title_zh: '症状',
    fields: [
      {
        key: 'current_symptoms',
        label_en:
          'Describe the current symptoms or complaints. Include onset, duration, severity, and any triggering factors.',
        label_zh: '描述当前的症状或主诉，包括发病时间、持续时间、严重程度及任何诱发因素。',
        type: 'textarea',
        required: true,
      },
    ],
  },
  {
    title_en: 'Analysis and Diagnosis',
    title_zh: '分析与诊断',
    fields: [
      {
        key: 'diagnostic_tests_done',
        label_en: 'Have any laboratory tests or diagnostic procedures been performed? Please list them.',
        label_zh: '是否已进行任何实验室检测或诊断程序？请列出。',
        type: 'textarea',
      },
      {
        key: 'latest_test_date',
        label_en: 'Date of the most recent diagnostic tests',
        label_zh: '最近一次诊断检测的日期',
        type: 'date',
      },
      {
        key: 'provisional_diagnosis',
        label_en: 'Any specific diagnosis or provisional diagnosis made? If so, please provide details.',
        label_zh: '是否已有明确诊断或初步诊断？如有，请提供详情。',
        type: 'textarea',
      },
    ],
  },
  {
    title_en: 'Analysis Results',
    title_zh: '分析结果',
    fields: [
      {
        key: 'lab_results',
        label_en: 'Please provide the results of relevant laboratory tests, imaging studies, and cultures.',
        label_zh: '请提供相关实验室检测、影像学检查及培养结果。',
        type: 'textarea',
      },
      {
        key: 'bacterial_findings',
        label_en: 'Include information about bacterial findings if applicable.',
        label_zh: '如适用，请提供细菌学检测结果信息。',
        type: 'textarea',
      },
    ],
  },
  {
    title_en: 'Medications',
    title_zh: '用药情况',
    fields: [
      {
        key: 'current_medications',
        label_en: 'List all current medications the patient is taking, including dosage and frequency.',
        label_zh: '列出患者当前正在服用的所有药物，包括剂量与频率。',
        type: 'textarea',
      },
      {
        key: 'prior_antibiotics',
        label_en:
          "Have any antibiotics been previously used to treat the patient's condition? If so, provide names and durations.",
        label_zh: '此前是否使用过任何抗生素治疗患者的病情？如有，请提供名称及使用时长。',
        type: 'textarea',
      },
    ],
  },
];

const initialState = Object.fromEntries(
  SECTIONS.flatMap((s) => s.fields).map((f) => [f.key, '']),
) as Record<string, string>;

type UploadedFile = { url: string; name: string };

export default function BacteriophageApplicationPage() {
  const L = useL();
  const [values, setValues] = useState(initialState);
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'submitted' | 'error'>('idle');
  const [error, setError] = useState('');

  function setField(key: string, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  async function handleFilesSelected(fileList: FileList | null) {
    if (!fileList || fileList.length === 0) return;
    setUploading(true);
    setError('');
    try {
      const uploaded: UploadedFile[] = [];
      for (const file of Array.from(fileList)) {
        const { url } = await uploadFile(file);
        uploaded.push({ url, name: file.name });
      }
      setFiles((prev) => [...prev, ...uploaded]);
    } catch {
      setError(L('One or more files failed to upload. Please try again.', '部分文件上传失败，请重试。'));
    } finally {
      setUploading(false);
    }
  }

  function removeFile(url: string) {
    setFiles((prev) => prev.filter((f) => f.url !== url));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus('submitting');
    setError('');
    try {
      const res = await fetch('/api/phage-therapy-survey', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, files }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || L('Something went wrong. Please try again.', '出现问题，请重试。'));
        setStatus('error');
        return;
      }
      setStatus('submitted');
    } catch {
      setError(L('Something went wrong. Please try again.', '出现问题，请重试。'));
      setStatus('error');
    }
  }

  if (status === 'submitted') {
    return (
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-24 text-center font-serif">
        <h1 className="text-2xl font-bold text-ink">{L('Thank you.', '感谢您。')}</h1>
        <p className="mt-4 max-w-md text-base leading-relaxed text-ink">
          {L(
            'Your application has been received. Our team will review it and reach out if we need any further information.',
            '我们已收到您的申请。我们的团队将进行审核，如需更多信息会与您联系。',
          )}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col font-serif">
      {/* Hero */}
      <div className="relative h-[360px] w-full bg-accentDeep sm:h-[480px]">
        <div className="absolute inset-0 overflow-hidden">
          <SiteImage
            folder="bacteriophage-application"
            file="BacterioPhage_Application-02.jpg"
            alt=""
            label={L('Background: bacteriophage illustration', '背景：噬菌体示意图')}
            className="h-full w-full"
            priority
          />
        </div>
      </div>

      <div className="mx-auto w-full max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-bold text-ink">{L('BacterioPhage Application Form', '噬菌体治疗申请表')}</h1>
        <p className="mt-4 text-justify text-base leading-relaxed text-ink">
          {L(
            'Bacteriophage therapy uses bacteriophages — viruses that target and destroy specific bacteria — to treat bacterial infections that cannot be treated with antibiotics, either because no suitable antibiotic exists or because the bacteria has developed antibiotic resistance.',
            '噬菌体疗法利用噬菌体——一种专门针对并消灭特定细菌的病毒——来治疗无法用抗生素治疗的细菌感染，无论是因为没有合适的抗生素，还是因为细菌已对现有抗生素产生耐药性。',
          )}
        </p>
        <p className="mt-3 text-justify text-base leading-relaxed text-ink">
          {L(
            'This form helps us understand the patient\u2019s condition before contacting the Eliava Phage Therapy Center (EPTC). Please fill in as much detail as you can — every field is helpful, but only the ones marked with * are required.',
            '本表单有助于我们在联系 Eliava 噬菌体治疗中心（EPTC）之前，了解患者的病情。请尽量详细填写——每一项信息都有帮助，但仅标有 * 的字段为必填项。',
          )}
        </p>

        <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-10">
          {SECTIONS.map((section) => (
            <div key={section.title_en}>
              <h2 className="text-xl font-bold text-ink">{L(section.title_en, section.title_zh)}</h2>
              <div className="mt-2 border-b border-line" />
              <div className="mt-5 flex flex-col gap-5">
                {section.fields.map((field) => (
                  <div key={field.key}>
                    <label htmlFor={field.key} className="block text-sm font-medium text-ink">
                      {L(field.label_en, field.label_zh)}
                      {field.required && <span className="text-accent"> *</span>}
                    </label>

                    {field.type === 'textarea' && (
                      <textarea
                        id={field.key}
                        value={values[field.key]}
                        onChange={(e) => setField(field.key, e.target.value)}
                        required={field.required}
                        rows={3}
                        className="mt-2 w-full border border-line bg-paper px-3 py-2 text-base text-ink focus:border-accent focus:outline-none"
                      />
                    )}

                    {field.type === 'text' && (
                      <input
                        id={field.key}
                        type="text"
                        value={values[field.key]}
                        onChange={(e) => setField(field.key, e.target.value)}
                        required={field.required}
                        className="mt-2 w-full border border-line bg-paper px-3 py-2 text-base text-ink focus:border-accent focus:outline-none"
                      />
                    )}

                    {field.type === 'date' && (
                      <input
                        id={field.key}
                        type="date"
                        value={values[field.key]}
                        onChange={(e) => setField(field.key, e.target.value)}
                        required={field.required}
                        className="mt-2 w-full border border-line bg-paper px-3 py-2 text-base text-ink focus:border-accent focus:outline-none"
                      />
                    )}

                    {field.type === 'select' && (
                      <select
                        id={field.key}
                        value={values[field.key]}
                        onChange={(e) => setField(field.key, e.target.value)}
                        required={field.required}
                        className="mt-2 w-full border border-line bg-paper px-3 py-2 text-base text-ink focus:border-accent focus:outline-none"
                      >
                        <option value="">{L('Select…', '请选择…')}</option>
                        {field.options?.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {L(opt.en, opt.zh)}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* File uploads */}
          <div>
            <h2 className="text-xl font-bold text-ink">{L('Supporting Documents', '相关文件')}</h2>
            <div className="mt-2 border-b border-line" />
            <p className="mt-4 text-sm text-muted">
              {L(
                'Optional but helpful: lab reports, imaging, culture results, or any other relevant documents. You can select multiple files.',
                '可选但有助于我们评估：化验报告、影像资料、培养结果或其他相关文件。可一次选择多个文件。',
              )}
            </p>

            <label className="mt-4 inline-block cursor-pointer border border-dashed border-line px-4 py-3 text-sm text-muted transition-colors hover:border-accent hover:text-accent">
              {uploading ? L('Uploading…', '上传中…') : L('+ Choose files to upload', '+ 选择要上传的文件')}
              <input
                type="file"
                multiple
                className="hidden"
                disabled={uploading}
                onChange={(e) => {
                  handleFilesSelected(e.target.files);
                  e.target.value = '';
                }}
              />
            </label>

            {files.length > 0 && (
              <ul className="mt-4 flex flex-col gap-2">
                {files.map((f) => (
                  <li key={f.url} className="flex items-center justify-between border border-line px-3 py-2 text-sm">
                    <span className="truncate text-ink">{f.name}</span>
                    <button
                      type="button"
                      onClick={() => removeFile(f.url)}
                      className="ml-3 shrink-0 text-xs text-red-600 hover:underline"
                    >
                      {L('Remove', '移除')}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={status === 'submitting' || uploading}
            className="w-full border border-accentDeep bg-accentDeep py-3 text-base text-paper transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {status === 'submitting' ? L('Submitting…', '提交中…') : L('Submit Application', '提交申请')}
          </button>
        </form>
      </div>
    </div>
  );
}
