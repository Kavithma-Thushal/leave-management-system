<?php

namespace App\Http\Controllers;

use App\Classes\ErrorResponse;
use App\Http\Requests\ApplyForLeaveRequest;
use App\Http\Resources\LeaveLogResource;
use App\Http\Resources\SuccessResource;
use App\Http\Services\EmployeeService;
use Symfony\Component\HttpKernel\Exception\HttpException;

class EmployeeController extends Controller
{
    protected EmployeeService $employeeService;

    public function __construct(EmployeeService $employeeService)
    {
        $this->employeeService = $employeeService;
    }

    public function applyForLeave(ApplyForLeaveRequest $request)
    {
        try {
            $data = $this->employeeService->applyForLeave($request->validated());
            return new SuccessResource([
                'message' => 'Leave applied successfully!',
                'data' => new LeaveLogResource($data)
            ]);
        } catch (HttpException $e) {
            ErrorResponse::throwException($e);
        }
    }

    public function getLeaveLogs()
    {
        try {
            $data = $this->employeeService->getLeaveLogs();
            return new SuccessResource([
                'message' => 'Leave logs retrieved successfully!',
                'data' => LeaveLogResource::collection($data)
            ]);
        } catch (HttpException $e) {
            ErrorResponse::throwException($e);
        }
    }

    public function getLeaveDetails()
    {
        try {
            $data = $this->employeeService->getLeaveDetails();
            return new SuccessResource([
                'message' => 'Leave details retrieved successfully!',
                'data' => new SuccessResource($data)
            ]);
        } catch (HttpException $e) {
            ErrorResponse::throwException($e);
        }
    }
}
