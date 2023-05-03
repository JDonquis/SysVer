<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Area extends Model
{
    use HasFactory;

    protected $table = 'areas';

    protected $fillable = [
        'name'
    ];

    protected $hidden = ['pivot'];

      public function users()
      {
          return $this->belongsToMany(User::class,'user_areas');
      }
}
