<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;
use App\Models\PaymentMethod;
use DateTimeInterface;

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

    protected $dates = [ 'created_at' , 'updated_at'];

    protected $dateFormat = 'Y-m-d';

    protected function serializeDate(DateTimeInterface $date)
    {
        return $date->format('Y-m-d');
    }

    public function client_area()
    {
        return $this->belongsTo(ClientAreaCharged::class,'client_area_charged_id','id');
    }

    public function payment()
    {
        return $this->belongsTo(PaymentMethod::class,'payment_method_id','id');
    }
}
