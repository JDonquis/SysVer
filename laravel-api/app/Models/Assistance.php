<?php

namespace App\Models;

use App\Models\Client;
use App\Models\Schedule;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Assistance extends Model
{
    use HasFactory;

    protected $table = "assistances";

    public $timestamps = false;

    // protected $hidden = ['pivot'];

    protected $fillable = [

    "client_id",
    "schedule_id"

    ];
    
    public function client()
    {
        return $this->belongsTo(Client::class,'client_id','id');
    }

    public function schedule()
    {
        return $this->belongsTo(Schedule::class,'schedule_id','id');
    }
}
