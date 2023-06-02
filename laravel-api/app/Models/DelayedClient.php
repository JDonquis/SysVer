<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DelayedClient extends Model
{
    use HasFactory;

    protected $table = "delayed_clients";
}
