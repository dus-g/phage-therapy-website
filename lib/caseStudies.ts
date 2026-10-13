export const CASE_STUDY_STATUSES = [
  { value: 0, en: 'Recruiting', zh: '招募中' },
  { value: 1, en: 'In Progress', zh: '进行中' },
  { value: 2, en: 'Completed', zh: '已完成' },
];

export function statusLabel(status: number, lang: 'en' | 'zh' = 'en'): string {
  const s = CASE_STUDY_STATUSES.find((s) => s.value === status);
  if (!s) return lang === 'zh' ? '未知' : 'Unknown';
  return lang === 'zh' ? s.zh : s.en;
}
