<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Support\SiteContent;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;

class PageController extends Controller
{
    public function home(): Response
    {
        $locale = app()->getLocale();

        return Inertia::render('Home', [
            'home'     => SiteContent::page($locale, 'home'),
            'services' => SiteContent::services($locale),
            'credentials' => SiteContent::company()['certifications'] ?? [],
            'credentialLogos' => SiteContent::setting('credential_logos', []),
            'motto' => SiteContent::setting('motto', []),
            'posts' => SiteContent::posts($locale, 3)->map(fn ($p) => $this->postCard($p, $locale)),
            'seo' => $this->seo('', 'home', [
                $this->websiteSchema(),
                $this->breadcrumbs([['name' => $this->ui('nav.home'), 'path' => '']]),
            ]),
        ]);
    }

    public function services(): Response
    {
        $locale = app()->getLocale();

        return Inertia::render('Services', [
            'intro'    => SiteContent::page($locale, 'services')['intro'] ?? [],
            'services' => SiteContent::services($locale),
            'seo' => $this->seo('services', 'services', [
                $this->breadcrumbs([
                    ['name' => $this->ui('nav.home'), 'path' => ''],
                    ['name' => $this->ui('nav.services'), 'path' => 'services'],
                ]),
            ]),
        ]);
    }

    public function service(string $locale, string $slug): Response
    {
        $items = SiteContent::services($locale);
        $keys = array_column($items, 'slug');
        $index = array_search($slug, $keys, true);

        abort_if($index === false, 404);

        $service = $items[$index];
        $prev = $items[$index - 1] ?? $items[count($items) - 1];
        $next = $items[$index + 1] ?? $items[0];

        return Inertia::render('ServiceDetail', [
            'service' => $service,
            'related' => [
                'prev' => ['slug' => $prev['slug'], 'title' => $prev['title']],
                'next' => ['slug' => $next['slug'], 'title' => $next['title']],
            ],
            'others' => array_values(array_map(
                fn ($i) => ['slug' => $i['slug'], 'title' => $i['title'], 'icon' => $i['icon'], 'summary' => $i['summary']],
                array_filter($items, fn ($i) => $i['slug'] !== $slug)
            )),
            'seo' => $this->seo("services/{$slug}", null, [
                $this->breadcrumbs([
                    ['name' => $this->ui('nav.home'), 'path' => ''],
                    ['name' => $this->ui('nav.services'), 'path' => 'services'],
                    ['name' => $service['title'], 'path' => "services/{$slug}"],
                ]),
                $this->serviceSchema($service, $slug),
            ], [
                'title'       => $service['title'].' | FERŠPED',
                'description' => $service['summary'],
            ]),
        ]);
    }

    public function about(): Response
    {
        $locale = app()->getLocale();

        $hub = SiteContent::sitePages(['about', 'responsibility', 'sectors'])
            ->groupBy('group')
            ->map(fn ($items) => $items->map(fn ($p) => $p->toCard($locale))->filter(fn ($c) => $c['title'])->values());

        return Inertia::render('About', [
            'about' => SiteContent::page($locale, 'about'),
            'hub' => $hub,
            'seo' => $this->seo('about', 'about', [
                $this->breadcrumbs([
                    ['name' => $this->ui('nav.home'), 'path' => ''],
                    ['name' => $this->ui('nav.about'), 'path' => 'about'],
                ]),
            ]),
        ]);
    }

    public function network(): Response
    {
        $locale = app()->getLocale();

        return Inertia::render('Network', [
            'network' => SiteContent::page($locale, 'network'),
            'hub' => SiteContent::sitePages(['network'])
                ->map(fn ($p) => $p->toCard($locale))->filter(fn ($c) => $c['title'])->values(),
            'seo' => $this->seo('network', 'network', [
                $this->breadcrumbs([
                    ['name' => $this->ui('nav.home'), 'path' => ''],
                    ['name' => $this->ui('nav.network'), 'path' => 'network'],
                ]),
            ]),
        ]);
    }

