<?php

namespace App\Http\Controllers\api\dashboard;

use App\Http\Controllers\Controller;
use App\Models\Area;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use DB;

class AreasController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $areas = Area::with('schedule.shift_start','schedule.shift_end','schedule.days')->get();

        return response(["areas" => $areas], Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        DB::beginTransaction();
        try {
                $area_id = DB::table('areas')->insertGetId(['name' => $request->name, 'type_area_id' => $request->type_area_id ] );

                if($request->type_area_id == 2)
                {
                    DB::table('area_chargeds')->insert(['area_id' => $area_id, 'name' => $request->name, 'price' => $request->price ] );    
                }

            DB::commit();

            return response(["Message" => 'Cliente creado exitosamente', "client" => $client_created], Response::HTTP_OK);

        }catch (Exception $e) {
            DB::rollback();

            if($e->getCode() == '23000')
                return response(["Message" => 'No se pudo crear el cliente, verifique los datos', 'ErrorMessage' => $e->getMessage()], Response::HTTP_BAD_REQUEST);    
            
            return response(["Message" => 'No se pudo crear el cliente','ErrorMessage' => $e->getMessage()], Response::HTTP_BAD_REQUEST);
        }
        //No gratis 

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
        //
    }
}
