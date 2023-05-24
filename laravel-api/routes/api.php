<?php

use App\Http\Controllers\api\LoginController;
use App\Http\Controllers\api\dashboard\AreasController;
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
    Route::get('assistance/{code}',[AssistanceController::class,'last_assistance']);
    Route::post('assistance',[AssistanceController::class,'store']);
    Route::put('assistance/{id}',[AssistanceController::class,'update']);
    Route::delete('assistance/{id}',[AssistanceController::class,'destroy']);

    // Historial of assistances
    Route::get('historial/assistance',[AssistanceController::class,'historial']);

    // Areas
    Route::get('areas',[AreasController::class,'index']);
    Route::post('areas',[AreasController::class,'store']);
    Route::put('areas/{id}',[AreasController::class,'update']);
    Route::delete('areas/{id}',[AreasController::class,'destroy']);

});