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

                        DB::table('client_area_chargeds')->insert(['client_id' => $client_id, 'area_charged_id' => $area['id'] ] ); 
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

                if(count($request->areas) == 0)
                {
                    DB::table('client_area_chargeds')->where('client_id', '=', $id)->delete();                    
                }
                else{

                    foreach ($request->areas as $area){

                    array_push($area_ids, $area['id']);
                    
                     DB::table('client_area_chargeds')->updateOrInsert(

                        ['client_id' => $id, 'area_charged_id' => $area['id']],
                        ['area_charged_id' => $area['id']]
                    );


                    $deleted = DB::table('client_area_chargeds')->where('client_id', '=', $id)->whereNotIn('area_charged_id',$area_ids)->delete();
    
                }

                
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



        $client = ClientAreaCharged::where('client_id',$c->id)->where('area_charged_id',$area->id)->with('credit','delayed')->first();

        return $client;
    }

    public function get_areas_client($code)
    {
        $client = Client::select('id')->where('code',$code)->with('areas')->first();

        return response(["client_areas" => $client ], Response::HTTP_OK);
    }
}
