<?php

namespace App\Models;

use App\Models\Area;
use App\Models\Shift;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Schedule extends Model
{
    use HasFactory;

    protected $table = "schedules";

    protected $fillable = [

        "start_shift_id",
        "end_shift_id",
        "area_id",
    ];

    // protected $hidden = ["pivot"];

    public function shift_start()
    {
        return $this->belongsTo(Shift::class,'start_shift_id','id');
    }

    public function shift_end()
    {
        return $this->belongsTo(Shift::class,'end_shift_id','id');
    }

    public function area()
    {
        return $this->belongsTo(Area::class,'area_id','id');
    }

    public function days()
    {
          return $this->belongsToMany(Day::class, 'schedule_days');
    }

    public function get_areas_ids($area_id)
    {
        $schedules = Schedule::select("id")->where("area_id",$area_id)->get()->toArray();
        
        $ids = array();

       foreach ($schedules as $schedule){ array_push($ids, $schedule["id"]); }
        
       return $ids;
    }
}
