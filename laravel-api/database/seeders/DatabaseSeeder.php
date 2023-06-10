<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

use DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->truncateTable([

        'blood_types',
        'type_areas',
        'users',
        'clients',
        'areas',
        'area_chargeds',
        'client_area_chargeds',
        'balance_clients',
        'shifts',
        'days',
        'schedules',
        'schedule_days',
        'payment_methods',
        


        ]);

        $this->call([

            BloodTypesSeeder::class,
            TypeAreaSeeder::class,
            UserSeeder::class,
            AreaSeeder::class,
            ClientSeeder::class,
            AreaChargedSeeder::class,
            ClientAreaChargedSeeder::class,
            BalanceClientSeeder::class,
            ShiftSeeder::class,
            DaysSeeder::class,
            ScheduleSeeder::class,
            ScheduleDaysSeeder::class,
            PaymentMethod::class,

            
        ]);
    }

    protected function truncateTable(array $tables){

        DB::statement('SET FOREIGN_KEY_CHECKS = 0;');
        foreach ($tables as $table)
        {
            DB::table($table)->truncate();
        }
        DB::statement('SET FOREIGN_KEY_CHECKS = 1;');

    }
}
