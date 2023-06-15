<?php

namespace App\Http\Controllers\api\dashboard;

use App\Http\Controllers\Controller;
use App\Models\Area;
use App\Models\Assistance;
use App\Models\Client;
use App\Models\DelayedClient;
use App\Models\HistorialAssistance;
use App\Models\Schedule;
use DB;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;


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
       $s = new Schedule;
       $client_id = Client::where("code",$request->code)->first();

       $ids = $s->get_areas_ids($request->area_id);
       
       if(!isset($client_id->id))
             return response(["Message" => 'Codigo no valido'], Response::HTTP_CONFLICT);       

       $assistances = Assistance::where('client_id',$client_id->id)->whereIn('schedule_id',$ids)->first();

       
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
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {   
        $s = new Schedule;

        $client_id = Client::where("code",$request->code)->first();
        
        if(!isset($client_id->id))
            return response(["Message" => 'Codigo no valido'], Response::HTTP_CONFLICT);

        
        $ids = $s->get_areas_ids($request->area_id);

        $assistances = Assistance::where('client_id',$client_id->id)->whereIn('schedule_id',$ids)->first();

       if(isset($assistances->id))
             return response(["Message" => 'El usuario ya se encuentra en la asistencia'], Response::HTTP_CONFLICT);

        DB::beginTransaction();

        try {

            DB::table('assistances')->where('id',$id)->update(array('client_id'=>$client_id->id,'schedule_id'=>$request->schedule_id));

            $assistanceUpdated = Assistance::where("id",$id)->with('schedule.area','schedule.shift_start','schedule.shift_end','client')->first();        
            
            DB::commit();

            return response(["Message" => 'Asistencia actualizada exitosamente', "assistance" => $assistanceUpdated], Response::HTTP_OK);

        }catch (Exception $e) {

            DB::rollback();

            if($e->getCode() == '23000')
                return response(["Message" => 'No se pudo actualizar la asistencia, verifique los datos', 'ErrorMessage' => $e->getMessage()], Response::HTTP_BAD_REQUEST);    
            
            return response(["Message" => 'No se pudo actualizar la asistencia','ErrorMessage' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        }  



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

            DB::table('assistances')->where('id', $id)->delete();

            DB::commit();

            return response(["Message" => 'Asistencia eliminada correctamente'], Response::HTTP_OK);

        }catch (Exception $e) {
            DB::rollback();
            
            return response(["Message" => 'Asistencia no encontrada'], Response::HTTP_BAD_REQUEST);
        }  
    }

    public function last_assistance($code)
    {
       $client_id = Client::where("code",$code)->first();
        
       $latest = HistorialAssistance::where('client_id',$client_id->id)->latest()->with('schedule.area','schedule.shift_start','schedule.shift_end')->first();
            
        return response(["latest" => $latest], Response::HTTP_OK);
    }

    /**
     * History of assistance.
     *
     * 
     * @return \Illuminate\Http\Response
     */
     public function historial()
    {
        $assistances = HistorialAssistance::with('schedule.area','schedule.shift_start','schedule.shift_end','client')->get();
        
        return response(['assistances' => $assistances], Response::HTTP_OK);    
    }

}
