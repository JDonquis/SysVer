<?php

namespace App\Models;

use App\Models\ClientAreaCharged;
use App\Models\CreditClient;
use App\Models\DelayedClient;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use HasFactory;

    protected $table = 'clients';

        protected $fillable = [
        'code',
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
        'email'

    ];

    protected $hidden = ['pivot'];

      public function last_code()
      {
        return Client::select('code')->latest()->first();
      }

      public function blood_types()
      {
        return $this->belongsTo(BloodType::class,'blood_type_id','id');
      }

      public function areas()
      {
          return $this->belongsToMany(AreaCharged::class,'client_area_chargeds');
      }

      public function client_area()
      {
          return $this->hasMany(ClientAreaCharged::class,'client_id','id');
      }

        
}
