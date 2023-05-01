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

            ['name' => 'Gymnasio'],
            ['name' => 'Artes Marciales'],
            ['name' => 'Yoga'],

         ];   

         DB::table('areas')->insert($fields);
    }
}
