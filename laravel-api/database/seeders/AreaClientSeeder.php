<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use DB;

class AreaClientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $fields = [

            ['client_id' => 1, 'area_id' => 1],
            ['client_id' => 1, 'area_id' => 2],

         ];   

         DB::table('client_areas')->insert($fields);
    }
}
