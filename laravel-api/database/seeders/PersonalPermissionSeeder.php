<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use DB;

class PersonalPermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
            $fields = [

            ['personal_id' => 1, 'permission_id' => 1,],
            ['personal_id' => 1, 'permission_id' => 2,],
            ['personal_id' => 1, 'permission_id' => 3,],
            ['personal_id' => 1, 'permission_id' => 4,],
            ['personal_id' => 1, 'permission_id' => 5,],
            ['personal_id' => 1, 'permission_id' => 6,],


         ];   

         DB::table('personal_permissions')->insert($fields);
    }
}
