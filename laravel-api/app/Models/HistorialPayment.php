<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HistorialPayment extends Model
{
    use HasFactory;

    protected $table = "historial_payments";
    protected $fillable = [

        "client_area_charged_id",
        "payment_method_id",
        "amount",
        "created_at",
        "updated_at"
    ];

    public function client_area()
    {
        return $this->belongsTo(ClientAreaCharged::class,'client_area_charged_id','id');
    }
}
