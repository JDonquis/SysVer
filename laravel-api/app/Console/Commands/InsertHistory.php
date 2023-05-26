<?php

namespace App\Console\Commands;

use App\Models\Assistance;
use App\Models\HistorialAssistance;
use DB;
use Illuminate\Console\Command;
use Carbon\Carbon;

class InsertHistory extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'insert:history-assistance';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Insert new history assistance from assistances table';

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
        $assistances = Assistance::all();
        
        if(count($assistances) != 0)
        {
            
            foreach ($assistances as $assistance)
            {
                DB::table('historial_assistances')->insert(['client_id' => $assistance->client_id, 'schedule_id' => $assistance->schedule_id, 'created_at' => Carbon::now()->format('Y-m-d'), 'updated_at' => Carbon::now()->format('Y-m-d') ] );
            }

            Assistance::truncate();

             $this->info('Datos insertados exitosamente.');
                
        }
        else
            return 0;
    }
}
