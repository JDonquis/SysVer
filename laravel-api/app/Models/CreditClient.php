<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CreditClient extends Model
{
    use HasFactory;

    protected $table = 'credit_clients';

        protected $fillable = [
        'client_area_charged_id',
        'credit',
        'days_credit'
        
    ];

}
