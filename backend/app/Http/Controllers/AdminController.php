<?php

namespace App\Http\Controllers;

use App\Classes\ErrorResponse;
use App\Http\Requests\ChangeLeaveStatusRequest;
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

    public function viewAllLeaveStatus()
    {
        try {
            $employees = $this->adminService->viewAllLeaveStatus();
            return new SuccessResource([
                'message' => 'View all leave status successfully!',
                'data' => $employees,
            ]);
        } catch (HttpException $e) {
            ErrorResponse::throwException($e);
        }
    }

    public function changeLeaveStatus(ChangeLeaveStatusRequest $request)
    {
        try {
            $data = $request->validated();

            $leaveLogId = (int)$data['leave_log_id'];
            $status = (string)$data['status'];

            $this->adminService->changeLeaveStatus($leaveLogId, $status);
            return new SuccessResource([
                'message' => 'Leave status updated successfully!',
                'data' => null,
            ]);
        } catch (HttpException $e) {
            ErrorResponse::throwException($e);
        }
    }
}
