<?php

namespace App\Console\Commands;

use App\Models\HistorialPayment;
use App\Models\Payment;
use Carbon\Carbon;
use DB;
use Illuminate\Console\Command;

class insertHistoryPayment extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'insert:history-payment';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Insert new history payment from payments table';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $payments = Payment::all();
        
        if(count($payments) != 0)
        {
            
            foreach ($payments as $payment)
            {
                DB::table('historial_payments')->insert(['client_area_charged_id' => $payment->client_area_charged_id, 'payment_method_id' => $payment->payment_method_id, 'amount' => $payment->amount, 'created_at' => Carbon::now()->format('Y-m-d'), 'updated_at' => Carbon::now()->format('Y-m-d') ] );
            }

            Payment::truncate();

             $this->info('Datos insertados exitosamente.');
                
        }
        else
            return 0;

    }
}
