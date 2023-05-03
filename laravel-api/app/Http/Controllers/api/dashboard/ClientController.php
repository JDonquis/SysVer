<?php

namespace App\Http\Controllers\api\dashboard;

use App\Http\Controllers\Controller;
use App\Models\Area;
use App\Models\BloodType;
use App\Models\Client;
use DB;
use Exception;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ClientController extends Controller
{
    public function index()
    {
        $clients = Client::with('blood_types','areas')->get();
        $areas = Area::all();
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

            $client->create($request->all());

            $client_id = $client->latest('id')->first()->id;

            

            foreach ($request->areas as $area){ 

                DB::table('client_areas')->insert(['client_id' => $client_id, 'area_id' => $area['id'] ] ); 

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
                $client->update($request->all());
                $client->touch();
                
                $area_ids = array();
                foreach ($request->areas as $area){

                    array_push($area_ids, $area['id']);
                    
                     DB::table('client_areas')->updateOrInsert(

                        ['client_id' => $id, 'area_id' => $area['id']],
                        ['area_id' => $area['id']]
                    );


                $deleted = DB::table('client_areas')->where('client_id', '=', $id)->whereNotIn('area_id',$area_ids)->delete();

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

            DB::table('client_areas')->where('client_id', $id)->delete();

            DB::table('clients')->where('id', $id)->delete();

            DB::commit();

            return response(["Message" => 'Cliente eliminado correctamente'], Response::HTTP_OK);

        }catch (Exception $e) {
            DB::rollback();
            
            return response(["Message" => 'Cliente no encontrado'], Response::HTTP_BAD_REQUEST);
        }   
    }
}
