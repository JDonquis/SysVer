<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AreaCharged extends Model
{
    use HasFactory;

    protected $table = 'area_chargeds';

        protected $fillable = [
        'name',
        'price'
    ];

    protected $hidden = ['pivot'];

      public function schedule()
      {
          return $this->hasMany(Schedule::class, 'area_id', 'id');
      }

}
