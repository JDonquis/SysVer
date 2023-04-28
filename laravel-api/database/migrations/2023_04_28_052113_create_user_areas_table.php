<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserAreasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_areas', function (Blueprint $table) {
            $table->id();
            $table->foreignId("user_id")->constrained()->onDelete("restrict")->onUpdate("cascade");
            $table->foreignId("area_id")->constrained()->onDelete("restrict")->onUpdate("cascade");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user_areas');
    }
}
