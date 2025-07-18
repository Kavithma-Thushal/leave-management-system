<?php

namespace App\Http\Controllers;

use App\Classes\ErrorResponse;
use App\Http\Requests\LeaveRequest;
use App\Http\Resources\SuccessResource;
use App\Http\Resources\UserResource;
use App\Http\Services\EmployeeService;
use Symfony\Component\HttpKernel\Exception\HttpException;

class EmployeeController extends Controller
{
    protected EmployeeService $employeeService;

    public function __construct(EmployeeService $employeeService)
    {
        $this->employeeService = $employeeService;
    }

    public function getRole()
    {
        try {
            $user = $this->employeeService->getRole();
            return new SuccessResource([
                'message' => 'User role retrieved successfully!',
                'data' => $user->role
            ]);
        } catch (HttpException $e) {
            ErrorResponse::throwException($e);
        }
    }

    public function getDetails()
    {
        try {
            $userDetails = $this->employeeService->getDetails();
            return new SuccessResource([
                'message' => 'User details retrieved successfully!',
                'data' => $userDetails
            ]);
        } catch (HttpException $e) {
            ErrorResponse::throwException($e);
        }
    }

    public function applyForLeave(LeaveRequest $request)
    {
        try {
            $leave = $this->employeeService->applyForLeave($request->validated());
            return new SuccessResource([
                'message' => 'Leave applied successfully!',
                'data' => $leave
            ]);
        } catch (HttpException $e) {
            ErrorResponse::throwException($e);
        }
    }

    public function viewLeaveStatus()
    {
        try {
            return new SuccessResource([
                'message' => 'Viewed leave status successfully!',
                'data' => null
            ]);
        } catch (HttpException $e) {
            ErrorResponse::throwException($e);
        }
    }
}
