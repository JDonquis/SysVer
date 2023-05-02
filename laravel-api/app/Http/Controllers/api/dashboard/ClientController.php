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

            foreach ($request->areas as $area){ DB::table('client_areas')->insert(['client_id' => $client_id, 'area_id' => $area]); }
                
            DB::commit();

            return response(["Message" => 'Cliente creado exitosamente'], Response::HTTP_OK);

        }catch (Exception $e) {
            DB::rollback();

            if($e->getCode() == '23000')
                return response(["Message" => 'No se pudo crear el cliente, verifique los datos'], Response::HTTP_BAD_REQUEST);    
            
            return response(["Message" => 'No se pudo crear el cliente'], Response::HTTP_BAD_REQUEST);
        }   
    }

    public function update(Request $request, $id)
    {
        return $request;

        $client = new Client;
        
       DB::beginTransaction();

        try {

            DB::table('clients')
            ->where('id', 3)
            ->update(['title' => "Updated Title"]);

            foreach ($request->areas as $area){ DB::table('client_areas')->insert(['client_id' => $client_id, 'area_id' => $area]); }
                
            DB::commit();

            return response(["Message" => 'Cliente creado exitosamente'], Response::HTTP_OK);

        }catch (Exception $e) {
            DB::rollback();

            if($e->getCode() == '23000')
                return response(["Message" => 'No se pudo crear el cliente, verifique los datos'], Response::HTTP_BAD_REQUEST);    
            
            return response(["Message" => 'No se pudo crear el cliente'], Response::HTTP_BAD_REQUEST);
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
