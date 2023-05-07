<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use DB;

class AreaChargedSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $fields = [

            ['area_id' => 1, 'name' => 'Gymnasio', 'price'=>2 ],
            
        
         ];   

         DB::table('area_chargeds')->insert($fields);
    }
}
