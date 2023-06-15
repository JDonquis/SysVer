<?php

namespace App\Http\Controllers\api\dashboard;

use App\Http\Controllers\Controller;
use App\Models\Permission;
use App\Models\Personal;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Symfony\Component\HttpFoundation\Response;
use DB;
class PersonalController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $personal = Personal::with("permissions")->get();
        $permissions = Permission::all();

        return response(["personal" => $personal, 'permissions' => $permissions], Response::HTTP_OK);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {   

        $personal = new Personal;

        DB::beginTransaction();

        try {

            $request->request->add(['password' => Hash::make($request->ci)]);
            $personal->create($request->request->all());
            $personal_id = $personal->latest('id')->first()->id;
            
            if(isset($request->permissions))
            {   
                
                if(count($request->permissions) != 0 )
                {
                    foreach ($request->permissions as $permission){ 


                    DB::table('personal_permissions')->insert(['personal_id' => $personal_id, 'permission_id' => $permission['id'] ] );

                    }

                }
            }

            $personal_created = Personal::where('id',$personal_id)->with('permissions')->first();
                
            DB::commit();

            return response(["Message" => 'Cliente creado exitosamente', "personal" => $personal_created], Response::HTTP_OK);

        } catch (Exception $e) {
            DB::rollback();

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

            DB::table('personal_permissions')->where('personal_id', $id)->delete();

            DB::table('personals')->where('id', $id)->delete();

            DB::commit();

            return response(["Message" => 'Personal eliminado correctamente'], Response::HTTP_OK);

        }catch (Exception $e) {
            DB::rollback();
            
            return response(["Message" => 'Personal no encontrado'], Response::HTTP_BAD_REQUEST);
        }
    }
}
