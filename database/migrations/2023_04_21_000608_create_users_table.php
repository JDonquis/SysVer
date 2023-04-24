<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
     public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name',40);
            $table->string('last_name',40);
            $table->string('ci',9);
            $table->date('birth_date');
            $table->integer('age');
            $table->string('sex',1);
           $table->foreignId('blood_type_id')->constrained()->onDelete("restrict")->onUpdate("restrict");
            $table->integer('weight');
            $table->integer('height');
            $table->string('address',100);
            $table->string('phone_number',11);
            $table->string('collaboration',100);
            $table->timestamps();
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
