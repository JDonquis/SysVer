<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use DB;

class ClientAreaChargedSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $fields = [

            ['client_id' => 1, 'area_charged_id' => 1],
            ['client_id' => 2, 'area_charged_id' => 1],
            ['client_id' => 3, 'area_charged_id' => 1],
            ['client_id' => 4, 'area_charged_id' => 1],
            ['client_id' => 5, 'area_charged_id' => 1],
            
        
         ];   

         DB::table('client_area_chargeds')->insert($fields);
    }
}
