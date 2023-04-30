<?php

namespace App\Models;

use App\Models\BloodType;
use App\Models\TypeUser;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;



    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
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
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

      public function blood_types()
      {
        return $this->belongsTo(BloodType::class,'blood_type_id','id');
      }

      public function type_users()
      {
          return $this->belongsTo(TypeUser::class,'type_user_id','id');
      }



}
