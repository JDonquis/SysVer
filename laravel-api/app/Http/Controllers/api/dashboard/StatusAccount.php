<?php

namespace App\Http\Controllers\api\dashboard;

use App\Http\Controllers\Controller;
use App\Models\Client;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
class StatusAccount extends Controller
{
    public function index()
    {
        $clients = Client::with('client_area.balance')->get();
    
        return response(["clients" => $clients], Response::HTTP_OK);
    }
}
