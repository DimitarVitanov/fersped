<?php

namespace App\Http\Controllers;

use Illuminate\Http\Response;

class SitemapController extends Controller
{
    public function index(): Response
    {
        $locales = ['mk', 'en'];
        $paths = [''];

        // Static pages
        foreach (['services', 'about', 'network', 'investors', 'news', 'contact'] as $p) {
            $paths[] = $p;
        }

        // Service detail pages
        foreach (\App\Support\SiteContent::services('mk') as $item) {
            $paths[] = 'services/'.$item['slug'];
        }

        // Migrated corporate pages
        foreach (\App\Models\SitePage::query()->published()->pluck('slug') as $slug) {
            $paths[] = "company/{$slug}";
        }

        // News articles
        foreach (\App\Models\Post::query()->where('published', true)->get(['locale', 'slug']) as $post) {
            $paths[] = "news/{$post->slug}";
        }

        $urls = [];
        foreach ($paths as $path) {
            foreach ($locales as $locale) {
                $loc = url("/{$locale}".($path ? "/{$path}" : ''));
                $alternates = [];
                foreach ($locales as $alt) {
                    $alternates[$alt] = url("/{$alt}".($path ? "/{$path}" : ''));
                }
                $alternates['x-default'] = url("/mk".($path ? "/{$path}" : ''));

                $urls[] = [
                    'loc' => $loc,
                    'priority' => $path === '' ? '1.0' : '0.8',
                    'changefreq' => $path === '' ? 'weekly' : 'monthly',
                    'alternates' => $alternates,
                ];
            }
        }

        $xml = view('sitemap', ['urls' => $urls])->render();

        return response($xml, 200, ['Content-Type' => 'application/xml']);
    }
}
