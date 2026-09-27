<?php

namespace App\Support;

use App\Models\ContentBlock;
use App\Models\Service;
use App\Models\Setting;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Schema;

/**
 * Single gateway for site content: database first (admin-editable),
 * config/content.php as fallback so the site never renders empty.
 */
class SiteContent
{
    public const CACHE_VERSION_KEY = 'sitecontent:v';

    public static function bump(): void
    {
        Cache::increment(self::CACHE_VERSION_KEY);
    }

    protected static function version(): int
    {
        return (int) Cache::rememberForever(self::CACHE_VERSION_KEY, fn () => 1);
    }

    protected static function remember(string $key, \Closure $fn): mixed
    {
        return Cache::remember('sitecontent:'.self::version().':'.$key, 3600, $fn);
    }

    protected static function dbReady(): bool
    {
        static $ready = null;

        return $ready ??= rescue(fn () => Schema::hasTable('content_blocks'), false, false);
    }

    /** Company facts (settings table, fallback config content.company). */
    public static function company(): array
    {
        $config = config('content.company', []);
        if (! self::dbReady()) {
            return $config;
        }

        return self::remember('company', fn () => array_replace(
            $config,
            Setting::get('company', []),
        ));
    }

    /** All sections of a page for a locale, DB blocks overriding config. */
    public static function page(string $locale, string $page): array
    {
        $config = config("content.locales.{$locale}.{$page}", []);
        if (! self::dbReady()) {
            return $config;
        }

        return self::remember("page:{$locale}:{$page}", fn () => array_replace(
            $config,
            ContentBlock::forPage($locale, $page),
        ));
    }

    /** Published services for a locale in front-end shape. */
    public static function services(string $locale): array
    {
        $fallback = array_values(config("content.locales.{$locale}.services.items", []));
        if (! self::dbReady()) {
            return $fallback;
        }

        return self::remember("services:{$locale}", function () use ($locale, $fallback) {
            $rows = Service::query()->locale($locale)->published()->get();

            return $rows->isEmpty() ? $fallback : $rows->map->toFront()->values()->all();
        });
    }

    public static function service(string $locale, string $slug): ?array
    {
        foreach (self::services($locale) as $item) {
            if (($item['slug'] ?? null) === $slug) {
                return $item;
            }
        }

        return null;
    }

    /** Guarded Setting read (empty default pre-migration). */
    public static function setting(string $key, mixed $default = null): mixed
    {
        if (! self::dbReady()) {
            return $default;
        }

        return self::remember("setting:{$key}", fn () => Setting::get($key, $default));
    }

    /** Published news cards for a locale ([] pre-migration). */
    public static function posts(string $locale, ?int $limit = null): \Illuminate\Support\Collection
    {
        if (! self::dbReady()) {
            return collect();
        }

        return \App\Models\Post::query()
            ->where('locale', $locale)->published()
            ->when($limit, fn ($q) => $q->limit($limit))
            ->get();
    }

    /** Published migrated pages, optionally filtered by group(s). */
    public static function sitePages(array $groups = []): \Illuminate\Support\Collection
    {
        if (! self::dbReady()) {
            return collect();
        }

        return \App\Models\SitePage::query()->published()
            ->when($groups, fn ($q) => $q->whereIn('group', $groups))
            ->get();
    }

    /** Document categories with published documents ([] pre-migration). */
    public static function documentCategories(): \Illuminate\Support\Collection
    {
        if (! self::dbReady()) {
            return collect();
        }

        return \App\Models\DocumentCategory::query()
            ->orderBy('sort')
            ->with(['documents' => fn ($q) => $q->where('published', true)])
            ->get();
    }
}
