<?php

namespace App\Http\Services;

use App\Repositories\LeaveDetails\LeaveDetailsRepositoryInterface;
use App\Repositories\LeaveLogs\LeaveLogsRepositoryInterface;
use App\Repositories\User\UserRepositoryInterface;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpKernel\Exception\HttpException;

class AdminService
{
    protected UserRepositoryInterface $userRepositoryInterface;
    protected LeaveDetailsRepositoryInterface $leaveDetailsRepositoryInterface;
    protected LeaveLogsRepositoryInterface $leaveLogsRepositoryInterface;

    public function __construct(UserRepositoryInterface $userRepositoryInterface, LeaveDetailsRepositoryInterface $leaveDetailsRepositoryInterface, LeaveLogsRepositoryInterface $leaveLogsRepositoryInterface)
    {
        $this->userRepositoryInterface = $userRepositoryInterface;
        $this->leaveDetailsRepositoryInterface = $leaveDetailsRepositoryInterface;
        $this->leaveLogsRepositoryInterface = $leaveLogsRepositoryInterface;
    }

    public function changeLeaveStatus(array $data, int $leaveId)
    {
        DB::beginTransaction();
        try {
            $leaveLog = $this->leaveLogsRepositoryInterface->find($leaveId);
            if (!$leaveLog) {
                throw new HttpException(404, "Leave Id not found!");
            }

            $status = $data['status'];

            if ($status === 'approved') {
                $userId = $leaveLog->user_id;
                $type = $leaveLog->type;
                $leaveDetails = $this->leaveDetailsRepositoryInterface->findById($userId);
                $days = Carbon::parse($leaveLog->from)->diffInDays($leaveLog->to) + 1;

                if ($leaveDetails->{$type} < $days) {
                    throw new HttpException(400, 'Insufficient leave balance!');
                }

                $leaveDetails->{$type} -= $days;
                $leaveDetails->save();
            }

            $updatedLeave = $this->leaveLogsRepositoryInterface->updateLeaveStatus($leaveId, $status);

            DB::commit();
            return $updatedLeave;
        } catch (HttpException $e) {
            DB::rollBack();
            throw $e;
        }
    }

    public function getEmployeeDetails()
    {
        try {
            $employees = $this->userRepositoryInterface->getAllWith(['leaveDetails', 'leaveLogs']);
            $filteredEmployees = $employees->reject(fn($user) => $user->role === 'admin');
            return $filteredEmployees;
        } catch (HttpException $e) {
            throw $e;
        }
    }
}
