<?php

namespace App\Console\Commands;

use App\Models\BalanceClient;
use App\Models\ClientAreaCharged;
use App\Models\Payment;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class CollectClients extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'insert:collect-clients';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Collect clients from price of his registered areas';

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

        Log::info('Este es un mensaje de prueba aaaa');

        $clients = ClientAreaCharged::with('area')->get();
        $p = new Payment();
        
        Log::info('Este es un mensaje de prueba 2');

        foreach ($clients as $client)
        {   
            $response = $p->calculate($client->id,$client->area->price,'collect'); 
        }

        Log::info('Este es un mensaje de prueba 3');

        // $this->info('Clientes cobrados exitosamente.');
        
    }
}
