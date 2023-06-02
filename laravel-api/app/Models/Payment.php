<?php

namespace App\Models;

use App\Models\AreaCharged;
use App\Models\Client;
use App\Models\ClientAreaCharged;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    protected $table = "payments";
    protected $fillable = [

        "client_area_charged_id",
        "payment_method_id",
        "amount",
        
    ];

    public function client_area()
    {
        return $this->belongsTo(ClientAreaCharged::class,'client_area_charged_id','id');
    }

    // public function calculate_credit_client()
    // {
    //     return $this->belongsTo(ClientAreaCharged::class,'client_area_charged_id','id');
    // }

    // public function client_area()
    // {
    //     return $this->belongsTo(ClientAreaCharged::class,'client_area_charged_id','id');
    // }



}
