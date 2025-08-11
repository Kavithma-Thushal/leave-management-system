<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\EmployeeController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);

    Route::group(['middleware' => ['auth:api']], function () {

        Route::prefix('employee')->group(function () {
            Route::post('apply-for-leave', [EmployeeController::class, 'applyForLeave']);
            Route::get('get-leave-logs', [EmployeeController::class, 'getLeaveLogs']);
            Route::get('get-leave-details', [EmployeeController::class, 'getLeaveDetails']);
        });

        Route::prefix('admin')->group(function () {
            Route::patch('change-leave-status/{id}', [AdminController::class, 'changeLeaveStatus']);
            Route::get('get-employee-details', [AdminController::class, 'getEmployeeDetails']);
        });
    });
});
