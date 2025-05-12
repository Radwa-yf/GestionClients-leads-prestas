<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Company extends Model
{
    use HasFactory;
    protected $table = 'company';

    protected $fillable = ['name'];

    public function prestations()
    {
        return $this->hasMany(Prestation::class);
    }
    public function leads()
    {
        return $this->hasMany(Lead::class);
    }
}
