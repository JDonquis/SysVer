<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use HasFactory;

    protected $table = 'clients';

        protected $fillable = [
        'name',
        'last_name',
        'ci',
        'birth_date',
        'age',
        'sex',
        'blood_type_id',
        'weight',
        'height',
        'address',
        'phone_number',
        'collaboration',
    ];

      public function blood_types()
      {
        return $this->belongsTo(BloodType::class,'blood_type_id','id');
      }

      public function areas()
      {
          return $this->belongsToMany(Area::class,'client_areas');
      }


}
