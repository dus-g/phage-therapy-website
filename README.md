# Huoma Biotech — huomaformapp

Two sign-up forms for free treatment assessment — **Eye Disease** and **Psoriasis Vulgaris** —
plus a bilingual **blog** for patient results, and a **custom form builder** for creating any
additional forms you need later, all with the same design, spam protection, and Excel export.
Postgres (Neon) via Prisma, file uploads via Vercel Blob, hidden admin dashboard for everything.

## Structure

```
app/
  page.tsx                    → homepage
  about/page.tsx               → simple About Us page
  blog/page.tsx                → public blog listing (published posts only)
  blog/[slug]/page.tsx        → public blog post detail
  eye-disease/, psoriasis/    → the two fixed forms (EN/ZH) — unchanged, still exactly as before
  forms/page.tsx               → public index of published custom forms
  forms/[slug]/page.tsx       → a custom form, rendered dynamically from its field definitions
  admin/
    login/page.tsx            → hidden login (not linked anywhere in the site)
    dashboard/page.tsx        → counts + Excel export + links to submissions/blog/forms
    submissions/eye-disease/, submissions/psoriasis/  → searchable list + detail view
    blog/                      → create/edit/delete blog posts, publish toggle
    forms/                      → create/edit/delete custom forms, manage fields, view submissions
  api/
    eye-disease/, psoriasis/  → form submission endpoints (captcha + honeypot checked)
    forms/[slug]/              → public submission endpoint for a custom form
    captcha/                   → issues a self-hosted math-question challenge
    upload/                   → Vercel Blob client-upload token route (images + video)
    admin/
      login/, logout/         → session cookie issue/clear
      eye-disease/[id]/status/, psoriasis/[id]/status/  → update review status
      export/eye-disease/, export/psoriasis/            → streamed .xlsx (Data + Files sheets)
      export/eye-disease-files/, export/psoriasis-files/ → real uploaded files as a .zip
      blog/                    → create/update/delete/publish blog posts
      forms/                    → create/update/delete/publish custom forms + their fields,
                                   submission status, and per-form Excel export
middleware.ts                 → gates /admin/* and /api/admin/* behind login
components/
  Header.tsx                  → hamburger menu (Home/Forms/Blog/About) + logo + language toggle
  NavMenu.tsx                  → the slide-in menu panel
  Footer.tsx                  → minimal — just TikTok/WeChat icons + copyright
  LanguageToggle.tsx
  blog/BlogList.tsx, blog/BlogPostView.tsx
  forms/CustomFormView.tsx, forms/FormsList.tsx     → public rendering of custom forms
  admin/BlogForm.tsx, admin/BlogRowActions.tsx
  admin/CustomFormEditor.tsx, admin/CustomFormRowActions.tsx
  form/Section.tsx            → Section / Row / Field / CheckboxField (language-aware)
prisma/
  schema.prisma                → assessments, file tables, blog, and custom forms
lib/
  prisma.ts, uploadFile.ts, i18n.tsx
  crypto.ts                    → shared Web Crypto HMAC sign/verify (Node + Edge compatible)
  auth.ts, session.ts          → admin credential check + signed session cookie
  captcha.ts                   → self-hosted math-question captcha (no external service)
  blog.ts                       → slug generation + Markdown → HTML rendering
  customForms.ts                → field types, slug/key generation, options parsing
  xlsxExport.ts                → streaming Excel/zip export engine (handles any row count)
scripts/
  hash-password.js             → regenerate ADMIN_PASSWORD_HASH for a new password
public/
  logo.png                     → your logo — used in header, homepage, admin login
Dockerfile, docker-compose.yml, .dockerignore
```

## 1. Neon (database)

