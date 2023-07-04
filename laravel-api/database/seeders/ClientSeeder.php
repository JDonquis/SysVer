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

            ['code'=> 1112, 'name' => 'Jerardo', 'last_name' => 'Dirinot', 'ci' => '30847621', 'birth_date' => '2002-09-07', 'age' => 20, 'sex' => 'M', 'blood_type_id' => 1, 'weight' => 70, 'height' => 170, 'address' => 'Some Place', 'phone_number' => '04125800610', 'collaboration' => 'none','email' => 'jerardo@gmail.com','created_at' =>Carbon::now(), 'updated_at' => Carbon::now()],

           ['code'=> 1113, 'name' => 'Dalexer', 'last_name' => 'Colina', 'ci' => '30847622', 'birth_date' => '2002-09-07', 'age' => 20, 'sex' => 'M', 'blood_type_id' => 1, 'weight' => 70, 'height' => 177, 'address' => 'Some Place', 'phone_number' => '04125800610', 'collaboration' => '12 Hojas','email' => 'mascarito@gmail.com','created_at' =>Carbon::now(), 'updated_at' => Carbon::now()],
           
           ['code'=> 1114, 'name' => 'Jepsenia', 'last_name' => 'Avila', 'ci' => '30847623', 'birth_date' => '2002-09-07', 'age' => 20, 'sex' => 'M', 'blood_type_id' => 1, 'weight' => 70, 'height' => 175, 'address' => 'Some Place', 'phone_number' => '04125800610', 'collaboration' => 'none','email' => 'lajepsi@gmail.com','created_at' =>Carbon::now(), 'updated_at' => Carbon::now()],

           ['code'=> 1115, 'name' => 'Otman', 'last_name' => 'Rodriguez', 'ci' => '30847624', 'birth_date' => '2002-09-07', 'age' => 20, 'sex' => 'M', 'blood_type_id' => 1, 'weight' => 70, 'height' => 175, 'address' => 'Some Place', 'phone_number' => '04125800610', 'collaboration' => 'none','email' => 'otmanch@gmail.com','created_at' =>Carbon::now(), 'updated_at' => Carbon::now()], 


         ];   

         DB::table('clients')->insert($fields);
    }
}
