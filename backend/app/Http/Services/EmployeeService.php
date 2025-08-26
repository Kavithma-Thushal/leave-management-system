<?php

namespace App\Http\Services;

use App\Repositories\LeaveLogs\LeaveLogsRepositoryInterface;
use DateTime;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpKernel\Exception\HttpException;

class EmployeeService
{
    protected LeaveLogsRepositoryInterface $leaveLogRepositoryInterface;

    public function __construct(LeaveLogsRepositoryInterface $leaveLogRepositoryInterface)
    {
        $this->leaveLogRepositoryInterface = $leaveLogRepositoryInterface;
    }

    public function applyForLeave(array $data)
    {
        DB::beginTransaction();
        try {
            $user = auth()->user();

            // Calculate total days
            $fromDate = new DateTime($data['from']);
            $toDate = new DateTime($data['to']);
            $interval = $fromDate->diff($toDate);
            $daysRequested = $interval->days + 1;

            $leave = $this->leaveLogRepositoryInterface->create([
                'user_id' => $user->id,
                'type' => $data['type'],
                'from' => $data['from'],
                'to' => $data['to'],
                'count' => $daysRequested,
            ]);

            DB::commit();
            return $leave;
        } catch (HttpException $e) {
            DB::rollBack();
            throw $e;
        }
    }

    public function getLeaveLogs()
    {
        try {
            $user = auth()->user();

            return $user->leaveLogs()->orderByDesc('created_at')->get();
        } catch (HttpException $e) {
            throw $e;
        }
    }

    public function getLeaveDetails()
    {
        try {
            $user = auth()->user();

            return $user->load('leaveDetails');
        } catch (HttpException $e) {
            throw $e;
        }
    }
}
