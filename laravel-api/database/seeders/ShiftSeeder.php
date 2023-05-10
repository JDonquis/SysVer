<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use DB;
use Carbon\Carbon;;

class ShiftSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $fields = [

            ['start'=> Carbon::parse("7:00 AM")->format('H:i A.'), 'end' => Carbon::parse("8:00 AM")->format('H:i A.')],
            ['start'=> Carbon::parse("8:00 AM")->format('H:i A.'), 'end' => Carbon::parse("9:00 AM")->format('H:i A.')],
            ['start'=> Carbon::parse("9:00 AM")->format('H:i A.'), 'end' => Carbon::parse("10:00 AM")->format('H:i A.')],
            ['start'=> Carbon::parse("10:00 AM")->format('H:i A.'), 'end' => Carbon::parse("11:00 AM")->format('H:i A.')],
            ['start'=> Carbon::parse("2:00 PM")->format('H:i A.'), 'end' => Carbon::parse("3:00 PM")->format('H:i A.')],
            ['start'=> Carbon::parse("3:00 PM")->format('H:i A.'), 'end' => Carbon::parse("4:00 PM")->format('H:i A.')],
            ['start'=> Carbon::parse("4:00 PM")->format('H:i A.'), 'end' => Carbon::parse("5:00 PM")->format('H:i A.')],
            ['start'=> Carbon::parse("5:00 PM")->format('H:i A.'), 'end' => Carbon::parse("6:00 PM")->format('H:i A.')],
            ['start'=> Carbon::parse("6:00 PM")->format('H:i A.'), 'end' => Carbon::parse("7:00 PM")->format('H:i A.')],


         ];   

         DB::table('shifts')->insert($fields);
    }
}
