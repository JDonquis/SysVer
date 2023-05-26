<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use DB;

class PaymentMethod extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
         $fields = [

            ['name' => 'Pago movil'],
            ['name' => 'Efectivo'],
            ['name' => 'Transferencia'],
        
         ];   

         DB::table('payment_methods')->insert($fields);
    }
}
