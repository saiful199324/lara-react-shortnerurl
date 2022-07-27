<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\StudentController;
use App\Models\User;

Route::post('register',[AuthController::class, 'register']);
Route::post('login',[AuthController::class, 'login']);

Route::middleware(['auth:sanctum','isAPIAdmin'])->group(function(){

    Route::get('generate-shorten-link', [App\Http\Controllers\ShortLinkController::class, 'index'])->name('home');
    Route::post('generate-shorten-link', [App\Http\Controllers\ShortLinkController::class, 'store'])->name('generate.shorten.link.post');
    Route::get('{code}', [App\Http\Controllers\ShortLinkController::class, 'shortenLink'])->name('shorten.link');

    Route::get('students', [StudentController::class, 'index']);
    Route::post('/add-student', [StudentController::class, 'store']);
    Route::get('/edit-student/{id}', [StudentController::class, 'edit']);
    Route::put('update-student/{id}', [StudentController::class, 'update']);
    Route::delete('delete-student/{id}', [StudentController::class, 'destroy']);


    Route::get('/checkingAuthenticated', function () {
        return response()->json(['message' => 'You are in', 'status'=>200], 200);
    });


});

Route::middleware(['auth:sanctum'])->group(function(){

    Route::post('logout',[AuthController::class, 'logout']);

});
