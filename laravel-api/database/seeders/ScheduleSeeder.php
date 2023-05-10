<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use DB;

class ScheduleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $fields = [

            ['start_shift_id'=>1, 'end_shift_id'=>1, 'area_id' =>1],
            ['start_shift_id'=>2, 'end_shift_id'=>2, 'area_id' =>1],
            ['start_shift_id'=>3, 'end_shift_id'=>3, 'area_id' =>1],
            ['start_shift_id'=>4, 'end_shift_id'=>4, 'area_id' =>1],
            ['start_shift_id'=>5, 'end_shift_id'=>5, 'area_id' =>1],
            ['start_shift_id'=>6, 'end_shift_id'=>6, 'area_id' =>1],
            ['start_shift_id'=>7, 'end_shift_id'=>7, 'area_id' =>1],
            ['start_shift_id'=>8, 'end_shift_id'=>8, 'area_id' =>1], 
            ['start_shift_id'=>9, 'end_shift_id'=>9, 'area_id' =>1],

         ];   

         DB::table('schedules')->insert($fields);
    }
}
