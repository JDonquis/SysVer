<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateClientAreaChargedsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('client_area_chargeds', function (Blueprint $table) {
            $table->id();
            $table->foreignId("client_id")->constrained()->onDelete("restrict")->onUpdate("cascade");
            $table->foreignId("area_charged_id")->constrained()->onDelete("restrict")->onUpdate("cascade");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('client_area_chargeds');
    }
}
