<?php

namespace App\Models;

use App\Models\ClientAreaCharged;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DelayedClient extends Model
{
    use HasFactory;

    protected $table = "delayed_clients";

    protected $fillable = [

        'client_area_charged_id',
        'amount',
        'days_late'
    ];

    public function hasDebt($id_client)
    {
        $client_area_charged = ClientAreaCharged::where('client_id',$id_client)->first();

        $debt = DelayedClient::where('client_area_charged_id',$client_area_charged->id)->first();
        
        return $debt;
    }
}
