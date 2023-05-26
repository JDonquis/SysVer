<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateHistorialPaymentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('historial_payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId("client_area_charged_id")->constrained()->onDelete("cascade")->onUpdate("cascade");
            $table->foreignId("payment_method_id")->constrained()->onDelete("restrict")->onUpdate("cascade");
            $table->integer('amount');
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
        Schema::dropIfExists('historial_payments');
    }
}
