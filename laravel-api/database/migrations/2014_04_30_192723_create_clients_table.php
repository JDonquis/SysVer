<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateClientsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('clients', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique();
            $table->string('name');
            $table->string('last_name');
            $table->string('ci')->unique();
             $table->date('birth_date');
            $table->integer('age');
            $table->string('sex');
            $table->foreignId("blood_type_id")->constrained()->onDelete("restrict")->onUpdate("cascade")->nullable;
            $table->integer('weight')->nullable;
            $table->integer('height')->nullable;
            $table->string('address',100);
            $table->string('phone_number',13)->nullable;
            $table->string('collaboration',100)->nullable;           
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
        Schema::dropIfExists('clients');
    }
}
