<?php

namespace App\Models;

use App\Models\Permission;
use Illuminate\Auth\Authenticatable as AuthenticableTrait;
use Illuminate\Contracts\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class Personal extends Model implements Authenticatable
{
    use HasFactory;
     use HasApiTokens;


    protected $table = "personals";

    protected $fillable = [
        'name',
        'last_name',
        'ci',
        'password',
        'birth_date',
        'phone_number',
        'email',
        'age',
        'sex',
        'address',
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

    public function permissions()
    {
        return $this->belongsToMany(Permission::class, 'personal_permissions');
    }

    public function getAuthIdentifierName()
    {
        return 'id';
    }

    public function getAuthIdentifier()
    {
        return $this->id;
    }

    public function getAuthPassword()
    {
        return $this->password;
    }

    public function getRememberToken()
    {
        return $this->remember_token;
    }

    public function setRememberToken($value)
    {
        $this->remember_token = $value;
    }

    public function getRememberTokenName()
    {
        return 'remember_token';
    }

}
