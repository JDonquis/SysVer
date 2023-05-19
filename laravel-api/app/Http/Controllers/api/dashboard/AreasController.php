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
                
                foreach ($request->schedules as $schedule) {

                    $s = DB::table('schedules')->insertGetId(['start_shift_id' => $schedule['shift_start'], 'end_shift_id' => $schedule['shift_end'], 'area_id' => $area_id ] );

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
        // DB::beginTransaction();

        // try {

            // DB::table('client_area_chargeds')->where('area_id', $id)->select();

            // $area = Area::where("id",$id)->first();



            // if($area->)

            // DB::table('client_area_chargeds')->where('client_id', $id)->delete();

        //     DB::table('clients')->where('id', $id)->delete();

        //     DB::commit();

        //     return response(["Message" => 'Cliente eliminado correctamente'], Response::HTTP_OK);

        // }catch (Exception $e) {
        //     DB::rollback();
            
        //     return response(["Message" => 'Cliente no encontrado'], Response::HTTP_BAD_REQUEST);
        // }   
    }
}
