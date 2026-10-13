import { marked } from 'marked';

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 150);
}

marked.setOptions({ breaks: true, gfm: true });

/** Renders admin-authored Markdown to HTML. Only trusted admins write this
 * content (the blog editor is behind /admin login), so this intentionally
 * skips extra sanitization — treat it like any other CMS with a trusted author. */
export function renderMarkdown(markdown: string): string {
  if (!markdown) return '';
  return marked.parse(markdown, { async: false }) as string;
}
