<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Carbon\Carbon;
use DB;

class BalanceClientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $fields = [

            ['client_area_charged_id' => 1, 'balance' => 0, 'days' => 0, 'status' => 1, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            
        
         ];   

         DB::table('balance_clients')->insert($fields);
    }
}
