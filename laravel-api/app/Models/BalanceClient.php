<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BalanceClient extends Model
{
    use HasFactory;

    protected $table = "balance_clients";

    protected $fillable = [

        'client_area_charged_id',
        'balance',
        'days'
    ];

    // public function hasDebt($id_client)
    // {
    //     $client_area_charged = ClientAreaCharged::where('client_id',$id_client)->first();

    //     $status = BalanceClient::where('client_area_charged_id',$client_area_charged->id)->first();
       
        
    //     return $debt;
    // }
}
