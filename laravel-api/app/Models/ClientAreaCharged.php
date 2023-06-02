<?php

namespace App\Models;

use App\Models\AreaCharged;
use App\Models\Client;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ClientAreaCharged extends Model
{
    use HasFactory;

    protected $table = "client_area_chargeds";

        protected $fillable = [

        "client_id",
        "area_charged_id",        
    ];

    public function client()
    {
        return $this->belongsTo(Client::class,'client_id','id');
    }

    public function area()
    {
        return $this->belongsTo(AreaCharged::class,'area_charged_id','id');
    }

    public function delayed()
    {
          return $this->hasOne(DelayedClient::class,'client_area_charged_id','id');
    }
}
