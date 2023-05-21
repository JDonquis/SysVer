<?php

namespace App\Http\Controllers\api\dashboard;

use App\Http\Controllers\Controller;
use App\Models\Area;
use App\Models\Shift;
use DB;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AreasController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $areas = Area::with('schedule.shift_start','schedule.shift_end','schedule.days','area_chargeds:id,price,area_id')->get();
        $shifts = Shift::all();

        return response(["areas" => $areas,'shifts' => $shifts], Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {   
        // return $request;

        DB::beginTransaction();
        try {
                $area_id = DB::table('areas')->insertGetId(['name' => $request->name, 'type_area_id' => $request->type_area_id, 'status' => 1 ] );

                

                // No gratis
                if($request->type_area_id == 2)
                    DB::table('area_chargeds')->insert(['area_id' => $area_id, 'name' => $request->name, 'price' => $request->price ] );    
                
                foreach ($request->schedule as $schedule) {

                    $s = DB::table('schedules')->insertGetId(['start_shift_id' => $schedule['start_shift_id'], 'end_shift_id' => $schedule['end_shift_id'], 'area_id' => $area_id ] );

                    foreach ($schedule['days'] as $day)
                    {   

                        DB::table('schedule_days')->insert(['day_id' => $day['id'], 'schedule_id' => $s ] );
                        
                    }

                }
                                
            $area = Area::where('id',$area_id)->with('schedule.shift_start','schedule.shift_end','schedule.days')->first();    

            DB::commit();

            return response(["Message" => 'Area creada exitosamente', "area" => $area], Response::HTTP_OK);

        }catch (Exception $e) {
            DB::rollback();

            if($e->getCode() == '23000')
                return response(["Message" => 'No se pudo crear el area, verifique los datos', 'ErrorMessage' => $e->getMessage()], Response::HTTP_BAD_REQUEST);    
            
            return response(["Message" => 'No se pudo crear el area','ErrorMessage' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
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
          DB::beginTransaction();

        try {
                DB::table('areas')->where('id',$id)->update(['name' => $request->name, 'type_area_id' => $request->type_area_id, 'status' => 1 ] );



                if($request->type_area_id == 2)
                    DB::table('area_chargeds')->insert(['area_id' => $id, 'name' => $request->name, 'price' => $request->price ] );                    
                
                $id_schedule = 0;
                $schedule_ids = array();
                $day_ids = array();
                foreach ($request->schedule as $schedule) 
                {

                    if(isset($schedule['id']))
                    {
                        DB::table('schedules')->where('id',$schedule['id'])->update(['start_shift_id' => $schedule['start_shift_id'], 'end_shift_id' => $schedule['end_shift_id'] ] );

                        $id_schedule = $schedule['id'];

                        array_push($schedule_ids, $id_schedule);
                    }
                    else{

                        $id_schedule = DB::table('schedules')->insertGetId(
                        
                            ['start_shift_id' => $schedule['start_shift_id'], 'end_shift_id' => $schedule['end_shift_id'], 'area_id' => $id ] 

                        );

                        array_push($schedule_ids, $id_schedule);
                    }

                    if(isset($schedule['days']))
                    {
                        foreach ($schedule['days'] as $day)
                        {   
                            array_push($day_ids, $day['id']);

                            DB::table('schedule_days')->updateOrInsert(

                            ['day_id' => $day['id'], 'schedule_id'=>$id_schedule],
                            ['day_id'=> $day['id'],'schedule_id'=>$id_schedule]
                             
                            );

                            
                        }    

                        DB::table('schedule_days')->where('schedule_id',$id_schedule)->whereNotIn('day_id',$day_ids)->delete();
                    }
                    
                }

                DB::table('schedules')->where('area_id',$id)->whereNotIn('id',$schedule_ids)->delete();                    
                
                DB::commit();

                return response(["Message" => 'Area actualizada exitosamente'], Response::HTTP_OK);

        }catch (Exception $e) {
            DB::rollback();

            if($e->getCode() == '23000')
                return response(["Message" => 'No se pudo actualizar el area, verifique los datos',"ErrorMessage" => $e->getMessage()], Response::HTTP_BAD_REQUEST);    
            
            return response(["Message" => 'No se pudo actualizar el area', "ErrorMessage" => $e->getMessage()], Response::HTTP_BAD_REQUEST);
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

            DB::table('areas')->where('area_id', $id)->update(['status' => 0]);

            DB::commit();

            return response(["Message" => 'Area eliminada correctamente'], Response::HTTP_OK);

        }catch (Exception $e) {
            DB::rollback();
            
            return response(["Message" => 'Area no encontrada'], Response::HTTP_BAD_REQUEST);
        }   
    }
}
