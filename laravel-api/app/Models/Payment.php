<?php

namespace App\Models;

use App\Models\AreaCharged;
use App\Models\Client;
use App\Models\ClientAreaCharged;
use App\Models\CreditClient;
use App\Models\DelayedClient;
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
        $debt = DelayedClient::where('client_area_charged_id',$id_client_area)->first();


        if($action == 'payment')
        {
            if(isset($debt->amount))
            {
                $result = $debt->amount - $amount;
                
                if($result > 0)
                {   
                    $debt->amount = $result;
                    
                    $debt->update();

                    return 'Sigue debiendo '.$debt->amount.'$';
                }
                else if($result == 0)
                {
                    $debt->delete();

                    return 'Se ha pagado la deuda exitosamente';
                }
                else if($result < 0)
                {   
                    $amountCredit = abs( $result );
                            
                    $response = $this->credit_to( $id_client_area, $amountCredit );

                    $responseTextTrue = 'Se pago la deuda y se ha acreditado el monto de '.$amountCredit.'$';
                    
                    $responseTextFalse = 'No se ha podido acreditar el resto, revise los datos'; 

                    $debt->delete();

                    return $response ? $responseTextTrue : $responseTextFalse; 
                }
            }
            else
            {
                            
                $response = $this->credit_to( $id_client_area, $amount );

                $responseTextTrue = 'Se ha acreditado el monto de '.$amount.'$';
                    
                $responseTextFalse = 'No se ha podido acreditar el resto, revise los datos'; 

                return $response ? $responseTextTrue : $responseTextFalse;   
            }    
                
        }
        else if($action == 'destroy')
        {
            $payment = Payment::where('id',$id_payment)->first();

            $credit = CreditClient::where('client_area_charged_id',$id_client_area)->first();

            $amountPay = $payment->amount;

            if(isset($debt->amount))
            {
                $result = $debt->amount + $amountPay;
                
                $debt->amount = $result;
                
                $debt->update();

                return 'Se ha establecido la deuda en '.$debt->amount.'$';
                
            }
            else if(isset($credit->credit))
            {
                $result =  $credit->credit - $amountPay;

                if($result < 0)
                {
                    $credit->delete();
                    
                    $result = abs($result);

                    $days_late = $this->calculate_days($id_client_area,$result);

                    $debt = DelayedClient::create(['client_area_charged_id' => $id_client_area, 'amount' => $result, 'days_late' => $days_late]);

                    return 'Se ha establecido una deuda de '.$debt->amount.'$';

                }

                else if($result == 0)
                {
                    $credit->delete();
                    return 'Se ha eliminado un credito de '.$amountPay.'$';

                }
                else if($result > 0)
                {
                    $result = abs($result);
                    
                    $credit->credit = $result;
                    
                    $credit->update();

                    return 'Se ha reducido el credito a '.$credit->credit.'$';
                }

            }
            else{

                $days_late = $this->calculate_days($id_client_area,$amountPay);

                $debt = DelayedClient::create(['client_area_charged_id' => $id_client_area, 'amount' => $amountPay, 'days_late' => $days_late]);

                return 'Se ha establecido una deuda de '.$debt->amount.'$';

            } 


        }
    }

    public function credit_to($id,$amount)
    {
       $client = CreditClient::where('client_area_charged_id',$id)->first();
       
       if(isset($client->credit))
       {
            $result = $client->credit + $amount;
            
            $days = $this->calculate_days_credit($id,$result);

            $days = $client->days_credit + $days;

            $client->credit = $result;

            $client->days_credit = $days;

            return $client->update();
       }

       $days = $this->calculate_days($id,$amount);

       $credit = CreditClient::create(['client_area_charged_id' => $id, 'credit' => $amount, 'days_credit' => $days]);

       return isset($credit->id);
    }

    public function calculate_days($id,$amount)
    {
        $area = ClientAreaCharged::where('id',$id)->with('area')->first();

        $days = ($amount * 7) / $area->area->price;

        $days = floor($days);

        return $days;
    }


}
