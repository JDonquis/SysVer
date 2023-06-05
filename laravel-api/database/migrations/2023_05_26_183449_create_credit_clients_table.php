<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCreditClientsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('credit_clients', function (Blueprint $table) {
            $table->id();
            $table->foreignId("client_area_charged_id")->constrained()->onDelete("cascade")->onUpdate("cascade");
            $table->integer('credit');
            $table->integer('days_credit');
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
        Schema::dropIfExists('credit_clients');
    }
}
