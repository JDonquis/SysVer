<?php

namespace App\Models;

use App\Models\Client;
use App\Models\Schedule;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;
use DateTimeInterface;

class HistorialAssistance extends Model
{
    use HasFactory;

    protected $table = "historial_assistances";
    protected $fillable = [

        "client_id",
        "schedule_id",
        "created_at",
        "updated_at"
    ];

    protected $dates = [ 'created_at' , 'updated_at'];

    protected $dateFormat = 'Y-m-d';

    protected function serializeDate(DateTimeInterface $date)
    {
        return $date->format('Y-m-d');
    }

    public function client()
    {
        return $this->belongsTo(Client::class,'client_id','id');
    }

    public function schedule()
    {
        return $this->belongsTo(Schedule::class,'schedule_id','id');
    }

    // public function getCreatedAtAttribute($date)
    // {
    //     return $date->format('Y-m-d');
    // }

    // public function getUpdatedAtAttribute($date)
    // {
    //     return $date->format('Y-m-d');
    // }
}
