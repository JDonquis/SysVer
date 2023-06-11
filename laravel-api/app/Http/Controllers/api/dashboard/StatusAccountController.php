<?php

namespace App\Http\Controllers\api\dashboard;

use App\Http\Controllers\Controller;
use App\Models\AreaCharged;
use App\Models\BalanceClient;
use App\Models\Client;
use App\Models\ClientAreaCharged;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class StatusAccountController extends Controller
{
     public function index()
    {
        $clients = Client::with('client_area.balance','client_area.area')->get();
        $areas = AreaCharged::all();
    
        return response(["clients" => $clients, "areas" => $areas], Response::HTTP_OK);
    }

    public function get_clients_balance_in_area($area_id)
    {
        $areaCharged = AreaCharged::where('area_id',$area_id)->first();
        $clientAreaCharged = ClientAreaCharged::select('id')->where('area_charged_id',$areaCharged->id)->get();
        $ids = $clientAreaCharged->pluck('id');
        $clients = BalanceClient::whereIn('client_area_charged_id',$ids)->with('client_area.client')->get();

        return response(["clients" => $clients], Response::HTTP_OK);

    }

    public function check_status($code,$area_id)
    {   

       $client = Client::where('code',$code)->first();
       
       $areaCharged = AreaCharged::where('area_id',$area_id)->first();
       
       if(!isset($areaCharged->id))
            return response(["status" => null], Response::HTTP_OK);


       $clientAreaCharged = ClientAreaCharged::where('client_id',$client->id)->where('area_charged_id',$areaCharged->id)->first();
       
       $status = BalanceClient::select('status')->where('client_area_charged_id',$clientAreaCharged->id)->first();

       return response(["status" => $status], Response::HTTP_OK);

    }


}
