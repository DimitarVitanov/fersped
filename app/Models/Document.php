<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Document extends Model
{
    protected $fillable = [
        'document_category_id', 'title_mk', 'title_en', 'file_path',
        'source_url', 'year', 'size_bytes', 'sort', 'published',
    ];

    protected $casts = ['published' => 'boolean'];

    public function category(): BelongsTo
    {
        return $this->belongsTo(DocumentCategory::class, 'document_category_id');
    }

    public function title(string $locale): string
    {
        return $locale === 'en' && $this->title_en ? $this->title_en : $this->title_mk;
    }
}
