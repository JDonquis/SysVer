<?php

namespace App\Models;

use App\Models\AreaCharged;
use App\Models\BalanceClient;
use App\Models\Client;
use App\Models\ClientAreaCharged;
use DB;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    protected $table = "payments";
    protected $fillable = [

        "client_area_charged_id",
        "payment_method_id",
        "amount",
        
    ];

    public function client_area()
    {
        return $this->belongsTo(ClientAreaCharged::class,'client_area_charged_id','id');
    }

    public function calculate($id_client_area,$amount,$action,$id_payment = 0)
    {       
        $balance = BalanceClient::where('client_area_charged_id',$id_client_area)->first();


        if($action == 'payment')
        {   
            $b = $balance->balance + $amount;

            $balance->balance = $b;

            $balance->days = $this->calculate_days($id_client_area,$b);

            $balance->status = $this->calculate_status($b);

            $balance->update();

            return 'Saldo establecido en '.$balance->balance;

        }   
        else if($action == 'destroy')
        {   

            $payment = Payment::where('id',$id_payment)->first();

            $amount = $payment->amount;

            $b = $balance->balance - $amount;

            $balance->balance = $b;

            $balance->days = $this->calculate_days($id_client_area,$b);

            $balance->status = $this->calculate_status($b);

            $balance->update();

            return 'Saldo establecido en '.$balance->balance;   
        }

        else if($action == 'collect')
        {   

            $a = $amount;

            $b = $balance->balance - $a;

            $balance->balance = $b;

            $balance->days = $this->calculate_days($id_client_area,$b);

            $balance->status = $this->calculate_status($b);

            $balance->update();

            return true;   
        }
    }


    public function calculate_days($id,$amount)
    {
        $area = ClientAreaCharged::where('id',$id)->with('area')->first();

        $days = ($amount * 7) / $area->area->price;

        $days = floor($days);

        return $days;
    }

    public function calculate_status($amount)
    {

        if($amount >= 0)
        {   
            // Balance igual a 0
            return 1;
        }
        else if($amount > 0)
        {
            // Balance mayor 0
            return 2;
        }
        else if($amount < 0)
        {
            // Balance menor a 0
            return 3;
        }
    }



}
