<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Media extends Model
{
    protected $table = 'media';

    protected $fillable = ['path', 'alt', 'mime', 'size_bytes', 'source_url'];
}
