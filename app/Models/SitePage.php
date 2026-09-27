<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SitePage extends Model
{
    protected $fillable = [
        'group', 'slug', 'title_mk', 'title_en', 'body_mk', 'body_en',
        'hero_image', 'sort', 'published',
    ];

    protected $casts = ['published' => 'boolean'];

    public function scopePublished($query)
    {
        return $query->where('published', true)->orderBy('sort');
    }

    public function title(string $locale): ?string
    {
        return $locale === 'en' ? ($this->title_en ?? $this->title_mk) : ($this->title_mk ?? $this->title_en);
    }

    public function body(string $locale): ?string
    {
        return $locale === 'en' ? ($this->body_en ?? $this->body_mk) : ($this->body_mk ?? $this->body_en);
    }

    /** Card shape for listings. */
    public function toCard(string $locale): array
    {
        return [
            'group' => $this->group,
            'slug'  => $this->slug,
            'title' => $this->title($locale),
            'href'  => "/{$locale}/company/{$this->slug}",
        ];
    }
}