1. Create a free project at [neon.tech](https://neon.tech).
2. Grab the **pooled** connection string (`DATABASE_URL`) and the **direct** one
   (`DATABASE_URL_DIRECT`).
3. Copy `.env.example` to `.env` and paste both in.

## 2. Vercel Blob (file uploads)

In your Vercel project → **Storage** → **Create Database** → **Blob**. Copy the
`BLOB_READ_WRITE_TOKEN` it gives you into `.env`.

## 3. Admin login

`.env.example` already ships with your requested credentials pre-configured:

- **Email:** `dusangligorov963@gmail.com`
- **Password:** the one you gave me — stored as a bcrypt hash, base64-encoded, in
  `ADMIN_PASSWORD_HASH`. It's base64-encoded specifically so it contains no `$`
  character: both Docker Compose's `.env` parser and Next.js's own `.env` loader treat
  a literal `$` as the start of a variable reference and will silently corrupt a raw
  bcrypt hash (which is full of `$` delimiters) — base64 sidesteps this entirely, so
  the same value works unmodified in `npm run dev`, Docker Compose, and Vercel's
  environment variable UI.
- **SESSION_SECRET** is a random value used to sign the login session cookie — a working
  default is included, but generate your own for real use:
  ```bash
  node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
  ```

To change the password later:
```bash
npm run hash:password -- "your-new-password"
```
paste the printed value into `ADMIN_PASSWORD_HASH` in `.env` — no escaping needed, it
works as-is everywhere.

**Where to log in:** `/admin/login` — this route is not linked anywhere in the site's
navigation, header, or footer. Only people who know the URL (or you) can find it. Once
logged in you land on `/admin/dashboard`, which has "Download .xlsx" and "Download as
batches (.zip)" buttons for each form.

**About the 1,000,000-row question:** the export streams rows out of the database in
pages of 1,000 and writes them straight into the Excel file as it goes — it never holds
the whole dataset in memory, so it works the same whether there are 50 rows or 5 million.
For very large datasets, "Download as batches" is the better option: it splits the export
into multiple 50,000-row `.xlsx` files bundled in one `.zip` (configurable via
`?size=` in the URL), since a single multi-hundred-thousand-row spreadsheet gets slow to
open and scroll through in Excel even though it's technically valid.

**Where are the pictures?** Each `.xlsx` export has two sheets:
- **Data** — one row per form submission, all the answer fields.
- **Files** — one row per uploaded file (diagnostic report or plaque photo), with the
  patient's name and a real clickable link in the `file_url` column that opens the image
  or PDF in your browser.

That link only *points to* the file — Excel doesn't store the image inside the
spreadsheet. To get the actual image/PDF files onto your computer, use the **"Download
all files (.zip)"** button on the dashboard instead — it downloads every real file,
organized into one folder per patient, so you can open and browse them like any other
folder of photos.

## 4. Your logo

Already dropped in at `public/logo.png` and wired into the header, homepage, and admin
login screen. It's also used as the browser tab favicon (`app/icon.png`). To swap it later,
just replace `public/logo.png` (and `app/icon.png` if you want a matching favicon) — no
code changes needed.

## 5. Install & push the schema (local, without Docker)

```bash
npm install
npm run db:push
npm run dev
```

## 6. Run with Docker

This is the recommended way to run it long-term.

```bash
docker compose up --build
```

That builds the image (multi-stage, Next.js "standalone" output, Prisma client baked
in) and starts it on **http://localhost:3000**, reading all config from your `.env` file.

**First-time schema setup** still needs to run once against your Neon database — either
run `npm run db:push` locally (pointed at the same `DATABASE_URL`/`DATABASE_URL_DIRECT`
as your `.env`) before starting the container, or exec into the running container:

```bash
docker compose exec app npx prisma db push
```

**Useful commands:**
```bash
docker compose up -d --build     # build and run in the background
docker compose logs -f app       # tail logs
docker compose down              # stop and remove the container
docker compose exec app sh       # shell into the running container
```

## 7. Deploy to Vercel (alternative to Docker)

1. Push this repo to GitHub, import it at [vercel.com/new](https://vercel.com/new).
2. Add env vars: `DATABASE_URL`, `DATABASE_URL_DIRECT`, `ADMIN_EMAIL`,
   `ADMIN_PASSWORD_HASH`, `SESSION_SECRET`.
3. Storage → Create Database → Blob → connect it (adds `BLOB_READ_WRITE_TOKEN`
   automatically).
4. Deploy. `postinstall` runs `prisma generate` on every build automatically.

## Testing it end-to-end

```bash
# 1. Fill out a form
open http://localhost:3000/eye-disease   # (or just visit it in your browser)

# 2. Confirm it saved
npm run db:studio   # opens Prisma Studio, browse eye_disease_assessment

# 3. Log into the admin dashboard
open http://localhost:3000/admin/login
# sign in with your ADMIN_EMAIL / password

# 4. Export it
# click "Download .xlsx" on the dashboard — should download instantly with your test row
```

## Notes

- **Custom form builder:** `/admin/forms` lets you create entirely new forms — any
  fields you want (short text, long text, number, date, dropdown, checkbox, multiple
  choice, email, phone), each with its own English/Chinese label, marked required or
  not, reorderable with the ↑/↓ buttons. This is a **separate system** from the Eye
  Disease and Psoriasis forms — those two stay exactly as they've always been (they
  have real structured data and dedicated review workflows already built around them);
  custom forms are for anything new you want to add later without needing more code.
  Every custom form automatically gets the same captcha/honeypot spam protection,
  bilingual rendering, review-status workflow, and Excel export as the rest of the site.
- **Blog:** write posts in Markdown from `/admin/blog` — supports separate English and
  Chinese content per post, a cover image, and a gallery of images/videos (handy for
  before/after treatment photos). Posts stay as drafts until you check "Published."
  The public `/blog` only ever shows published posts.
- **Footer social links** (TikTok/WeChat) currently point to `#` placeholders — update
  the `href` values in `components/Footer.tsx` once you have real profile links.

- Session cookie is httpOnly, sameSite=strict, and marked secure in production — it
  can't be read or sent by JavaScript or cross-site requests. Signing uses the Web
  Crypto API (not Node's `crypto` module) specifically so it works identically in both
  the Node.js runtime (API routes) and the Edge runtime (middleware) — mixing the two
  was a real bug earlier in development where logins would succeed but immediately
  bounce back to the login page.
- Password is bcrypt-hashed (never stored or logged in plaintext) and compared with a
  constant-time check on the signature side too.
- `/admin/*` and `/api/admin/*` are both gated by `middleware.ts` — visiting either
  without a valid session redirects (pages) or 401s (API) automatically.
- Every field on both forms is language-aware — the header's EN/中文 toggle switches
  the whole site instantly, no reload, no i18n library, just a small React context.
- One field from the original psoriasis form ("Ebola virus disease") looked like a
  leftover/copy-paste artifact rather than an intended question, so it was left out.
- **Deploying:** use only `git push` to deploy — don't run `vercel`/`vercel --prod`
  directly from this folder. Running both leaves two separate deployment histories
  fighting over the same production alias, which causes exactly the kind of
  intermittent "works, then doesn't" behavior that's a nightmare to debug. If a
  `.vercel/` folder ever appears in this project, delete it.
- **`ADMIN_PASSWORD_HASH` is base64-encoded**, not the raw bcrypt hash — this is
  deliberate (see the Admin login section above) and means you can use the exact same
  `.env` file unmodified for local dev, Docker Compose, and Vercel. Don't "fix" it back
  to a raw `$2a$...` hash; that's what caused login to silently fail before.
