<?php

namespace App\Http\Services;

use App\Repositories\Employee\EmployeeRepositoryInterface;
use App\Repositories\LeaveLogs\LeaveLogsRepositoryInterface;
use Symfony\Component\HttpKernel\Exception\HttpException;

class AdminService
{
    protected EmployeeRepositoryInterface $employeeRepositoryInterface;
    protected LeaveLogsRepositoryInterface $leaveLogsRepositoryInterface;

    public function __construct(EmployeeRepositoryInterface $employeeRepositoryInterface,LeaveLogsRepositoryInterface $leaveLogsRepositoryInterface)
    {
        $this->employeeRepositoryInterface = $employeeRepositoryInterface;
        $this->leaveLogsRepositoryInterface = $leaveLogsRepositoryInterface;
    }

    public function viewAllLeaveStatus()
    {
        try {
            $admin = auth()->user();

            if ($admin->role !== 'admin') {
                throw new HttpException(403, 'Unauthorized access!');
            }

            $employees = $this->employeeRepositoryInterface->getAllWith(['leaveDetails', 'leaveLogs']);
            $filtered = $employees->reject(fn($user) => $user->role === 'admin');
            return $filtered;
        } catch (HttpException $e) {
            throw $e;
        }
    }

    public function changeLeaveStatus(int $leaveLogId, string $status): void
    {
        try {
            $admin = auth()->user();

            if ($admin->role !== 'admin') {
                throw new HttpException(403, 'Unauthorized access!');
            }

            $this->leaveLogsRepositoryInterface->updateLeaveStatus($leaveLogId, $status);
        } catch (HttpException $e) {
            throw $e;
        }
    }
}
