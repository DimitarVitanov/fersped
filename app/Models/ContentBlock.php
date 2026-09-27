<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContentBlock extends Model
{
    protected $fillable = ['locale', 'page', 'key', 'label', 'data', 'sort'];

    protected $casts = ['data' => 'array'];

    /** All blocks of one page for one locale, keyed by section key. */
    public static function forPage(string $locale, string $page): array
    {
        return static::query()
            ->where('locale', $locale)
            ->where('page', $page)
            ->orderBy('sort')
            ->get()
            ->mapWithKeys(fn ($b) => [$b->key => $b->data])
            ->all();
    }
}
