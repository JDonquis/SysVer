<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePersonalPermissionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('personal_permissions', function (Blueprint $table) {
            $table->id();
            $table->foreignId("personal_id")->constrained()->onDelete("cascade")->onUpdate("cascade");
            $table->foreignId("permission_id")->constrained()->onDelete("cascade")->onUpdate("cascade");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('personal_permissions');
    }
}
