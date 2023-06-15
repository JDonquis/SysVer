<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use DB;
use Carbon\Carbon;


class ClientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
            $fields = [

            ['code'=> 1111, 'name' => 'Juan', 'last_name' => 'Donquis', 'ci' => '12345679', 'birth_date' => '2002-09-07', 'age' => 20, 'sex' => 'M', 'blood_type_id' => 1, 'weight' => 70, 'height' => 175, 'address' => 'Some Place', 'phone_number' => '00000000000', 'collaboration' => 'none','email' => 'juancho070902@gmail.com','created_at' =>Carbon::now(), 'updated_at' => Carbon::now()],


         ];   

         DB::table('clients')->insert($fields);
    }
}