    public function investors(): Response
    {
        $locale = app()->getLocale();

        $categories = SiteContent::documentCategories()
            ->map(fn ($cat) => [
                'slug'  => $cat->slug,
                'title' => $cat->title($locale),
                'documents' => $cat->documents->map(fn ($d) => [
                    'id'    => $d->id,
                    'title' => $d->title($locale),
                    'year'  => $d->year,
                    'url'   => '/'.ltrim($d->file_path, '/'),
                    'size'  => $d->size_bytes,
                ])->values(),
            ])
            ->filter(fn ($cat) => $cat['documents']->isNotEmpty())
            ->values();

        return Inertia::render('Investors', [
            'investors' => SiteContent::page($locale, 'investors'),
            'documentCategories' => $categories,
            'seo' => $this->seo('investors', 'investors', [
                $this->breadcrumbs([
                    ['name' => $this->ui('nav.home'), 'path' => ''],
                    ['name' => $this->ui('nav.investors'), 'path' => 'investors'],
                ]),
            ]),
        ]);
    }

    public function news(): Response
    {
        $locale = app()->getLocale();

        return Inertia::render('News', [
            'newsPage' => SiteContent::page($locale, 'news'),
            'posts' => SiteContent::posts($locale)->map(fn ($p) => $this->postCard($p, $locale)),
            'seo' => $this->seo('news', 'news', [
                $this->breadcrumbs([
                    ['name' => $this->ui('nav.home'), 'path' => ''],
                    ['name' => $this->ui('nav.news', $locale === 'mk' ? 'Вести' : 'News'), 'path' => 'news'],
                ]),
            ]),
        ]);
    }

    public function newsShow(string $locale, string $slug): Response
    {
        $post = Post::query()->where('locale', $locale)->where('slug', $slug)->published()->firstOrFail();

        $others = Post::query()->where('locale', $locale)->published()
            ->where('id', '!=', $post->id)->limit(3)->get()
            ->map(fn ($p) => $this->postCard($p, $locale));

        return Inertia::render('NewsDetail', [
            'post'   => $this->postCard($post, $locale) + ['body' => $post->body],
            'others' => $others,
            'seo' => $this->seo("news/{$slug}", null, [
                $this->breadcrumbs([
                    ['name' => $this->ui('nav.home'), 'path' => ''],
                    ['name' => $this->ui('nav.news', $locale === 'mk' ? 'Вести' : 'News'), 'path' => 'news'],
                    ['name' => $post->title, 'path' => "news/{$slug}"],
                ]),
                [
                    '@context' => 'https://schema.org',
                    '@type' => 'NewsArticle',
                    'headline' => $post->title,
                    'description' => (string) $post->excerpt,
                    'image' => $post->image ? [url($post->image)] : [],
                    'datePublished' => $post->published_at?->toIso8601String() ?? $post->created_at->toIso8601String(),
                    'dateModified' => $post->updated_at->toIso8601String(),
                    'inLanguage' => $locale,
                    'author' => ['@id' => url('/').'#organization'],
                    'publisher' => ['@id' => url('/').'#organization'],
                    'mainEntityOfPage' => $this->localeUrl($locale, "news/{$slug}"),
                ],
            ], [
                'title'       => $post->title.' | FERŠPED',
                'description' => (string) $post->excerpt,
                'type'        => 'article',
            ]),
        ]);
    }

    public function contact(): Response
    {
        $locale = app()->getLocale();

        return Inertia::render('Contact', [
            'contact'  => SiteContent::page($locale, 'contact'),
            'services' => array_map(
                fn ($i) => ['slug' => $i['slug'], 'title' => $i['title']],
                SiteContent::services($locale)
            ),
            'seo' => $this->seo('contact', 'contact', [
                $this->breadcrumbs([
                    ['name' => $this->ui('nav.home'), 'path' => ''],
                    ['name' => $this->ui('nav.contact'), 'path' => 'contact'],
                ]),
            ]),
        ]);
    }

    public function contactStore(Request $request, string $locale): RedirectResponse
    {
        $messages = app()->getLocale() === 'mk' ? [
            'required' => 'Ова поле е задолжително.',
            'email'    => 'Внесете валидна адреса на е-пошта.',
            'max'      => 'Внесовте премногу знаци.',
        ] : [
            'required' => 'This field is required.',
            'email'    => 'Please enter a valid email address.',
            'max'      => 'This value is too long.',
        ];

        $data = $request->validate([
            'name'    => ['required', 'string', 'max:120'],
            'email'   => ['required', 'email', 'max:180'],
            'phone'   => ['nullable', 'string', 'max:60'],
            'company' => ['nullable', 'string', 'max:160'],
            'service' => ['nullable', 'string', 'max:60'],
            'message' => ['required', 'string', 'max:4000'],
        ], $messages);

        // No mailer configured in this environment — record the lead so nothing is lost.
        Log::channel('single')->info('Contact request', $data);

        return back()->with('success', true);
    }

