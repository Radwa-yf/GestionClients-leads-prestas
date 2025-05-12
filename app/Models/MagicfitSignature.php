<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class MagicfitSignature extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'file_url',
        'link',
        'phoneHuman',
        'phone',
        'email',
        'address',
        'addressLink',
        'facebook',
        'instagram',
        'tiktok',
        'youtube',
        'linkedin',
        'linktree'
    ];
}
