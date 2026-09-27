<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class DocumentCategory extends Model
{
    protected $fillable = ['slug', 'title_mk', 'title_en', 'sort'];

    public function documents(): HasMany
    {
        return $this->hasMany(Document::class)->orderByDesc('year')->orderBy('sort');
    }

    public function title(string $locale): string
    {
        return $locale === 'en' && $this->title_en ? $this->title_en : $this->title_mk;
    }
}
