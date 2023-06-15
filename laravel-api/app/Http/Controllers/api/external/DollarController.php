<?php

namespace App\Http\Controllers\api\external;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use GuzzleHttp\Client;

class DollarController extends Controller
{
    public function index()
    {
        $client = new Client();
        $url = 'https://venecodollar.vercel.app/api/v1/dollar';

        try {
            
            $response = $client->request('GET', $url);
            return response($response->getBody(), $response->getStatusCode());

        } catch (\Exception $e) {
            return response(['error' => 'Error al obtener datos de la API externa'], 500);
        }
    
    }
}
