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
        'type_users',
        'users',


        ]);

        $this->call([

            BloodTypesSeeder::class,
            TypeUserSeeder::class,
            UserSeeder::class,

            
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
