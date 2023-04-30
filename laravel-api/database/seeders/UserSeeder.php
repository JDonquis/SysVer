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

            ['name' => 'Admin', 'last_name' => 'Admin', 'ci' => '12345678','password' => Hash::make('12345678')],


         ];   

         DB::table('users')->insert($fields);
    }
}


