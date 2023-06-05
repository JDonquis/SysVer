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

    public function calculate($id_client_area,$amount,$action)
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
    }

    public function credit_to($id,$amount)
    {
       $client = CreditClient::where('client_area_charged_id',$id)->first();
       
       if(isset($client->credit))
       {
            $result = $client->credit + $amount;
            
            $client->credit = $result;

            return $client->update();
       }

       $credit = CreditClient::create(['client_area_charged_id' => $id, 'credit' => $amount]);

       return isset($credit->id);
    }



}
