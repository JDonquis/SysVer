<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use DB;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
            $fields = [

            ['name' => 'admin', 'last_name' => 'admin', 'ci' => '12345678', 'password' => Hash::make('12345678'), 'birth_date' => '2002-09-07', 'age' => 20, 'sex' => 'M', 'blood_type_id' => 1, 'weight' => 70, 'height' => 175, 'address' => 'Some Place', 'phone_number' => '00000000000', 'collaboration' => 'none'],


         ];   

         DB::table('users')->insert($fields);
    }
}
