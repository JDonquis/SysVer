<?php

namespace App\Http\Controllers\api\dashboard;

use App\Http\Controllers\Controller;
use App\Models\Area;
use App\Models\AreaCharged;
use App\Models\Client;
use App\Models\ClientAreaCharged;
use App\Models\HistorialPayment;
use App\Models\Payment;
use App\Models\PaymentMethod;
use DB;
use Exception;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class PaymentsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $payments = Payment::with('client_area.client','client_area.area','payment')->get();
        $methods = PaymentMethod::all();
        $areas = AreaCharged::all();

        return response(["areas" => $areas, 'payments' => $payments,'methods' => $methods], Response::HTTP_OK);    
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
            
            $client = Client::where('code',$request->code)->first();
            if(!$client)
                throw new Exception('No se encontró ningún cliente con el código proporcionado');

            $area = AreaCharged::where('area_id',$request->area_id)->first();
            if(!$area)
                throw new Exception('No se encontró ningún area');

            $client_area = ClientAreaCharged::where('area_charged_id',$area->area_id)->where('client_id',$client->id)->first();
            if(!$client_area)
                throw new Exception('El cliente no esta inscrito a esta area');

            
            $payment_id = DB::table('payments')->insertGetId(['client_area_charged_id' => $client_area->id, 'payment_method_id' => $request->payment_method_id, 'amount' => $request->amount ]);


            $payment = Payment::where('id',$payment_id)->with('client_area.client','client_area.area')->first();

            DB::commit();

            $p = new Payment;

            $payResponse = $p->calculate($client_area->id,$request->amount,'payment');

            return response(["payment" => $payment, "payResponse" => $payResponse], Response::HTTP_OK);

        }catch(Exception $e) {
          
          DB::rollback();  

          return response(["error" => $e->getMessage()], Response::HTTP_BAD_REQUEST);
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
            
            $client = Client::where('code',$request->code)->first();
            if(!$client)
                throw new Exception('No se encontró ningún cliente con el código proporcionado');

            $area = AreaCharged::where('area_id',$request->area_id)->first();
            if(!$area)
                throw new Exception('No se encontró ningún area');

            $client_area = ClientAreaCharged::where('area_charged_id',$area->area_id)->where('client_id',$client->id)->first();
            if(!$client_area)
                throw new Exception('El cliente no esta inscrito a esta area');

            
            DB::table('payments')->where('id',$id)->update(['client_area_charged_id' => $client_area->id, 'payment_method_id' => $request->payment_method_id, 'amount' => $request->amount ]);


            $payment = Payment::where('id',$id)->with('client_area.client','client_area.area')->first();

            DB::commit();

            $p = new Payment;

            $payResponse = $p->calculate($client_area->id,$request->amount,'payment');

            return response(["Message" => "Pago actualizado con exito", "payment" => $payment, "payResponse" => $payResponse], Response::HTTP_OK);

        }catch(Exception $e) {
          
          DB::rollback();  

          return response(["error" => $e->getMessage()], Response::HTTP_BAD_REQUEST);
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

            $payment = Payment::where('id',$id)->first();

            $p = new Payment;

            $payResponse = $p->calculate($payment->client_area_charged_id,$payment->amount,'destroy',$id); 

            $payment->delete();

            DB::commit();

            return response(["Message" => 'Pago eliminado correctamente', "payResponse" => $payResponse], Response::HTTP_OK);

        }catch (Exception $e) {
            DB::rollback();
            
            return response(["Message" => 'Pago no encontrada'], Response::HTTP_BAD_REQUEST);
        }  
    }

    public function historial()
    {
        $payments = HistorialPayment::with('client_area.client','client_area.area','payment')->get();
        
        return response(['payments' => $payments], Response::HTTP_OK);    
    }
}

