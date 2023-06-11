<?php

namespace App\Models;

use App\Models\BalanceClient;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BalanceClient extends Model
{
    use HasFactory;

    protected $table = "balance_clients";

    protected $fillable = [

        'client_area_charged_id',
        'balance',
        'days',
        'status'
    ];


}
