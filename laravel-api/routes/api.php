<?php

use App\Http\Controllers\api\LoginController;
use App\Http\Controllers\api\dashboard\AssistanceController;
use App\Http\Controllers\api\dashboard\ClientController;
use App\Http\Controllers\api\dashboard\UsersController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::post('/login',[LoginController::class,'login']);

Route::group(['prefix' => 'dashboard', 'middleware' => ['auth:sanctum']], function(){

    // Clients
    Route::get('clients',[ClientController::class,'index']);
    Route::post('clients',[ClientController::class,'store']);
    Route::put('clients/{id}',[ClientController::class,'update']);
    Route::delete('clients/{id}',[ClientController::class,'destroy']);

    // Assistances
    Route::get('assistance',[AssistanceController::class,'index']);

});