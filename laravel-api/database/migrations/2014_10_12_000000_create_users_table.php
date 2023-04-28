<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('last_name');
            $table->string('ci')->unique();
            $table->string('password');
            $table->date('birth_date');
            $table->integer('age');
            $table->string('sex');
            $table->foreignId("blood_type_id")->constrained()->onDelete("restrict")->onUpdate("cascade");
            $table->integer('weight');
            $table->integer('height');
            $table->string('address',100);
            $table->string('phone_number',11);
            $table->string('collaboration',100);           
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
