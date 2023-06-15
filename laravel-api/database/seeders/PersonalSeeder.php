<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use DB;
use Carbon\Carbon;
class PersonalSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
     public function run()
    {       
            $date = Carbon::create(2002, 9, 7);
            
            $fields = [

            ['name' => 'Admin', 'last_name' => 'Admin', 'ci' => '12345678','password' => Hash::make('12345678'), 'birth_date' => $date, 'phone_number' => '04125800610', 'email' => "test@gmail.com", 'age' => 20, 'address' => "Hospital Coro Falcon", 'sex' => "M", "created_at" => Carbon::now(), "updated_at" => Carbon::now()],


         ];   

         DB::table('personals')->insert($fields);
    }
}
