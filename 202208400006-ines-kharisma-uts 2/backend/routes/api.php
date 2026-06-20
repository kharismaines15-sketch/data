<?php

use App\Http\Controllers\PendudukController;
use Illuminate\Support\Facades\Route;

Route::apiResource('penduduk', PendudukController::class);
Route::patch('penduduk/{id}/toggle-status', [PendudukController::class, 'toggleStatus']);
