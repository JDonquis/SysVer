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
        Schema::create('assistances', function (Blueprint $table) {
             $table->id();
            $table->foreignId('user_area_id')->constrained()->onDelete("restrict")->onUpdate("restrict");
            $table->foreignId('shift_id')->constrained()->onDelete("restrict")->onUpdate("restrict");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('assistances');
    }
};