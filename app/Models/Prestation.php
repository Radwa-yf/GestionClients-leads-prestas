<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Prestation extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'company_id', 'customer_id', 'type','sites', 'price','abonnement_duration','keywords', 'recurrence',

    ];

    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }
    public function notes()
    {
        return $this->morphMany(Note::class, 'morphable');
    }
}
