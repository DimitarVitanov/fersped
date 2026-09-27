<?php

namespace App\Http\Controllers;

use App\Models\SitePage;
use Inertia\Inertia;
use Inertia\Response;

class CompanyPageController extends Controller
{
    public function __invoke(string $locale, string $slug): Response
    {
        $page = SitePage::query()->published()->where('slug', $slug)->firstOrFail();

        $title = $page->title($locale);
        $body = $page->body($locale);
        abort_if($title === null && $body === null, 404);

        $siblings = SitePage::query()->published()
            ->where('group', $page->group)
            ->where('id', '!=', $page->id)
            ->get()
            ->map(fn ($p) => $p->toCard($locale))
            ->filter(fn ($c) => $c['title'])
            ->values();

        return Inertia::render('CompanyPage', [
            'page' => [
                'group' => $page->group,
                'slug' => $page->slug,
                'title' => $title,
                'body' => $body,
                'hero' => $page->hero_image,
                'untranslated' => $locale === 'en' ? $page->body_en === null : $page->body_mk === null,
            ],
            'siblings' => $siblings,
            'seo' => [
                'title' => $title.' | FERŠPED',
                'description' => mb_substr(trim(strip_tags((string) $body)), 0, 160),
                'canonical' => url("/{$locale}/company/{$slug}"),
                'type' => 'article',
                'alternates' => [
                    'mk' => url("/mk/company/{$slug}"),
                    'en' => url("/en/company/{$slug}"),
                ],
                'jsonld' => [
                    [
                        '@context' => 'https://schema.org',
                        '@type' => 'BreadcrumbList',
                        'itemListElement' => [
                            ['@type' => 'ListItem', 'position' => 1, 'name' => 'FERŠPED', 'item' => url("/{$locale}")],
                            ['@type' => 'ListItem', 'position' => 2, 'name' => $title, 'item' => url("/{$locale}/company/{$slug}")],
                        ],
                    ],
                    [
                        '@context' => 'https://schema.org',
                        '@type' => 'Article',
                        'headline' => $title,
                        'inLanguage' => $locale,
                        'dateModified' => $page->updated_at->toIso8601String(),
                        'author' => ['@id' => url('/').'#organization'],
                        'publisher' => ['@id' => url('/').'#organization'],
                        'mainEntityOfPage' => url("/{$locale}/company/{$slug}"),
                    ],
                ],
            ],
        ]);
    }
}
