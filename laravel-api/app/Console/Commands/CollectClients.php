<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

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
        

        return 0;
    }
}
