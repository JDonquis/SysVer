<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBalanceClientsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('balance_clients', function (Blueprint $table) {
            $table->id();
            $table->foreignId("client_area_charged_id")->constrained()->onDelete("cascade")->onUpdate("cascade");
            $table->integer('balance');
            $table->integer('days');
            $table->integer('status');
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
        Schema::dropIfExists('balance_clients');
    }
}
