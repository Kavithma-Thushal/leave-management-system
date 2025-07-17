<?php

namespace App\Http\Services;

use App\Models\LeaveLogs;
use App\Repositories\Employee\EmployeeRepositoryInterface;
use App\Repositories\LeaveLogs\LeaveLogsRepositoryInterface;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpKernel\Exception\HttpException;

class EmployeeService
{
    protected EmployeeRepositoryInterface $employeeRepositoryInterface;
    protected LeaveLogsRepositoryInterface $leaveLogRepositoryInterface;

    public function __construct(EmployeeRepositoryInterface $employeeRepositoryInterface, LeaveLogsRepositoryInterface $leaveLogRepositoryInterface)
    {
        $this->employeeRepositoryInterface = $employeeRepositoryInterface;
        $this->leaveLogRepositoryInterface = $leaveLogRepositoryInterface;
    }

    public function getRole()
    {
        try {
            return auth()->user();
        } catch (HttpException $e) {
            throw $e;
        }
    }

    public function applyForLeave(array $data)
    {
        DB::beginTransaction();
        try {
            $user = auth()->user();

            // Calculate total days
            $fromDate = new \DateTime($data['from_date']);
            $toDate = new \DateTime($data['to_date']);
            $interval = $fromDate->diff($toDate);
            $daysRequested = $interval->days + 1;

            // Get user's leave details
            $leaveDetails = $user->leaveDetails;
            if (!$leaveDetails) {
                throw new \Exception("Leave details not found for user.");
            }

            $leaveType = $data['leave_type'];

            // Check if leave type exists in leave details
            if (!in_array($leaveType, ['annual', 'casual'])) {
                throw new \Exception("Invalid leave type: {$leaveType}");
            }

            // Check leave balance
            $currentBalance = $leaveDetails->$leaveType;

            if ($daysRequested > $currentBalance) {
                throw new \Exception("Insufficient {$leaveType} leave balance. Requested: {$daysRequested}, Available: {$currentBalance}");
            }

            // Reduce leave balance
            $leaveDetails->$leaveType = $currentBalance - $daysRequested;
            $leaveDetails->save();

            // Create record in leave log table
            $leave = $this->leaveLogRepositoryInterface->create([
                'user_id' => $user->id,
                'leave_type' => $leaveType,
                'from_date' => $data['from_date'],
                'to_date' => $data['to_date'],
                'count' => $daysRequested,
                'status' => 'pending',
            ]);

            DB::commit();
            return $leave;
        } catch (HttpException $e) {
            DB::rollBack();
            throw $e;
        }
    }
}
