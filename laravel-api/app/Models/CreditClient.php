<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CreditClient extends Model
{
    use HasFactory;

    protected $table = 'credit_clients';

        protected $fillable = [
        'client_id',
        'credit',
        
    ];

}
