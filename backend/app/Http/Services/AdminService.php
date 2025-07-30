<?php

namespace App\Http\Services;

use App\Repositories\Employee\EmployeeRepositoryInterface;
use App\Repositories\LeaveDetails\LeaveDetailsRepositoryInterface;
use App\Repositories\LeaveLogs\LeaveLogsRepositoryInterface;
use Symfony\Component\HttpKernel\Exception\HttpException;

class AdminService
{
    protected EmployeeRepositoryInterface $employeeRepositoryInterface;
    protected LeaveDetailsRepositoryInterface $leaveDetailsRepositoryInterface;
    protected LeaveLogsRepositoryInterface $leaveLogsRepositoryInterface;

    public function __construct(
        EmployeeRepositoryInterface     $employeeRepositoryInterface,
        LeaveDetailsRepositoryInterface $leaveDetailsRepositoryInterface,
        LeaveLogsRepositoryInterface    $leaveLogsRepositoryInterface
    )
    {
        $this->employeeRepositoryInterface = $employeeRepositoryInterface;
        $this->leaveDetailsRepositoryInterface = $leaveDetailsRepositoryInterface;
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

            if (!$admin || $admin->role !== 'admin') {
                throw new HttpException(403, 'Unauthorized access!');
            }

            $leaveLog = $this->leaveLogsRepositoryInterface->findByIdOrFail($leaveLogId);

            if ($status === 'Approved') {
                $userId = $leaveLog->user_id;
                $type = strtolower($leaveLog->leave_type);
                $leaveDetails = $this->leaveDetailsRepositoryInterface->findByUserIdOrFail($userId);
                $days = \Carbon\Carbon::parse($leaveLog->from_date)->diffInDays($leaveLog->to_date) + 1;

                if ($leaveDetails->{$type} < $days) {
                    throw new HttpException(400, 'Insufficient leave balance!');
                }

                $leaveDetails->{$type} -= $days;
                $leaveDetails->save();
            }

            $this->leaveLogsRepositoryInterface->updateLeaveStatus($leaveLogId, $status);
        } catch (HttpException $e) {
            throw $e;
        }
    }
}
