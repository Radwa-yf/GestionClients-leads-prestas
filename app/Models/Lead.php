<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Lead extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [ 'company_id','customer_id', 'name', 'email', 'phone','sites','status', 'source', 'project','gclid','note', 'valeur_potentielle'];


    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    public function company()
    {
        return $this->belongsTo(Company::class);
    }
    public function notes(): \Illuminate\Database\Eloquent\Relations\MorphMany
    {
        return $this->morphMany(Note::class, 'morphable');
    }
}
