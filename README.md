# FERŠPED — corporate website

A fast, SEO-optimized, **bilingual (Macedonian / English)** marketing site for
**FERŠPED AD Skopje** — logistics, transport and freight forwarding since 1968.

Built with **Laravel 13 · Inertia 2 · Vue 3 · Tailwind CSS 4 · Vite**, with
**server-side rendering (SSR)** and the brand's green/teal identity.

---

## Highlights

- **Bilingual** with locale-prefixed URLs (`/mk/...`, `/en/...`). `/` auto-redirects
  to the visitor's preferred language (Accept-Language), defaulting to Macedonian.
- **SEO built-in**, server-rendered for every page:
  - unique `<title>`, meta description & keywords
  - `rel="canonical"` + `hreflang` alternates (mk / en / x-default)
  - Open Graph + Twitter cards (branded 1200×630 OG image)
  - JSON-LD structured data: `LogisticsBusiness`, `WebSite`, `BreadcrumbList`, `Service`
  - `sitemap.xml` (with hreflang) and `robots.txt`
- **Fast**: SSR + code-split Inertia pages, self-hosted Manrope font, optimized
  imagery. Production JS ≈ 68 KB gzip, CSS ≈ 8 KB gzip.
- **Pages**: Home · Services (+ 6 service detail pages) · About · Network · Investors · Contact (working quote form with localized validation).
- All editorial copy lives in one place: [`config/content.php`](config/content.php).

## Requirements

- PHP 8.2+ · Composer
- Node 20+ · npm

## Local development

```bash
composer install
npm install
cp .env.example .env   # if .env is missing
php artisan key:generate

# Two terminals:
npm run dev            # Vite dev server (HMR)
php artisan serve      # http://127.0.0.1:8000
```

Open http://127.0.0.1:8000 → redirects to `/mk`.

## Production build

```bash
npm run build          # builds the client bundle AND the SSR bundle
php artisan config:cache && php artisan route:cache && php artisan view:cache
```

Serve the app with your web server (Nginx/Apache → `public/`) or `php artisan serve`.

### SSR (recommended, optional)

SSR renders the full HTML on the server for the best performance and crawler
coverage. Start the SSR node process alongside PHP:

```bash
php artisan inertia:start-ssr     # keep running (use supervisor/systemd in prod)
```

> The site works **fully without** the SSR process — Inertia falls back to
> client rendering, and **all SEO meta / JSON-LD / hreflang are still
> server-rendered** by Blade. SSR simply adds server-rendered body HTML.

## Editing content

- **Text & translations** (both languages): [`config/content.php`](config/content.php)
- **Company facts** (address, phone, geo, certifications): the `company` array in the same file
- **Images**: [`public/images/`](public/images/) — `hero.jpg`, `about.jpg`,
  `services/{railway,road,sea,air,customs,logistics}.jpg`, `og-default.jpg`
- **Brand colors**: the `@theme` block in [`resources/css/app.css`](resources/css/app.css)

## Deploying to fersped.com.mk

Set in `.env`:

```
APP_ENV=production
APP_DEBUG=false
APP_URL=https://fersped.com.mk
```

`canonical`, `hreflang` and `sitemap.xml` URLs are derived from the request host,
so they resolve to the live domain automatically. After DNS/SSL are live, submit
`https://fersped.com.mk/sitemap.xml` in Google Search Console.

## Notes

- The contact form validates server-side and flashes a localized success message.
  No mailer is configured — submissions are logged (`storage/logs/laravel.log`).
  Wire up `Mail::to(...)` in `PageController@contactStore` and set `MAIL_*` in `.env`
  to receive leads by email.
- Company photography is sourced from Creative-Commons Flickr imagery and the
  brand's own logo; swap any file in `public/images/` to use official company photos.

---

_Images and copy reflect publicly available information about FERŠPED AD Skopje._
