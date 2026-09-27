<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    protected $fillable = [
        'locale', 'slug', 'icon', 'title', 'tagline', 'summary',
        'description', 'features', 'image', 'sort', 'published',
    ];

    protected $casts = [
        'description' => 'array',
        'features' => 'array',
        'published' => 'boolean',
    ];

    public function scopePublished($query)
    {
        return $query->where('published', true);
    }

    public function scopeLocale($query, string $locale)
    {
        return $query->where('locale', $locale)->orderBy('sort');
    }

    /** Shape consumed by the Vue pages (matches the old config array). */
    public function toFront(): array
    {
        return [
            'slug' => $this->slug,
            'icon' => $this->icon,
            'title' => $this->title,
            'tagline' => $this->tagline,
            'summary' => $this->summary,
            'description' => $this->description ?? [],
            'features' => $this->features ?? [],
            'image' => $this->image,
        ];
    }
}