    /* ----------------------------- helpers ----------------------------- */

    private function ui(string $key, ?string $fallback = null): string
    {
        $ui = SiteContent::page(app()->getLocale(), 'ui');

        return data_get($ui, $key) ?? $fallback ?? $key;
    }

    private function postCard(Post $post, string $locale): array
    {
        return [
            'slug'    => $post->slug,
            'title'   => $post->title,
            'excerpt' => $post->excerpt,
            'image'   => $post->image,
            'date'    => $post->published_at?->locale($locale)->isoFormat('D MMMM YYYY'),
            'href'    => "/{$locale}/news/{$post->slug}",
        ];
    }

    private function seo(string $path, ?string $metaKey, array $jsonld = [], array $overrides = []): array
    {
        $locale = app()->getLocale();
        $meta = $metaKey ? (SiteContent::page($locale, 'meta')[$metaKey] ?? []) : [];

        return array_merge([
            'title'       => $meta['title'] ?? 'FERŠPED',
            'description' => $meta['description'] ?? '',
            'keywords'    => $meta['keywords'] ?? '',
            'canonical'   => $this->localeUrl($locale, $path),
            'og_image'    => asset('images/og-default.jpg'),
            'type'        => 'website',
            'alternates'  => [
                'mk' => $this->localeUrl('mk', $path),
                'en' => $this->localeUrl('en', $path),
            ],
            'jsonld'      => array_merge([$this->organizationSchema()], $jsonld),
        ], $overrides);
    }

    private function localeUrl(string $locale, string $path): string
    {
        $path = trim($path, '/');

        return url("/{$locale}".($path ? "/{$path}" : ''));
    }

    private function organizationSchema(): array
    {
        $company = SiteContent::company();
        $locale = app()->getLocale();

        return [
            '@context' => 'https://schema.org',
            '@type'    => 'LogisticsBusiness',
            '@id'      => url('/').'#organization',
            'name'     => $locale === 'mk' ? $company['legal_name'] : $company['legal_name_en'],
            'alternateName' => 'FERŠPED',
            'url'      => url('/'),
            'logo'     => asset('images/logo.png'),
            'image'    => asset('images/og-default.jpg'),
            'foundingDate' => (string) $company['founded'],
            'email'    => $company['email'],
            'telephone'=> $company['phone'],
            'faxNumber'=> $company['fax'],
            'address'  => [
                '@type' => 'PostalAddress',
                'streetAddress' => $company['street_en'],
                'addressLocality' => $company['city_en'],
                'postalCode' => $company['postal'],
                'addressCountry' => $company['country_code'] ?? 'MK',
            ],
            'geo' => [
                '@type' => 'GeoCoordinates',
                'latitude' => $company['geo']['lat'],
                'longitude' => $company['geo']['lng'],
            ],
            'areaServed' => $company['countries'] ?? ['MK'],
            'sameAs' => [$company['linkedin'], 'https://www.mse.mk/en/issuer/fersped-ad-skopje'],
        ];
    }

    private function websiteSchema(): array
    {
        return [
            '@context' => 'https://schema.org',
            '@type'    => 'WebSite',
            '@id'      => url('/').'#website',
            'url'      => url('/'),
            'name'     => 'FERŠPED',
            'publisher'=> ['@id' => url('/').'#organization'],
            'inLanguage' => app()->getLocale(),
        ];
    }

    private function serviceSchema(array $service, string $slug): array
    {
        return [
            '@context' => 'https://schema.org',
            '@type'    => 'Service',
            'name'     => $service['title'],
            'description' => $service['summary'],
            'serviceType' => $service['title'],
            'provider' => ['@id' => url('/').'#organization'],
            'areaServed' => 'Europe',
            'url'      => $this->localeUrl(app()->getLocale(), "services/{$slug}"),
        ];
    }

    private function breadcrumbs(array $items): array
    {
        $locale = app()->getLocale();

        return [
            '@context' => 'https://schema.org',
            '@type'    => 'BreadcrumbList',
            'itemListElement' => array_map(fn ($item, $i) => [
                '@type' => 'ListItem',
                'position' => $i + 1,
                'name' => $item['name'],
                'item' => $this->localeUrl($locale, $item['path']),
            ], $items, array_keys($items)),
        ];
    }
}
