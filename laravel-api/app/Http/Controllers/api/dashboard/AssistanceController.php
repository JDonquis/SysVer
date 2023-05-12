<?php

namespace App\Http\Controllers\api\dashboard;

use App\Http\Controllers\Controller;
use App\Models\Area;
use App\Models\Assistance;
use App\Models\Client;
use App\Models\Schedule;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use DB;

class AssistanceController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $assistances = Assistance::with('schedule.area','schedule.shift_start','schedule.shift_end','client')->get();
        $areas = Area::with('schedule.shift_start','schedule.shift_end')->get();

        return response(["areas" => $areas, 'assistances' => $assistances], Response::HTTP_OK);    
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

       
       $client_id = Client::where("code",$request->code)->first();
       
       if(!isset($client_id->id))
             return response(["Message" => 'Codigo no valido'], Response::HTTP_CONFLICT);       

       $assistances = Assistance::where('client_id',$client_id->id)->first();

       

       if(isset($assistances->id))
             return response(["Message" => 'El usuario ya se encuentra en la asistencia'], Response::HTTP_CONFLICT);

       DB::beginTransaction();

        try {
            
            $new_assistance = new Assistance;
            
            $request->request->add(['client_id' => $client_id->id]);

            $new_assistance->create($request->all());

            $assistance_id = $new_assistance->latest('id')->first()->id;

            $assistance_created = Assistance::where('id',$assistance_id)->with('schedule.area','schedule.shift_start','schedule.shift_end','client')->first();
                
            DB::commit();

            return response(["Message" => 'Asistencia creada exitosamente', "assistance" => $assistance_created], Response::HTTP_OK);

        }catch (Exception $e) {
            DB::rollback();

            if($e->getCode() == '23000')
                return response(["Message" => 'No se pudo crear la asistencia, verifique los datos', 'ErrorMessage' => $e->getMessage()], Response::HTTP_BAD_REQUEST);    
            
            return response(["Message" => 'No se pudo crear la asistencia','ErrorMessage' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        }   
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        DB::beginTransaction();

        try {

            DB::table('assistances')->where('client_id', $id)->delete();

            DB::commit();

            return response(["Message" => 'Asistencia eliminada correctamente'], Response::HTTP_OK);

        }catch (Exception $e) {
            DB::rollback();
            
            return response(["Message" => 'Asistencia no encontrada'], Response::HTTP_BAD_REQUEST);
        }  
    }
}
