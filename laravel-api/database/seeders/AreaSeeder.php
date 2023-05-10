<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use DB;
class AreaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $fields = [

            ['name' => 'Gimnasio','type_area_id' => 2],
            ['name' => 'Artes Marciales','type_area_id' => 1],
            ['name' => 'Yoga','type_area_id' => 1],

         ];   

         DB::table('areas')->insert($fields);
    }
}
