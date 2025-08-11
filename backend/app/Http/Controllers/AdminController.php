<?php

namespace App\Http\Controllers;

use App\Classes\ErrorResponse;
use App\Http\Requests\ChangeLeaveStatusRequest;
use App\Http\Resources\LeaveLogResource;
use App\Http\Resources\SuccessResource;
use App\Http\Services\AdminService;
use Symfony\Component\HttpKernel\Exception\HttpException;

class AdminController extends Controller
{
    protected AdminService $adminService;

    public function __construct(AdminService $adminService)
    {
        $this->adminService = $adminService;
    }

    public function changeLeaveStatus(ChangeLeaveStatusRequest $request, $id)
    {
        try {
            $data = $this->adminService->changeLeaveStatus($request->validated(), $id);
            return new SuccessResource([
                'message' => 'Leave status updated successfully!',
                'data' => new LeaveLogResource($data)
            ]);
        } catch (HttpException $e) {
            ErrorResponse::throwException($e);
        }
    }

    public function getEmployeeDetails()
    {
        try {
            $data = $this->adminService->getEmployeeDetails();
            return new SuccessResource([
                'message' => 'Employee details retrieved successfully!',
                'data' => new SuccessResource($data)
            ]);
        } catch (HttpException $e) {
            ErrorResponse::throwException($e);
        }
    }
}
