<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use DB;

class ScheduleDaysSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $fields = [

            ['day_id' => 1,'schedule_id' => 1 ],
            ['day_id' => 1,'schedule_id' => 2 ],
            ['day_id' => 1,'schedule_id' => 3 ],
            ['day_id' => 1,'schedule_id' => 4 ],
            ['day_id' => 1,'schedule_id' => 5 ],
            ['day_id' => 1,'schedule_id' => 6 ],
            ['day_id' => 1,'schedule_id' => 7 ],
            ['day_id' => 1,'schedule_id' => 8 ],
            ['day_id' => 1,'schedule_id' => 9 ],

            ['day_id' => 2,'schedule_id' => 1 ],
            ['day_id' => 2,'schedule_id' => 2 ],
            ['day_id' => 2,'schedule_id' => 3 ],
            ['day_id' => 2,'schedule_id' => 4 ],
            ['day_id' => 2,'schedule_id' => 5 ],
            ['day_id' => 2,'schedule_id' => 6 ],
            ['day_id' => 2,'schedule_id' => 7 ],
            ['day_id' => 2,'schedule_id' => 8 ],
            ['day_id' => 2,'schedule_id' => 9 ],

            ['day_id' => 3,'schedule_id' => 1 ],
            ['day_id' => 3,'schedule_id' => 2 ],
            ['day_id' => 3,'schedule_id' => 3 ],
            ['day_id' => 3,'schedule_id' => 4 ],
            ['day_id' => 3,'schedule_id' => 5 ],
            ['day_id' => 3,'schedule_id' => 6 ],
            ['day_id' => 3,'schedule_id' => 7 ],
            ['day_id' => 3,'schedule_id' => 8 ],
            ['day_id' => 3,'schedule_id' => 9 ],

            ['day_id' => 4,'schedule_id' => 1 ],
            ['day_id' => 4,'schedule_id' => 2 ],
            ['day_id' => 4,'schedule_id' => 3 ],
            ['day_id' => 4,'schedule_id' => 4 ],
            ['day_id' => 4,'schedule_id' => 5 ],
            ['day_id' => 4,'schedule_id' => 6 ],
            ['day_id' => 4,'schedule_id' => 7 ],
            ['day_id' => 4,'schedule_id' => 8 ],
            ['day_id' => 4,'schedule_id' => 9 ],

            ['day_id' => 5,'schedule_id' => 1 ],
            ['day_id' => 5,'schedule_id' => 2 ],
            ['day_id' => 5,'schedule_id' => 3 ],
            ['day_id' => 5,'schedule_id' => 4 ],
            ['day_id' => 5,'schedule_id' => 5 ],
            ['day_id' => 5,'schedule_id' => 6 ],
            ['day_id' => 5,'schedule_id' => 7 ],
            ['day_id' => 5,'schedule_id' => 8 ],
            ['day_id' => 5,'schedule_id' => 9 ],

        
         ];   

         DB::table('schedule_days')->insert($fields);
    }
}
