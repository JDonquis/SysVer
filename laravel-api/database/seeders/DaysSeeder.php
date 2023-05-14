<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use DB;
class DaysSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $fields = [

            ['name' => 'Lunes'],
            ['name' => 'Martes'],
            ['name' => 'Miercoles'],
            ['name' => 'Jueves'],
            ['name' => 'Viernes'],
            ['name' => 'Sabado'],
        
         ];   

         DB::table('days')->insert($fields);
    }
}
