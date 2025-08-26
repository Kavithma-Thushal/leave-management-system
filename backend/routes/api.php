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
            Route::post('apply-for-leave', [EmployeeController::class, 'applyForLeave'])->middleware('permission:apply-for-leave');
            Route::get('get-leave-logs', [EmployeeController::class, 'getLeaveLogs'])->middleware('permission:get-leave-logs');
            Route::get('get-leave-details', [EmployeeController::class, 'getLeaveDetails'])->middleware('permission:get-leave-details');
        });

        Route::prefix('admin')->group(function () {
            Route::patch('change-leave-status/{id}', [AdminController::class, 'changeLeaveStatus'])->middleware('permission:change-leave-status');
            Route::get('get-employee-details', [AdminController::class, 'getEmployeeDetails'])->middleware('permission:get-employee-details');
        });
    });
});
