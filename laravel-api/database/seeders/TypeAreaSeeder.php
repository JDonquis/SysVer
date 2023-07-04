<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use DB;
class TypeAreaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
          $fields = [

            ['name' => 'Gratis'],
            ['name' => 'No Gratis'],
        
         ];   

         DB::table('type_areas')->insert($fields);
    }

}
