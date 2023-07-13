<?php

namespace App\Http\Controllers\api\dashboard;

use App\Http\Controllers\Controller;
use App\Models\Area;
use App\Models\AreaCharged;
use App\Models\BloodType;
use App\Models\Client;
use App\Models\ClientAreaCharged;
use DB;
use Exception;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Carbon\Carbon;

class ClientController extends Controller
{
    public function index()
    {
        $clients = Client::with('blood_types','areas')->get();
        $areas = AreaCharged::all();
        $blood_types = BloodType::all();
        return response(["clients" => $clients, 'all_areas_db' => $areas, 'blood_types' => $blood_types], Response::HTTP_OK);
    }

    public function store(Request $request)
    {   
        $client = new Client;
        
       DB::beginTransaction();

        try {

            
            $code = $client->last_code();
            $code = intval($code->code) + 1;
            $code = strval($code);

            $request->request->add(['code' => $code]);
            $request->request->add(['blood_type_id' => $request->blood_types['id']]);

            $client->create($request->all());

            $client_id = $client->latest('id')->first()->id;

            if(isset($request->areas))
            {
                if(count($request->areas) != 0 )
                {
                    foreach ($request->areas as $area){ 

                    $client_area_charged_id = DB::table('client_area_chargeds')->insertGetId(['client_id' => $client_id, 'area_charged_id' => $area['id'] ] );

                    DB::table('balance_clients')->insert(['client_area_charged_id' => $client_area_charged_id, 'balance' => 0, 'days' => 7, 'status' => 1, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now(), 'end' => Carbon::now()->addWeek() ]); 
                    }

                }
    
            }  
            
            $client_created = Client::where('id',$client_id)->with('blood_types','areas')->first();
                
            DB::commit();

            return response(["Message" => 'Cliente creado exitosamente', "client" => $client_created], Response::HTTP_OK);

        }catch (Exception $e) {
            DB::rollback();

            if($e->getCode() == '23000')
                return response(["Message" => 'No se pudo crear el cliente, verifique los datos', 'ErrorMessage' => $e->getMessage()], Response::HTTP_BAD_REQUEST);    
            
            return response(["Message" => 'No se pudo crear el cliente','ErrorMessage' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        }   
    }

    public function update(Request $request, $id)
    {


       DB::beginTransaction();

        try {

                $client = Client::where('id',$id)->first();
                $request->request->add(['blood_type_id' => $request->blood_types['id']]);
                $client->update($request->all());
                $client->touch();
                
                $area_ids = array();
                $client_area_ids = array();
                if(count($request->areas) == 0)
                {
                    DB::table('client_area_chargeds')->where('client_id', '=', $id)->delete();                    
                }
                else{

                    $client_area_charged_id = 0;

                    foreach ($request->areas as $area){

                    array_push($area_ids, $area['id']);
                    
                    $record = DB::table('client_area_chargeds')
                        ->where('client_id', $id)
                        ->where('area_charged_id', $area['id'])
                        ->first();

                    if ($record) {

                        $client_area_charged_id = $record->id;

                        array_push($client_area_ids, $client_area_charged_id);

                        // El registro ya existe, puedes obtener el ID con $record->id
                        // Actualizamos el registro
                        DB::table('client_area_chargeds')
                            ->where('id', $record->id)
                            ->update(['area_charged_id' => $area['id']]);
                    } else {
                        // El registro no existe, inserta uno nuevo y obtén el ID
                        $newId = DB::table('client_area_chargeds')->insertGetId(
                            ['client_id' => $id, 'area_charged_id' => $area['id']]
                        );

                        $client_area_charged_id = $newId;

                        array_push($client_area_ids, $client_area_charged_id);

                        DB::table('balance_clients')->insert(['client_area_charged_id' => $client_area_charged_id, 'balance' => 0, 'days' => 0, 'status' => 1, 'created_at' => Carbon::now(), 'updated_at' => Carbon::now(), 'end' => Carbon::now()->addWeek() ]);
                    }           
    
                }

                $recordsToDelete = DB::table('client_area_chargeds')
                ->where('client_id', '=', $id)
                ->whereNotIn('area_charged_id', $area_ids)
                ->select('id')
                ->get();

                $deletedIds = $recordsToDelete->pluck('id')->toArray();

                $deleted = DB::table('client_area_chargeds')
                ->whereIn('id', $deletedIds)
                ->delete();

                 
                $deleted = DB::table('balance_clients')->whereIn('client_area_charged_id',$deletedIds)->delete();
    

                
             }
                    
                DB::commit();

                return response(["Message" => 'Cliente actualizado exitosamente'], Response::HTTP_OK);

        }catch (Exception $e) {
            DB::rollback();

            if($e->getCode() == '23000')
                return response(["Message" => 'No se pudo actualizar el cliente, verifique los datos',"ErrorMessage" => $e->getMessage()], Response::HTTP_BAD_REQUEST);    
            
            return response(["Message" => 'No se pudo actualizar el cliente', "ErrorMessage" => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        }   
    }

    public function destroy($id)
    {
        DB::beginTransaction();

        try {

            DB::table('client_area_chargeds')->where('client_id', $id)->delete();

            DB::table('clients')->where('id', $id)->delete();

            DB::commit();

            return response(["Message" => 'Cliente eliminado correctamente'], Response::HTTP_OK);

        }catch (Exception $e) {
            DB::rollback();
            
            return response(["Message" => 'Cliente no encontrado'], Response::HTTP_BAD_REQUEST);
        }   
    }

    public function get_data_payment_client($code,$area_id)
    {   
        $c = Client::select('id')->where('code',$code)->first();

        $area = AreaCharged::where('area_id',$area_id)->first();

        $client = ClientAreaCharged::where('client_id',$c->id)->where('area_charged_id',$area->id)->with('balance','area')->first();

        return $client;
    }

    public function get_areas_client($code)
    {
        $client = Client::where('code',$code)->with('areas')->first();

        return response(["client_areas" => $client ], Response::HTTP_OK);
    }
}
