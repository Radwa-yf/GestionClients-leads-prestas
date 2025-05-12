<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Customer extends Model
{

    use HasFactory, SoftDeletes;

    protected $fillable = [ 'name', 'phone', 'email','address','zip','city','country'];


    public function prestations()
    {
        return $this->hasMany(Prestation::class);
    }

    public function leads()
    {
        return $this->hasMany(Lead::class);
    }

    public function getValueAttribute()
    {
        $value = 0;
        $retention = (int)Option::where('key', 'retention')->first()->value;
        foreach ($this->prestations as $prestation) {
            if($prestation->status === 'Closé') {
                if($prestation->type === 'reparation') {
                    $value += $prestation->price;
                } else {
                    $value += $prestation->price * $retention;
                }
            }
        }
        return $value;
    }

    public function notes(): \Illuminate\Database\Eloquent\Relations\MorphMany
    {
        return $this->morphMany(Note::class, 'morphable');
    }
}
