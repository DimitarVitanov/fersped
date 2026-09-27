<?php

namespace Database\Seeders;

use App\Models\Document;
use App\Models\DocumentCategory;
use App\Models\Media;
use App\Models\Post;
use App\Models\SitePage;
use App\Models\Setting;
use Illuminate\Database\Seeder;

/**
 * Seed 100% of the content migrated from fersped.com.mk
 * (database/content/legacy.json, produced by the migration crawl).
 */
class LegacyContentSeeder extends Seeder
{
    public function run(): void
    {
        $path = database_path('content/legacy.json');
        if (! is_file($path)) {
            $this->command?->warn('legacy.json missing — skipping legacy content.');

            return;
        }

        $data = json_decode(file_get_contents($path), true);

        foreach ($data['site_pages'] ?? [] as $p) {
            SitePage::updateOrCreate(
                ['group' => $p['group'], 'slug' => $p['slug']],
                [
                    'title_mk' => $p['mk']['title'] ?? null,
                    'title_en' => $p['en']['title'] ?? null,
                    'body_mk' => $p['mk']['html'] ?? null,
                    'body_en' => $p['en']['html'] ?? null,
                    'hero_image' => $p['hero'],
                    'sort' => $p['sort'],
                    'published' => $p['published'],
                ],
            );
        }

        foreach ($data['doc_categories'] ?? [] as $c) {
            $cat = DocumentCategory::updateOrCreate(
                ['slug' => $c['slug']],
                ['title_mk' => $c['title_mk'], 'title_en' => $c['title_en'], 'sort' => $c['sort']],
            );
            foreach ($c['docs'] as $d) {
                $abs = public_path($d['file']);
                Document::updateOrCreate(
                    ['document_category_id' => $cat->id, 'file_path' => $d['file'], 'title_mk' => $d['title_mk']],
                    [
                        'title_en' => $d['title_en'] ?? null,
                        'year' => $d['year'],
                        'sort' => $d['sort'],
                        'size_bytes' => is_file($abs) ? filesize($abs) : null,
                        'published' => true,
                    ],
                );
            }
        }

        foreach ($data['posts'] ?? [] as $p) {
            Post::updateOrCreate(
                ['locale' => $p['locale'], 'slug' => $p['slug']],
                [
                    'title' => $p['title'],
                    'excerpt' => $p['excerpt'],
                    'body' => $p['body'],
                    'image' => $p['image'],
                    'published' => true,
                ],
            );
        }

        foreach ($data['media'] ?? [] as $m) {
            Media::updateOrCreate(
                ['path' => $m['path']],
                ['mime' => $m['mime'], 'size_bytes' => $m['size'], 'source_url' => $m['source']],
            );
        }

        if (isset($data['motto'])) {
            Setting::put('motto', $data['motto']);
        }
        if (isset($data['credential_logos'])) {
            Setting::put('credential_logos', $data['credential_logos']);
        }
    }
}
