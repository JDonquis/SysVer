<?php

namespace App\Models;

use App\Models\AreaCharged;
use App\Models\Day;
use App\Models\Schedule;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Area extends Model
{
    use HasFactory;

    protected $table = 'areas';

    protected $fillable = [
        'name',
        'status',
        'type_area_id'
    ];

    protected $hidden = ['pivot'];

      // public function users()
      // {
      //     return $this->belongsToMany(User::class,'user_areas');
      // }

      public function schedule()
      {
          return $this->hasMany(Schedule::class, 'area_id', 'id');
      }

      public function area_chargeds()
      {
          return $this->hasMany(AreaCharged::class, 'area_id','id');
      }

      public function price()
      {
          return $this->hasMany(AreaCharged::class, 'area_id','id')->select(['price']);
      }

}
