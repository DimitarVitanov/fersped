<?php

namespace Database\Seeders;

use App\Models\ContentBlock;
use App\Models\Service;
use App\Models\Setting;
use Illuminate\Database\Seeder;

/**
 * Push everything from config/content.php into the database so the admin
 * panel controls every section. Config remains only as a safety fallback.
 */
class ConfigContentSeeder extends Seeder
{
    public function run(): void
    {
        Setting::put('company', config('content.company', []));

        foreach (config('content.locales', []) as $locale => $pages) {
            foreach ($pages as $page => $sections) {
                if ($page === 'services') {
                    $this->services($locale, $sections);
                    // intro block is editable content too
                    $sections = ['intro' => $sections['intro'] ?? []];
                }
                $sort = 0;
                foreach ($sections as $key => $data) {
                    ContentBlock::updateOrCreate(
                        ['locale' => $locale, 'page' => $page, 'key' => $key],
                        ['data' => $data, 'label' => ucfirst(str_replace('_', ' ', $key)), 'sort' => $sort++],
                    );
                }
            }
        }
    }

    private function services(string $locale, array $config): void
    {
        $photos = [
            'railway' => '/images/services/railway.webp',
            'road' => '/images/services/road.webp',
            'sea' => '/images/services/sea.webp',
            'air' => '/images/services/air.webp',
            'customs' => '/images/services/customs.webp',
            'logistics' => '/images/services/logistics.webp',
            'insurance' => '/images/services/insurance.webp',
        ];

        $sort = 0;
        foreach ($config['items'] ?? [] as $slug => $item) {
            Service::updateOrCreate(
                ['locale' => $locale, 'slug' => $slug],
                [
                    'icon' => $item['icon'] ?? 'layers',
                    'title' => $item['title'],
                    'tagline' => $item['tagline'] ?? null,
                    'summary' => $item['summary'] ?? null,
                    'description' => $item['description'] ?? [],
                    'features' => $item['features'] ?? [],
                    'image' => $photos[$slug] ?? null,
                    'sort' => $sort++,
                    'published' => true,
                ],
            );
        }
    }
}
