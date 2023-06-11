<?php

namespace App\Models;

use App\Models\BalanceClient;
use App\Models\ClientAreaCharged;
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

    public function client_area()
    {
          return $this->belongsTo(ClientAreaCharged::class,'client_area_charged_id','id');
    }
}
