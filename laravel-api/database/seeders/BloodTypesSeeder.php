<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use DB;

class BloodTypesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
            $fields = [

            ['name' => 'O+'],
            ['name' => 'O-'],
            ['name' => 'A+'],
            ['name' => 'A-'],
            ['name' => 'B+'],
            ['name' => 'B-'],
            ['name' => 'AB+'],
            ['name' => 'AB-'],

         ];   

         DB::table('blood_types')->insert($fields);
    }
}
