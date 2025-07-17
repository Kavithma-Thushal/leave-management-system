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

            $leave = $this->leaveLogRepositoryInterface->create([
                'user_id' => $user->id,
                'leave_type' => $data['leave_type'],
                'from_date' => $data['from_date'],
                'to_date' => $data['to_date'],
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
