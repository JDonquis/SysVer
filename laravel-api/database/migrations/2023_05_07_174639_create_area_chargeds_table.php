<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAreaChargedsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('area_chargeds', function (Blueprint $table) {
            $table->id();
            $table->foreignId("area_id")->constrained()->onDelete("restrict")->onUpdate("cascade");
            $table->string("name");
            $table->integer("price");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('area_chargeds');
    }
}
