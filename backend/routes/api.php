<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\EmployeeController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);

    Route::group(['middleware' => ['auth:api']], function () {

        Route::prefix('employee')->group(function () {
            Route::get('apply-for-leave', [EmployeeController::class, 'applyForLeave']);
            Route::get('view-leave-status', [EmployeeController::class, 'viewLeaveStatus']);
        });

    });
});
