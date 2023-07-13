<?php

namespace App\Models;

use App\Models\AreaCharged;
use App\Models\BalanceClient;
use App\Models\Client;
use App\Models\ClientAreaCharged;
use App\Models\PaymentMethod;
use DB;
use Carbon\Carbon;
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

    public function payment()
    {
        return $this->belongsTo(PaymentMethod::class,'payment_method_id','id');
    }

    public function calculate($id_client_area,$amount,$action,$id_payment = 0)
    {       
        $balance = BalanceClient::where('client_area_charged_id',$id_client_area)->first();


        if($action == 'payment')
        {   
            $b = $balance->balance + $amount;

            $balance->balance = $b;

            $daysCurrent = $balance->days;

            $balance->days =  $daysCurrent + $this->calculate_days($id_client_area,$amount);

            $balance->status = $this->calculate_status($b);

            $balance->end = Carbon::now()->addDays($balance->days);

            $balance->update();

            return 'Saldo establecido en '.$balance->balance;

        }   
        else if($action == 'destroy')
        {   

            $payment = Payment::where('id',$id_payment)->first();

            $amount = $payment->amount;

            $b = $balance->balance - $amount;

            $balance->balance = $b;

            $daysCurrent = $balance->days;

            $balance->days =  $daysCurrent - $this->calculate_days($id_client_area,$amount);

            $balance->end = Carbon::now()->addDays($balance->days);

            $balance->status = $this->calculate_status($b);

            $balance->update();

            return 'Saldo establecido en '.$balance->balance;   
        }

        else if($action == 'collect')
        {   

            $a = $amount;

            $b = $balance->balance - $a;

            $balance->balance = $b;

            $daysCurrent = $balance->days;

            $balance->days =  $daysCurrent + $this->calculate_days($id_client_area,$a);

            $balance->end = Carbon::now()->addDays($balance->days);

            $balance->status = $this->calculate_status($b);

            $balance->update();

            return true;   
        }
    }


    public function calculate_days($id,$amount)
    {
        $area = ClientAreaCharged::where('id',$id)->with('area')->first();

        $days = $amount / $area->area->price;

        $days = $amount < 0 ? ceil($days) : floor($days);

        $days = $days * 7;

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
